import time
import requests
from config import (
    API_BASE_URL, COMPETITION_ID, SEASON_YEAR, PHASE,
    PAGE_SIZE, REQUEST_DELAY, REQUEST_HEADERS,
)


def build_request_params(stats_string, offset):
    """
    Function builds the query parameters for one API request.
    """
    return {
        "competitionId":  COMPETITION_ID,
        "limit":          PAGE_SIZE,
        "offset":         offset,
        "optionalFields": "PLAYER,TEAM",
        "order":          "DESC",
        "phase":          PHASE,
        "seasonYear":     SEASON_YEAR,
        "stats":          stats_string,
    }


def get_entries_from_response(response_data):
    """
    Function extracts the list of player entries and the total player count
    from the API response.
    """
    # Format 1: response is just a plain list
    if isinstance(response_data, list):
        return response_data, "?"

    # Format 2: response is a dict, so get common key names
    total = (response_data.get("total") or response_data.get("count") or response_data.get("totalCount") or "?")

    entries = (response_data.get("items") or response_data.get("data") or response_data.get("playerRankings") or response_data.get("players") or [])

    return entries, total


def fetch_all_pages(stats_string, category_name):
    """
    Function fetches every player entry for one stat category from the API
    continously through all pages until all players are collected.
    """
    session = requests.Session()
    session.headers.update(REQUEST_HEADERS)

    all_entries = []
    offset = 0
    total = None

    print(f" Fetching [{category_name}]...")

    while True:
        params = build_request_params(stats_string, offset)

        try:
            response = session.get(API_BASE_URL, params=params, timeout=15)
            response.raise_for_status()

        except requests.exceptions.HTTPError as error:
            status_code = error.response.status_code if error.response else "?"
            print(f" HTTP {status_code} error at offset {offset}: {error}")
            if status_code == 403:
                print(" The API blocked the request. Try updating the headers.")
            elif status_code == 404:
                print(" Endpoint not found. Check SEASON_YEAR and COMPETITION_ID.")
            break

        except requests.exceptions.ConnectionError:
            print(" Connection error.")
            break

        except requests.exceptions.Timeout:
            print(f" Request timed out at offset {offset}. Retrying in 5 seconds...")
            time.sleep(5)
            continue

        # Parse the response
        entries, page_total = get_entries_from_response(response.json())

        if total is None:
            total = page_total
            if isinstance(total, int):
                total_label = f"{total} players"
            else:
                total_label = "unknown total"
            print(f" {total_label} · {PAGE_SIZE} per page")

        # Last page
        if not entries:
            break

        all_entries.extend(entries)
        offset += len(entries)
        print(f" {offset} / {total}")

        # Stop if we've collected all players
        if isinstance(total, int) and offset >= total:
            break

        # Wait between pages
        time.sleep(REQUEST_DELAY)

    print(f" Done — {len(all_entries)} entries collected.\n")
    return all_entries
