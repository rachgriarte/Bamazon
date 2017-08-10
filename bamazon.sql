DROP DATABASE IF EXISTS bamazonDB;
CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
id INTEGER(10)  AUTO_INCREMENT NOT NULL,
product_name VARCHAR (50) NULL,
department_name VARCHAR (50) NULL,
price DECIMAL (50, 2) NULL,
stock_quantity INTEGER (50) NULL,
PRIMARY KEY (id)
);

SELECT * FROM products