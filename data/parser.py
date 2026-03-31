
def get_player_identity(entry):
    """
    Function extracts a player's name, team, position, and nationality from an API entry.
    """
    player_info = entry.get("player", {})
    team_info = entry.get("team", {})

    # Prioritize international name if available, otherwise use "name"
    player_name = player_info.get("internationalName") or player_info.get("name", "")
    team = team_info.get("internationalName") or team_info.get("name", "")
    position = player_info.get("detailedFieldPosition") or player_info.get("fieldPosition", "")
    nation = player_info.get("countryCode", "")

    return {
        "player_name": player_name,
        "team":        team,
        "position":    position,
        "nation":      nation,
    }


def get_player_stats(entry, field_map):
    """
    Function extracts stat values from an API entry and rename them using field_map.
    This function converts that list of {name: value:} objects to flat dict, then renames the keys
    to their CSV column names using field_map.
    """
    stats_list = entry.get("statistics", [])
    raw_stats = {}
    for stat in stats_list:
        stat_name  = stat["name"]
        raw_value  = stat.get("value", 0) or 0
        stat_value = round(float(raw_value), 2)
        raw_stats[stat_name] = stat_value

    # Rename stats using the field_map
    renamed_stats = {}
    for api_key, csv_column in field_map.items():
        renamed_stats[csv_column] = raw_stats.get(api_key, 0)

    return renamed_stats


def parse_entries(entries, field_map, include_identity=False):
    """
    Function converts a list of raw API entries into a dict of player rows.
    """
    players = {}

    for entry in entries:
        identity = get_player_identity(entry)
        stats = get_player_stats(entry, field_map)
        name = identity["player_name"]

        if name not in players:
            players[name] = {
                "player_name": name,
                "team":        identity["team"],
                "position":    identity["position"],
                "nation":      identity["nation"],
            }

        players[name].update(stats)

    return players


def merge_categories(category_results):
    """
    Function ,erges player data from multiple stat columns/categories into one combined dict.
    """
    combined = {}

    for category_data in category_results:
        for player_name, player_row in category_data.items():

            if player_name not in combined:
                combined[player_name] = {}

            combined[player_name].update(player_row)

    return combined
