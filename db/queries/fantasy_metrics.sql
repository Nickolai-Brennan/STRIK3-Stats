WITH fantasy_base AS (
    SELECT
        f.player_id,
        f.season,
        p.projection_window,
        p.fantasy_points,
        p.win_probability,
        p.kelly_fraction,
        f.rolling_barrel,
        f.z_contact,
        f.sprint_speed,
        f.park_factor,
        f.prop_edge
    FROM analytics_fantasy_features f
    JOIN marts_fantasy_projections p USING (player_id, season)
),
scaled AS (
    SELECT
        *,
        (rolling_barrel - AVG(rolling_barrel) OVER (PARTITION BY season)) / NULLIF(STDDEV(rolling_barrel) OVER (PARTITION BY season), 0) AS barrel_z,
        (z_contact - AVG(z_contact) OVER (PARTITION BY season)) / NULLIF(STDDEV(z_contact) OVER (PARTITION BY season), 0) AS contact_z,
        (sprint_speed - AVG(sprint_speed) OVER (PARTITION BY season)) / NULLIF(STDDEV(sprint_speed) OVER (PARTITION BY season), 0) AS speed_z,
        (park_factor - AVG(park_factor) OVER (PARTITION BY season)) / NULLIF(STDDEV(park_factor) OVER (PARTITION BY season), 0) AS park_z
    FROM fantasy_base
)
SELECT
    player_id,
    season,
    projection_window,
    0.4 * barrel_z + 0.25 * contact_z + 0.2 * speed_z + 0.15 * park_z AS fantasy_score,
    win_probability,
    kelly_fraction,
    prop_edge
FROM scaled;
