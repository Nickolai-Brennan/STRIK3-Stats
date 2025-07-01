import pandas as pd
from urllib.parse import urlencode
from typing import Dict, List
import ace_tools as tools

BASE_URL = "https://www.fangraphs.com/leaders.aspx"

# Mapping of report type values to readable labels
REPORT_TYPES: Dict[int, str] = {
    0: "Standard",
    1: "Advanced",
    2: "BattedBall",
    3: "WinProbability",
    6: "Value",
    8: "Dashboard",
    23: "PlusStats",
    24: "Statcast",
}


def build_query(season: int, month: int, report_type: int = 8) -> str:
    """Build the Fangraphs leaders query string."""
    params: Dict[str, int | str] = {
        "pos": "all",
        "stats": "bat",
        "lg": "all",
        "qual": "y",
        "type": report_type,
        "season": season,
        "month": month,
        "ind": "0",
    }
    return f"{BASE_URL}?{urlencode(params)}"


def fetch_leaders(season: int, month: int = 0) -> pd.DataFrame:
    """Fetch leaders data from Fangraphs as a DataFrame."""
    url = build_query(season, month)
    tables = pd.read_html(url)
    return tables[0] if tables else pd.DataFrame()


def build_export_links(season: int, month: int = 0) -> pd.DataFrame:
    """Return a DataFrame containing CSV export links for each report type."""
    export_links: List[Dict[str, str]] = []

    for type_val, label in REPORT_TYPES.items():
        params = {
            "pos": "all",
            "stats": "bat",
            "type": type_val,
            "lg": "all",
            "qual": "y",
            "ind": "0",
            "season": season,
            "month": month,
            "csv": "true",
        }
        url = f"{BASE_URL}?{urlencode(params)}"
        export_links.append({"Report Type": label, "Season": season, "URL": url})

    return pd.DataFrame(export_links)


if __name__ == "__main__":
    season = 2025
    month = 0

    df_links = build_export_links(season, month)
    tools.display_dataframe_to_user(
        name="FanGraphs Hitter CSV Export Links", dataframe=df_links
    )
