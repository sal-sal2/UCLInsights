import sys
from datetime import datetime
from concurrent.futures import ThreadPoolExecutor, as_completed

from config import STAT_CATEGORIES, OUTPUT_FILES
from api    import fetch_all_pages
from parser import parse_entries
from writer import save_to_csv

# How many categories to fetch at the same time.
MAX_PARALLEL_FETCHES = 3




def fetch_and_parse_category(category_name, category_config):
    """
    Fetch and parse one stat category. Designed to run in a thread.
    """
    raw_entries = fetch_all_pages(stats_string=category_config["api_stats"], category_name=category_name)

    if not raw_entries:
        print(f" WARNING: no data returned for [{category_name}]  skipping.\n")
        return category_name, None

  
    parsed_players = parse_entries(
        entries=raw_entries,
        field_map=category_config["field_map"],
        include_identity=True,
    )

    return category_name, parsed_players


def scrape():
    all_category_names = STAT_CATEGORIES.keys()
    print(f" Categories to fetch: {', '.join(all_category_names)}")

    #Fetch all categories in parallel and as each thread finishes using a thread pool, since doing doing it sequentially takes a long time. 
    with ThreadPoolExecutor(max_workers = MAX_PARALLEL_FETCHES) as executor:
        results = {}
        tasks = []

        # Create a task per categroy
        for name, config in STAT_CATEGORIES.items():
            job = executor.submit(fetch_and_parse_category, name, config)
            tasks.append(job)


        for completed_task in as_completed(tasks):
    
            task_output = completed_task.result() 
            
            category_name = task_output[0]
            parsed_players = task_output[1]

            if parsed_players is not None:
                results[category_name] = parsed_players


    if not results:
        print("No data was collected. Exiting")
        sys.exit(1)


    print(f"\n Saving {len(results)} CSV files..\n")


    for category_name, parsed_players in results.items():
        # Look up the specific filename and columns for this category
        output_file = OUTPUT_FILES[category_name]
        columns = STAT_CATEGORIES[category_name]["csv_columns"]

        save_to_csv(players_dict = parsed_players, filename = output_file, csv_columns = columns)

    print(f"\nAll done.")



if __name__ == "__main__":
    scrape()