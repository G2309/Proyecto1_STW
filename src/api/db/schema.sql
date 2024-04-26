CREATE DATABASE blogs_database;

\c blogs_database;

CREATE TABLE IF NOT EXISTS blog(
	id SERIAL,
	title VARCHAR(255) NOT NULL,
	content VARCHAR(255) NOT NULL,
	demon VARCHAR(255) NOT NULL,
	level INT NOT NULL DEFAULT 0,
	post_date date,
	image BYTEA
);
