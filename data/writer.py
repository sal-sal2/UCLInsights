import csv
from datetime import datetime


def save_to_csv(players_dict, filename, csv_columns):
    """
    Write player data to a CSV file.
    """
    if not players_dict:
        print(f"  No data to save for {filename}.")
        return

    rows = list(players_dict.values())

    with open(filename, "w", newline="", encoding="utf-8-sig") as csv_file:
        writer = csv.DictWriter(csv_file, fieldnames=csv_columns, extrasaction="ignore")
        writer.writeheader()

        for row in rows:
            complete_row = {}
            for column in csv_columns:
                if column in row:
                    value = row[column]
                else:
                    value = 0
                complete_row[column] = value 
            writer.writerow(complete_row)

    #timestamp = datetime.now().strftime("%H:%M:%S")
    #print(f"  [{timestamp}] Saved {len(rows)} rows → {filename}")