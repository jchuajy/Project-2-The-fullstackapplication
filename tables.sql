-- create products table
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name varchar(255),
  colour varchar(255),
  img varchar(255),
description varchar(255),
  price varchar(255),
  quantity integer,
  is_eol boolean
);

-- create users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name varchar(255),
  email varchar(255),
  password varchar(255),
  is_admin boolean
);

-- create orders table
CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      customer_id varchar(255),
      shipment_number varchar(255),
      payment_status varchar(255)
);