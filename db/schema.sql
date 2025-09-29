CREATE TABLE IF NOT EXISTS raw_statcast_events (
    game_date DATE NOT NULL,
    batter_id INTEGER NOT NULL,
    pitch_type TEXT,
    launch_speed NUMERIC,
    launch_angle NUMERIC,
    home_team TEXT,
    away_team TEXT,
    PRIMARY KEY (game_date, batter_id, pitch_type, launch_speed, launch_angle)
);

CREATE TABLE IF NOT EXISTS analytics_fantasy_features (
    player_id INTEGER PRIMARY KEY,
    season INTEGER NOT NULL,
    rolling_barrel NUMERIC,
    z_contact NUMERIC,
    sprint_speed NUMERIC,
    park_factor NUMERIC,
    prop_edge NUMERIC,
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS marts_fantasy_projections (
    player_id INTEGER PRIMARY KEY,
    season INTEGER NOT NULL,
    projection_window INTEGER NOT NULL,
    fantasy_points NUMERIC,
    win_probability NUMERIC,
    kelly_fraction NUMERIC,
    last_run TIMESTAMP DEFAULT NOW()
);
