create table users(
    id serial primary key,
    uuid varchar(36) not null,
    name varchar(50),
    password text,
    email text);


create table producto(
    id_producto serial primary key,
    nombre text,
    precio float,
    stock int
);

create table details(
    num_detalle serial primary key,
    id_factura int,
    id_producto int,
    cantidad float,
    precio_detalle float
);

create table factura(
    id_factura serial primary key,
    id_user int ,
    fecha date,
    ispaid boolean
);

alter table details add constraint fk_factura_detail foreign key (id_factura) references factura(id_factura);
alter table details add constraint fk_producto_detail foreign key (id_producto) references producto(id_producto);

insert into users(uuid, name, password,email) values ('f5086255-c946-4e86-84af-c1e8db4ab733','admin','$2a$10$5tzvcBq07JWWg/Baso8wou69Fhcd0crk/aatSP4TiRcU649CeH79a','joe1@pepito.com');


insert into producto(nombre,precio,stock) values ('Coca-cola',1000,1000);
insert into producto(nombre,precio,stock) values ('Pepsi',1000,1000);
insert into producto(nombre,precio,stock) values ('Manzana Postobon',300,1000);
insert into producto(nombre,precio,stock) values ('Canada dry',200,1000);
insert into producto(nombre,precio,stock) values ('Colombiana',300,1000);


