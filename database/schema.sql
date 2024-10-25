CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    photo_profile_url VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
);

CREATE TABLE IF NOT EXISTS chat_session (
    session_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS chat_message (
    message_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    session_id INTEGER NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    FOREIGN KEY (session_id) REFERENCES chat_session(session_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS kedinasan (
    kedinasan_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    nama_dinas VARCHAR(255) NOT NULL,
    kelurahan VARCHAR(255),
    kecamatan VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS reports (
    report_id VARCHAR(40) PRIMARY KEY,
    description TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    status VARCHAR(50),
    closed_at TIMESTAMP NULL DEFAULT NULL,
    kedinasan_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (kedinasan_id) REFERENCES kedinasan(kedinasan_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);
