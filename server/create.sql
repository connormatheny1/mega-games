create table users(
    uid serial primary key,
    username text UNIQUE NOT NULL,
    password text, 
    email text UNIQUE NOT NULL,
    avatar INTEGER NOT NULL default 0,
    games_played INTEGER NOT NULL default 0,
    games_won INTEGER NOT NULL default 0,
    logged_in BOOLEAN NOT NULL default 'false',
    current_room text,
    dark_mode boolean default 'false'
);