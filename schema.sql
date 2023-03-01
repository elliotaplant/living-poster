DROP TABLE IF EXISTS telemetry;

CREATE TABLE
  telemetry (
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    poster_id TEXT,
    uri TEXT,
    battery NUMBER,
    millis NUMBER,
  );