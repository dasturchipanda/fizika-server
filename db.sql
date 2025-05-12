
CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_email VARCHAR(255) UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    user_firstname VARCHAR(255) NOT NULL,
    user_lastname VARCHAR(255) NOT NULL,
    user_ageyear VARCHAR(20) NOT NULL,
    user_role VARCHAR(50) DEFAULT 'user',
    user_status VARCHAR(50) DEFAULT 'normal',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS amaliy (
    amaliy_id INT AUTO_INCREMENT PRIMARY KEY,
    amaliy_title VARCHAR(255) NOT NULL,
    amaliy_file VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS nazariy (
    nazariy_id INT AUTO_INCREMENT PRIMARY KEY,
    nazariy_title VARCHAR(255) NOT NULL,
    nazariy_file VARCHAR(255) NOT NULL,
    nazariy_video VARCHAR(255) NOT NULL,
    nazariy_test VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS test_questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    subject_name VARCHAR(255) NOT NULL,
    question TEXT NOT NULL,
    option_a TEXT NOT NULL,
    option_b TEXT NOT NULL,
    option_c TEXT NOT NULL,
    option_d TEXT NOT NULL,
    correct_option CHAR(1) NOT NULL
);

CREATE TABLE IF NOT EXISTS news (
    news_id INT AUTO_INCREMENT PRIMARY KEY,
    news_image TEXT NOT NULL,
    news_title VARCHAR(255) NOT NULL,
    news_description TEXT NOT NULL,
    lang VARCHAR(10) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
