#! /usr/bin/env node

require("dotenv").config();

const { Client } = require("pg");

const SQL = `
DROP TABLE IF EXISTS donuts;

CREATE TABLE donuts (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR ( 255 )
);

INSERT INTO donuts (title) 
VALUES
  ('Chocolate Glazed'),
  ('Classic Sugar');
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
