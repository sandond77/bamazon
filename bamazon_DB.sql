DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
id INT NOT NULL auto_increment,
product_name VARCHAR(30) NOT NULL,
department_name VARCHAR(30) NOT NULL,
price FLOAT NOT NULL,
stock_quantity INT NOT NULL,
PRIMARY KEY(id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Apple","Produce", 1.00, 450);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Banana","Produce", 0.29, 650);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pear","Produce", 0.59, 750);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iTouch","Electronics", 299.00, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPod","Electronics", 199.00, 150);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPhone","Electronics", 899.00, 3000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Television","Electronics", 599.99, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Playstation","Electronics", 249.00, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Xbox","Electronics", 299.00, 250);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Watermelon","Product", 2.99, 50);


SELECT * FROM products;