create table users(
    id serial primary key,
    uuid varchar(36) not null,
    name varchar(50),
    password text,
    email text
);