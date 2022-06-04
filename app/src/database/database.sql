create database typescriptdatabase;;
\c typescriptdatabase;
create table users(
    id serial primary key,
    name varchar(50),
    email text
);

insert into users(name, email) values('Jane Doe', 'joe@pepito.com'),
('pedro','pedro@gmail.com');