CREATE DATABASE blogs_database;

GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO blog_user;

\c blogs_database;

CREATE TABLE IF NOT EXISTS blog(
	id SERIAL,
	title VARCHAR(255),
	content TEXT,
	demon VARCHAR(255),
	level INT DEFAULT 0,
	post_date date,
	image BYTEA
);

INSERT INTO blog (title) VALUES ('Bienvenido al blog de SMT V');

INSERT INTO blog (title, content, demon, level, post_date) 
VALUES ('Shiva, el poderoso demonio de Shin Megami Tensei V', 
        'Shiva es conocido como uno de los demonios más poderosos en el universo de Shin Megami Tensei V. Posee habilidades de hielo y fuego, así como una gran destreza en el combate cuerpo a cuerpo.', 
        'Shiva', 
        99, 
        '2024-04-25');

