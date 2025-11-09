CREATE TABLE IF NOT EXISTS events (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT NULL,
    start_datetime_utc DATETIME NOT NULL,
    end_datetime_utc DATETIME NOT NULL,
    location VARCHAR(255) NULL
);
