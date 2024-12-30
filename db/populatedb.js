#! /usr/bin/env node

require("dotenv").config();

const { Client } = require("pg");

const SQL = `

DROP TABLE IF EXISTS Types, Shapes, Fillings, Toppings, Donuts;

CREATE TABLE Types
  (
     id INT PRIMARY KEY GENERATED always AS IDENTITY,name VARCHAR (255) UNIQUE NOT NULL,price DEC (4, 2) NOT NULL
  );

INSERT INTO Types
            (name,price)
VALUES      ('Yeast',4.00),
            ('Cake',5.00);

CREATE TABLE Shapes
  (
     id INT PRIMARY KEY GENERATED always AS IDENTITY,name VARCHAR (255) UNIQUE NOT NULL,price DEC (4, 2) NOT NULL
  );

INSERT INTO Shapes
            (name,price)
VALUES      ('Round',0.40),
            ('Twist',0.50),
            ('Long',0.45);

CREATE TABLE Fillings
  (
     id INT PRIMARY KEY GENERATED always AS IDENTITY,name VARCHAR (255) UNIQUE NOT NULL,price DEC (4, 2) NOT NULL
  );

INSERT INTO Fillings
            (name,price)
VALUES      ('Cream',0.60),
            ('Custard',0.65);

CREATE TABLE Toppings
  (
     id INT PRIMARY KEY GENERATED always AS IDENTITY,name VARCHAR (255) UNIQUE NOT NULL,price DEC (4, 2) NOT NULL
  );

INSERT INTO Toppings
            (name,price)
VALUES      ('Glaze',0.40),
            ('Sugar',0.45),
            ('Frosting',0.50),
            ('Sprinkles',0.40),
            ('Powder',0.50),
            ('Crumble',0.50); 

CREATE TABLE Donuts
  (
     id          INT PRIMARY KEY GENERATED always AS IDENTITY,
     name        VARCHAR (255) UNIQUE NOT NULL,
     quantity    INT NOT NULL DEFAULT 1,
     description TEXT,
     type_id     INT NOT NULL REFERENCES Types(id) ON DELETE RESTRICT ON UPDATE CASCADE,
     shape_id    INT NOT NULL REFERENCES Shapes(id) ON DELETE RESTRICT ON UPDATE CASCADE,
     filling_id  INT NULL REFERENCES Fillings(id) ON DELETE RESTRICT ON UPDATE CASCADE,
     topping_id  INT NULL REFERENCES Toppings(id) ON DELETE RESTRICT ON UPDATE CASCADE
  );

INSERT INTO Donuts
            (name,quantity,description,type_id,shape_id,filling_id,topping_id)
VALUES      ('Black Hole',42,'A delicious gravity, where nothing can escape.',1,1,NULL,1),
            ('Taurus Torus',60,'Yummy dough, no bullshit.',1,1,1,2),
            ('Marie Antoinette',1793,'Let them eat donut, cake donut!',2,1,2,5),
            ('Plain Jane',10,'Plain Jane always the same.',1,3,null,null);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@localhost:5432/top_inventory`,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
