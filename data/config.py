API_BASE_URL = "https://compstats.uefa.com/v1/player-ranking"
COMPETITION_ID = "1"
SEASON_YEAR = "2026"
PHASE = "TOURNAMENT"
PAGE_SIZE = 50 # Number of players return per request
REQUEST_DELAY = 1.0

# CSV files for each category
OUTPUT_FILES = {
    "goals":        "ucl_stats_goals.csv",
    "attempts":     "ucl_stats_attempts.csv",
    "distribution": "ucl_stats_distribution.csv",
    "attacking":    "ucl_stats_attacking.csv",
    "defending":    "ucl_stats_defending.csv",
    "disciplinary": "ucl_stats_disciplinary.csv",
}

REQUEST_HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/145.0.0.0 Safari/537.36"
    ),
    "Accept":          "application/json, text/plain, */*",
    "Accept-Language": "en-US,en;q=0.9",
    "Referer":         "https://www.uefa.com/",
    "Origin":          "https://www.uefa.com",
}


STAT_CATEGORIES = {

    "goals": {
        "api_stats": ",".join([
            "goals",
            "goals_scored_with_right",
            "goals_scored_with_left",
            "goals_scored_head",
            "goals_scored_other",
            "goals_scored_inside_penalty_area",
            "goals_scored_outside_penalty_area",
            "penalty_scored",
            "matches_appearance",
        ]),
        "field_map": {
            "goals":                             "goals",
            "goals_scored_with_right":           "goals_right_foot",
            "goals_scored_with_left":            "goals_left_foot",
            "goals_scored_head":                 "goals_head",
            "goals_scored_other":                "goals_other",
            "goals_scored_inside_penalty_area":  "goals_inside_area",
            "goals_scored_outside_penalty_area": "goals_outside_area",
            "penalty_scored":                    "penalties_scored",
            "matches_appearance":                "matches_played",
        },
        "csv_columns": [
            "player_name", "team", "position", "nation",
            "goals", "goals_right_foot", "goals_left_foot", "goals_head",
            "goals_other", "goals_inside_area", "goals_outside_area",
            "penalties_scored", "matches_played",
        ],
    },

    "attempts": {
        "api_stats": ",".join([
            "attempts",
            "attempts_on_target",
            "attempts_off_target",
            "attempts_blocked",
            "matches_appearance",
        ]),
        "field_map": {
            "attempts":            "attempts_total",
            "attempts_on_target":  "attempts_on_target",
            "attempts_off_target": "attempts_off_target",
            "attempts_blocked":    "attempts_blocked",
        },
        "csv_columns": [
            "player_name", "team", "position", "nation",
            "attempts_total", "attempts_on_target", "attempts_off_target", "attempts_blocked",
        ],
    },

    "distribution": {
        "api_stats": ",".join([
            "passes_accuracy",
            "passes_attempted",
            "passes_completed",
            "cross_accuracy",
            "cross_attempted",
            "cross_completed",
            "free_kick",
            "matches_appearance",
        ]),
        "field_map": {
            "passes_accuracy":  "pass_accuracy",
            "passes_attempted": "passes_attempted",
            "passes_completed": "passes_completed",
            "cross_accuracy":   "cross_accuracy",
            "cross_attempted":  "crosses_attempted",
            "cross_completed":  "crosses_completed",
            "free_kick":        "free_kicks",
        },
        "csv_columns": [
            "player_name", "team", "position", "nation",
            "pass_accuracy", "passes_attempted", "passes_completed",
            "cross_accuracy", "crosses_attempted", "crosses_completed", "free_kicks",
        ],
    },

    "attacking": {
        "api_stats": ",".join([
            "assists",
            "corners",
            "offsides",
            "dribbling",
            "matches_appearance",
        ]),
        "field_map": {
            "assists":   "assists",
            "corners":   "corners",
            "offsides":  "offsides",
            "dribbling": "dribbles",
        },
        "csv_columns": [
            "player_name", "team", "position", "nation",
            "assists", "corners", "offsides", "dribbles",
        ],
    },

    "defending": {
        "api_stats": ",".join([
            "recovered_ball",
            "tackles",
            "tackles_won",
            "tackles_lost",
            "clearance_attempted",
            "matches_appearance",
        ]),
        "field_map": {
            "recovered_ball":      "balls_recovered",
            "tackles":             "tackles_total",
            "tackles_won":         "tackles_won",
            "tackles_lost":        "tackles_lost",
            "clearance_attempted": "clearances",
        },
        "csv_columns": [
            "player_name", "team", "position", "nation",
            "balls_recovered", "tackles_total", "tackles_won", "tackles_lost", "clearances",
        ],
    },

    "disciplinary": {
        "api_stats": ",".join([
            "fouls_committed",
            "fouls_suffered",
            "yellow_cards",
            "red_cards",
            "minutes_played_official",
            "matches_appearance",
        ]),
        "field_map": {
            "fouls_committed":         "fouls_committed",
            "fouls_suffered":          "fouls_suffered",
            "yellow_cards":            "yellow_cards",
            "red_cards":               "red_cards",
            "minutes_played_official": "minutes_played",
        },
        "csv_columns": [
            "player_name", "team", "position", "nation",
            "fouls_committed", "fouls_suffered", "yellow_cards", "red_cards", "minutes_played",
        ],
    },
}
