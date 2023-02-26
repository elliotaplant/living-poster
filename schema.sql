DROP TABLE IF EXISTS Customers;

CREATE TABLE
  telemetry (
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    poster_id INT,
    uri text,
    battery NUMBER,
    PRIMARY KEY (`poster_id`)
  );