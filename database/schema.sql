CREATE TABLE IF NOT EXISTS hackathon.users (
    user_id INTEGER PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NULL,
    email VARCHAR(255) NOT NULL,
    role INTEGER,
    created_at TIMESTAMP NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
);

CREATE TABLE IF NOT EXISTS hackathon.chat_session (
    session_id INTEGER PRIMARY KEY,
    user_id INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS hackathon.chat_message (
    message_id INTEGER PRIMARY KEY,
    session_id INTEGER NOT NULL,
    message VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    FOREIGN KEY (session_id) REFERENCES chat_session(session_id)
);

CREATE TABLE IF NOT EXISTS hackathon.kedinasan (
    kedinasan_id INTEGER PRIMARY KEY,
    nama_dinas VARCHAR(255) NOT NULL,
    kelurahan VARCHAR(255),
    kecamatan VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS hackathon.reports (
    report_id VARCHAR(40) PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    status VARCHAR(50),
    closed_at TIMESTAMP NULL DEFAULT NULL,
    kedinasan_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (kedinasan_id) REFERENCES kedinasan(kedinasan_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
