create table users(
    id serial primary key,
    uuid varchar(36) not null,
    name varchar(50),
    password text,
    email text);
	
insert into users(uuid, name, password,email) values ('f5086255-c946-4e86-84af-c1e8db4ab733','admin','$2a$10$5tzvcBq07JWWg/Baso8wou69Fhcd0crk/aatSP4TiRcU649CeH79a','joe1@pepito.com');
