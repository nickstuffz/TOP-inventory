#! /usr/bin/env node

require("dotenv").config();

const { Client } = require("pg");

const SQL = `

-- Statement # 1
DROP TABLE IF EXISTS Types, Shapes, Fillings, Toppings, Donuts;

-- Statement # 2
CREATE TABLE Types (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) UNIQUE NOT NULL,
  price DEC (4, 2) NOT NULL
);

-- Statement # 3
INSERT INTO Types (name, price)
  VALUES ('Yeast', 4.00),
  ('Cake', 5.00);

-- Statement # 4
CREATE TABLE Shapes (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) UNIQUE NOT NULL,
  price DEC (4, 2) NOT NULL
);

-- Statement # 5
INSERT INTO Shapes (name, price)
  VALUES ('Ring', 0.40),
  ('Twist', 0.50),
  ('Long', 0.45),
  ('Round', 0.50);

-- Statement # 6
CREATE TABLE Fillings (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) UNIQUE NOT NULL,
  price DEC (4, 2) NOT NULL
);

-- Statement # 7
INSERT INTO Fillings (name, price)
  VALUES ('Cream', 0.60),
  ('Custard', 0.65);

-- Statement # 8
CREATE TABLE Toppings (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) UNIQUE NOT NULL,
  price DEC (4, 2) NOT NULL
);

-- Statement # 9
INSERT INTO Toppings (name, price)
  VALUES ('Glaze', 0.40),
  ('Sugar', 0.45),
  ('Frosting', 0.50),
  ('Sprinkles', 0.40),
  ('Powder', 0.50),
  ('Crumble', 0.50);

-- Statement # 10
CREATE TABLE Donuts (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) UNIQUE NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  description TEXT,
  type_id INT NOT NULL REFERENCES Types (id) ON DELETE RESTRICT,
  shape_id INT NOT NULL REFERENCES Shapes (id) ON DELETE RESTRICT,
  filling_id INT NULL REFERENCES Fillings (id) ON DELETE RESTRICT
);

-- Statement # 11
INSERT INTO Donuts (name, quantity, description, type_id, shape_id, filling_id)
  VALUES ('Black Hole', 42, 'A delicious gravity, where nothing can escape.', 1, 1, NULL),
  ('Taurus Torus', 60, 'Yummy dough, no bullshit.', 1, 1, 1),
  ('Marie Antoinette', 1793, 'Let them eat donut, cake donut!', 2, 1, 2),
  ('Plain Jane', 10, 'Plain Jane always the same.', 1, 3, NULL);

-- Statement # 12
CREATE TABLE Donut_Toppings (
  donut_id INT NOT NULL REFERENCES Donuts (id) ON DELETE CASCADE,
  topping_id INT NOT NULL REFERENCES Toppings (id) ON DELETE CASCADE,
  PRIMARY KEY (donut_id, topping_id)
);

-- Statement # 13
INSERT INTO Donut_Toppings (donut_id, topping_id)
  VALUES (1, 2),
  (1, 6),
  (2, 1),
  (3, 3),
  (3, 4);

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
