DROP TABLE IF EXISTS Customers;

CREATE TABLE
  telemetry (
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    poster_id TEXT,
    uri TEXT,
    battery NUMBER
  );