
CREATE TABLE users (
	id_user serial PRIMARY KEY,
	email VARCHAR ( 50 )  NOT NULL,
	password VARCHAR ( 50 ) NOT NULL,
	name VARCHAR ( 255 )  NOT NULL,
	last_name VARCHAR ( 255 )  NOT NULL,
	created_on TIMESTAMP NOT NULL DEFAULT now(),
    last_login TIMESTAMP,
	fk_roles int NOT NULL,
	fk_organizations int NOT NULL,
    status CHAR(1) 	NOT NULL,
	CONSTRAINT fk_roles
      FOREIGN KEY(fk_roles) 
	 REFERENCES roles(id_role),
	CONSTRAINT fk_organizations
      FOREIGN KEY(fk_organizations) 
	 REFERENCES organization(id_organization)
);

CREATE TABLE organization (
	id_organization serial PRIMARY KEY,
	name_organization VARCHAR ( 255 )  NOT NULL,
    status CHAR(1) 	NOT NULL
);

CREATE TABLE roles (
	id_role serial PRIMARY KEY,
	name_role VARCHAR ( 255 )  NOT NULL,
    status CHAR(1) 	NOT NULL
);

CREATE TABLE modules_roles (
	id_role int PRIMARY KEY,
	id_module int PRIMARY KEY,
	access VARCHAR ( 255 )  NOT NULL,
    status CHAR(1) 	NOT NULL,
	CONSTRAINT fk_role
      FOREIGN KEY(id_role) 
	 REFERENCES roles(id_role),
	CONSTRAINT fk_module
      FOREIGN KEY(id_module) 
	 REFERENCES modules(id_module)
);
CREATE TABLE modules (
	id_module serial PRIMARY KEY,
	name_module VARCHAR ( 255 )  NOT NULL,
    status CHAR(1) 	NOT NULL
);
