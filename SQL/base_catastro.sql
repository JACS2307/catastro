--Tabla tipo de terreno

CREATE TABLE "TIPO TERRENO" (
  id serial,
  nombre_tipterreno varchar(50) primary key
);

CREATE TABLE "TERRENO" (
	
   id serial,
  numero_predial int primary key,
	area_total int not null, 
  valor_comercial float not null, 
  fuentes_agua boolean,
  nombre_tipterreno varchar(50) not null,
  num_construcciones int not null,
	FOREIGN KEY (nombre_tipterreno) REFERENCES "TIPO TERRENO"(nombre_tipterreno)
);

CREATE TABLE "PREDIO" (
  id serial primary key,
  numero_predial int,
  avaluo float,
  nombre_predio varchar(50),
  departamento varchar(50),
  municipio varchar(50),
  direccion varchar(200) not null,
 FOREIGN KEY (numero_predial) REFERENCES "TERRENO"(numero_predial),
 FOREIGN KEY (numero_predial) REFERENCES "PROPIETARIO"(numero_predial),
 FOREIGN KEY (numero_predial) REFERENCES "CONSTRUCCION"(numero_predial),
 FOREIGN KEY (numero_predial) REFERENCES "RECAUDO"(numero_predial)	
);


CREATE TABLE "PROPIETARIO" (
  id serial not null,
  numero_predial int primary key,
  telefono int not null,
  correo varchar(50) not null,
  direccion varchar(200) not null,
  tipo_documento varchar(60) not null,
  numero_doc int not null,
  nombre_completo varchar(90) not null,
  FOREIGN KEY (tipo_documento) REFERENCES "TIPO DOCUMENTO"(tipo_documento)
);

CREATE TABLE "TIPO DOCUMENTO" (
  id serial,
  tipo_documento varchar(50) primary key
);



CREATE TABLE "CONSTRUCCION" (
   id serial,
  numero_predial int primary key,
  num_pisos int not null, 
  area_total int not null,
  tipo_const varchar(50) not null,
  direccion varchar(200) not null,
  FOREIGN KEY (tipo_const) REFERENCES "TIPO CONSTRUCCION"(tipo_const)
);

CREATE TABLE "TIPO CONSTRUCCION" (
   id serial,
   tipo_const varchar(50) primary key
);


CREATE TABLE "RECAUDO" (
  
  id serial,
  numero_predial int primary key,
  categoria int,
  pagado boolean,
  fecha_pago date,
  FOREIGN KEY(categoria) REFERENCES "MUNICIPIO"(categoria)
);


CREATE TABLE "MUNICIPIO" (
  id serial,
  nombre_mun varchar(50) not null,
  categoria int primary key
);


