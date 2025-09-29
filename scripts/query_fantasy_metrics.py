"""Utility script for refreshing STRIK3 fantasy projections."""

from __future__ import annotations

import os
from dataclasses import dataclass
from typing import Iterable

import psycopg


@dataclass
class ProjectionRow:
    player_id: int
    season: int
    projection_window: int
    fantasy_points: float
    win_probability: float
    kelly_fraction: float


def get_connection() -> psycopg.Connection:
    """Create a Postgres connection using environment variables."""
    return psycopg.connect(
        host=os.environ.get("PGHOST", "localhost"),
        port=os.environ.get("PGPORT", "5432"),
        user=os.environ.get("PGUSER", "postgres"),
        password=os.environ.get("PGPASSWORD", "postgres"),
        dbname=os.environ.get("PGDATABASE", "strik3")
    )


def upsert_projections(conn: psycopg.Connection, rows: Iterable[ProjectionRow]) -> None:
    """Upsert fantasy projections into the marts layer."""
    with conn.cursor() as cur:
        cur.executemany(
            """
            INSERT INTO marts_fantasy_projections (
                player_id, season, projection_window, fantasy_points, win_probability, kelly_fraction
            )
            VALUES (%(player_id)s, %(season)s, %(projection_window)s, %(fantasy_points)s, %(win_probability)s, %(kelly_fraction)s)
            ON CONFLICT (player_id)
            DO UPDATE SET
                projection_window = EXCLUDED.projection_window,
                fantasy_points = EXCLUDED.fantasy_points,
                win_probability = EXCLUDED.win_probability,
                kelly_fraction = EXCLUDED.kelly_fraction,
                last_run = NOW()
            """,
            [row.__dict__ for row in rows],
        )
    conn.commit()


def main() -> None:
    rows = [
        ProjectionRow(player_id=1001, season=2024, projection_window=30, fantasy_points=108.4, win_probability=0.63, kelly_fraction=0.08),
        ProjectionRow(player_id=1002, season=2024, projection_window=30, fantasy_points=115.2, win_probability=0.66, kelly_fraction=0.11),
        ProjectionRow(player_id=2001, season=2024, projection_window=30, fantasy_points=138.2, win_probability=0.71, kelly_fraction=0.15),
    ]

    with get_connection() as conn:
        upsert_projections(conn, rows)
        with conn.cursor() as cur:
            cur.execute("SELECT COUNT(*) FROM marts_fantasy_projections")
            total = cur.fetchone()[0]
            print(f"Upserted {len(rows)} rows. Warehouse now tracks {total} projection rows.")


if __name__ == "__main__":
    main()
