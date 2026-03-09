"""
Player Goals Stats Scraper
API Discovered with DEVTOOLS under XHR requests:
    https://compstats.uefa.com/v1/player-ranking
"""

import requests
import csv
import time
import sys
from datetime import datetime

# Configurations

# API URL found
API_BASE_URL = "https://compstats.uefa.com/v1/player-ranking"

# competitionId=1 is UCL, seasonYear=2026 means the 2025/26 season
COMPETITION_ID = "1"
SEASON_YEAR = "2026"
PHASE = "TOURNAMENT"

# UEFA's default page size is 15 (found in DevTools), 50 is the max allowed
PAGE_SIZE = 50

# Stat fields
STATS_FIELDS = ",".join([
    "goals",
    "goals_scored_with_right",
    "goals_scored_with_left",
    "goals_scored_head",
    "goals_scored_other",
    "goals_scored_inside_penalty_area",
    "goals_scored_outside_penalty_area",
    "penalty_scored",
    "matches_appearance",
])

OUTPUT_FILE = "ucl_player_goals_stats.csv"

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/145.0.0.0 Safari/537.36"
    ),
    "Accept":           "application/json, text/plain, */*",
    "Accept-Language":  "en-US,en;q=0.9",
    "Referer":          "https://www.uefa.com/",
    "Origin":           "https://www.uefa.com",
}

# Delay to avoid rate-limit
REQUEST_DELAY = 1.0


# Helper functions

def build_params(offset):
    """
    Function builds the query-string dict for one paginated API request
    """
    return {
        "competitionId":  COMPETITION_ID,
        "limit":          PAGE_SIZE,
        "offset":         offset,
        "optionalFields": "PLAYER,TEAM",
        "order":          "DESC",
        "phase":          PHASE,
        "seasonYear":     SEASON_YEAR,
        "stats":          STATS_FIELDS,
    }


def parse_player(entry):
    """
    Function extracts the fields we want from one API record (one player)
    """
    player_info = entry.get("player", {})
    team_info = entry.get("team", {})

    # The API returns statistics as a LIST of {name, value} objectss,
    # so convert it to a dict keyed by "name" so we can look up values easily
    stats_list = entry.get("statistics", [])
    stats = {s["name"]: int(s.get("value", 0) or 0) for s in stats_list}

    # Prioritize international names(with accents) over regular names
    name = (
        player_info.get("internationalName")
        or player_info.get("name", "")
    )

    # Team name
    team_name = (
        team_info.get("internationalName")
        or team_info.get("name", "")
    )

    return {
        "player_name":          name,
        "team":                 team_name,
        "goals":                stats.get("goals",                                0),
        "goals_right_foot":     stats.get("goals_scored_with_right",              0),
        "goals_left_foot":      stats.get("goals_scored_with_left",               0),
        "goals_head":           stats.get("goals_scored_head",                    0),
        "goals_other":          stats.get("goals_scored_other",                   0),
        "goals_inside_area":    stats.get("goals_scored_inside_penalty_area",     0),
        "goals_outside_area":   stats.get("goals_scored_outside_penalty_area",    0),
        "penalties_scored":     stats.get("penalty_scored",                       0),
        "matches_played":       stats.get("matches_appearance",                   0),
    }



# Scraper
def scrape_all_players():
    """
    Function goes through the API until all players
    have been fetched. Returns a list of player-stat dicts.
    """
    all_players = []
    offset = 0
    total = None 

    session = requests.Session()
    session.headers.update(HEADERS)

    print("[{}] Starting scrape — UCL {} goals stats".format(datetime.now().strftime("%H:%M:%S"), SEASON_YEAR))

    while True:
        params = build_params(offset)

        try:
            resp = session.get(API_BASE_URL, params=params, timeout=15)
            resp.raise_for_status()

        except requests.exceptions.HTTPError as e:
            status = e.response.status_code if e.response else "?"
            print("\nHTTP {} error at offset {}: {}".format(status, offset, e))
            if status == 403:
                print("The API blocked the request.")
            elif status == 404:
                print("Endpoint not found — seasonYear or competitionId may have changed.")
            break

        except requests.exceptions.ConnectionError:
            print("\nConnection error — check your internet connection.")
            break

        except requests.exceptions.Timeout:
            print("\nRequest timed out at offset {}. Waiting 5 s then retrying...".format(offset))
            time.sleep(5)
            continue

        data = resp.json()

        # The API sometimes returns either a list or a dict

        # Player List
        if isinstance(data, list):
            entries = data
            if total is None:
                total = "?"
                print("API returned a direct list (no total). Fetching until last page...\n")
        else:
            # Dict
            if total is None:
                total = ( data.get("total") or data.get("count") or data.get("totalCount") or "?" )
                print("API reports {} total players. Fetching {} per page...\n".format(
                    total, PAGE_SIZE))

            entries = ( data.get("items") or data.get("data") or data.get("playerRankings") or data.get("players") or [] )

        if not entries:
            print("No more entries returned — complete.")
            break

        for entry in entries:
            all_players.append(parse_player(entry))

        offset += len(entries)
        print("Fetched {} / {} players...".format(offset, total))

        # Stop once we have collected everything
        if isinstance(total, int) and offset >= total:
            break

        time.sleep(REQUEST_DELAY)

    print("\nDone. Total players collected: {}".format(len(all_players)))
    return all_players


def save_to_csv(players, filename):
    """
    Function writes the player list to a CSV file.
    """
    if not players:
        print("No data to save.")
        return

    fieldnames = [
        "player_name",
        "team",
        "goals",
        "goals_right_foot",
        "goals_left_foot",
        "goals_head",
        "goals_other",
        "goals_inside_area",
        "goals_outside_area",
        "penalties_scored",
        "matches_played",
    ]

    with open(filename, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(players)

    print("[{}] Saved {} rows -> {}".format(datetime.now().strftime("%H:%M:%S"), len(players), filename))






# Main

#if __name__ == "__main__": --> later for refactoring
players = scrape_all_players()

if players:
    save_to_csv(players, OUTPUT_FILE)
else:
    print("\nNo players were scraped. Common causes:")
    print("1. seasonYear is wrong (currently: {})".format(SEASON_YEAR))
    print("2. API returned 403 — copy full headers from DevTools")
    print("3. Network/firewall issue")
    sys.exit(1)
