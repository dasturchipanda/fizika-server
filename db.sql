create database fizika;
\c fizika;

drop table if exists users;
create table users(
    user_id serial primary key,
    user_email varchar unique,
    user_password varchar not null,
    user_firstname varchar not null,
    user_lastname varchar not null,
    user_ageyear varchar not null,
    user_role varchar DEFAULT 'user',
    user_status varchar not null DEFAULT 'normal',
    created_at TIMESTAMPTZ DEFAULT NOW()
);



INSERT INTO users(user_email , user_password, user_firstname, user_lastname, user_ageyear, user_role) VALUES ('zahriddin06@gmail.com', 'zetplus02', 'Zahriddin', 'Atanazarov', '12/07/2006', 'admin');

drop table if exists amaliy;
create table amaliy(
    amaliy_id serial primary key,
    amaliy_title varchar not null,
    amaliy_file varchar not null,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

drop table if exists nazariy;
create table nazariy(
    nazariy_id serial primary key,
    nazariy_title varchar not null,
    nazariy_file varchar not null,
    nazariy_video varchar not null,
    nazariy_test varchar not null,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE test_questions (
    id SERIAL PRIMARY KEY,
    subject_name varchar not null,
    question TEXT NOT NULL,
    option_a TEXT NOT NULL,
    option_b TEXT NOT NULL,
    option_c TEXT NOT NULL,
    option_d TEXT NOT NULL,
    correct_option CHAR(1) NOT NULL
);

drop table if exists news;
CREATE TABLE news (
    news_id SERIAL PRIMARY KEY,        
    news_image TEXT NOT NULL,          
    news_title VARCHAR(255) NOT NULL,  
    news_description TEXT NOT NULL,   
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

INSERT INTO news (news_image, news_title, news_description, lang)
VALUES ('/uploads/news.png', 'Stag news title' , 'Bootstrap is developed mobile first, a strategy in which we optimize code for mobile devices first and then scale up components as necessary using', 'en' );

ALTER TABLE users
ALTER COLUMN user_role SET DEFAULT 'user';
