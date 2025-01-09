const pool = require("./pool");

const getInventorySQL = `
SELECT
  donuts.id AS id,
  donuts.name AS name,
  donuts.quantity as quantity,
  donuts.description as description,
  types.name AS types,
  shapes.name AS shapes,
  fillings.name AS fillings,
  ARRAY_AGG(toppings.name) FILTER (WHERE toppings.name IS NOT NULL) AS toppings,
  (types.price + shapes.price + COALESCE(fillings.price, 0) + COALESCE(SUM(toppings.price), 0)) AS price
FROM
  Donuts
  LEFT JOIN Types ON donuts.type_id = types.id
  LEFT JOIN Shapes ON donuts.shape_id = shapes.id
  LEFT JOIN Fillings ON donuts.filling_id = fillings.id
  LEFT JOIN Donut_toppings ON donuts.id = donut_toppings.donut_id
  LEFT JOIN Toppings ON donut_toppings.topping_id = toppings.id
GROUP BY
  donuts.id,
  donuts.name,
  donuts.quantity,
  donuts.description,
  types.name,
  types.price,
  shapes.name,
  shapes.price,
  fillings.name,
  fillings.price
ORDER BY
  donuts.id;
`;

const getElementsSQL = `
SELECT
  'Types' AS category,
  ARRAY_AGG(name) AS names
FROM
  Types
UNION ALL
SELECT
  'Shapes',
  ARRAY_AGG(name)
FROM
  Shapes
UNION ALL
SELECT
  'Fillings',
  ARRAY_AGG(name)
FROM
  Fillings
UNION ALL
SELECT
  'Toppings',
  ARRAY_AGG(name)
FROM
  Toppings
`;

async function getInventory() {
  const { rows } = await pool.query(getInventorySQL);
  return rows;
}

async function getElements() {
  const { rows } = await pool.query(getElementsSQL);
  return rows;
}

async function addDonut() {
  // await pool.query("INSERT INTO Donuts (name,quantity,description,type,shape,filling,toppings)");
}

module.exports = { getInventory, getElements };
