--Tabla tipo de terreno

CREATE TABLE tipo_terreno (
  id serial primary key,
  nombre varchar(50) unique
);

CREATE TABLE predio (
  id serial primary key,
  numero_predial int not null,
  avaluo float,
  nombre_predio varchar(50),
  departamento varchar(50),
  municipio varchar(50),
  direccion varchar(200) not null
);

CREATE TABLE terreno (
  id serial primary key,
	area_total float not null, 
  valor_comercial float not null, 
  fuentes_agua boolean default false,
  num_construcciones int not null,
  tipo int references tipo_terreno(id),
  id_predio int not null references predio(id) ON DELETE CASCADE
);

CREATE TABLE tipo_documento (
  id serial primary key,
  nombre varchar(50) unique
);

CREATE TABLE propietario (
  id serial primary key,
  telefono int not null,
  correo varchar(50) not null,
  direccion varchar(200) not null,
  numero_documento int not null,
  nombre_completo varchar(90) not null,
  tipo_documento int not null REFERENCES tipo_documento(id),
  id_predio int references predio(id) ON DELETE CASCADE
);

CREATE TABLE tipo_construccion (
   id serial primary key,
   nombre varchar(50) unique
);

CREATE TABLE construccion (
  id serial primary key,
  num_pisos int not null, 
  area_total float not null,
  tipo_construccion int not null REFERENCES tipo_construccion(id),
  id_predio int not null REFERENCES predio(id) ON DELETE CASCADE
);

-- Insert's

insert into tipo_construccion (id, nombre) values (1, 'Industrial');
insert into tipo_construccion (id, nombre) values (2, 'Comercial');
insert into tipo_construccion (id, nombre) values (3, 'Residencial');

insert into tipo_terreno (id, nombre) values (1, 'Rural');
insert into tipo_terreno (id, nombre) values (2, 'Urbano');

insert into tipo_documento (id, nombre) values (1, 'CC');
insert into tipo_documento (id, nombre) values (2, 'NIT');
