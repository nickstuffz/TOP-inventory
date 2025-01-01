const pool = require("./pool");

const getInventorySQL = `
SELECT
  donuts.name AS name,
  donuts.quantity as quantity,
  donuts.description as description,
  types.name AS type,
  shapes.name AS shape,
  fillings.name AS filling,
  ARRAY_AGG(toppings.name) FILTER (WHERE toppings.name IS NOT NULL) AS toppings,
  (types.price + shapes.price + COALESCE(fillings.price, 0) + COALESCE(SUM(toppings.price), 0)) AS price
FROM
  donuts
  LEFT JOIN types ON donuts.type_id = types.id
  LEFT JOIN shapes ON donuts.shape_id = shapes.id
  LEFT JOIN fillings ON donuts.filling_id = fillings.id
  LEFT JOIN donut_toppings ON donuts.id = donut_toppings.donut_id
  LEFT JOIN toppings ON donut_toppings.topping_id = toppings.id
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
  types
UNION ALL
SELECT
  'Shapes',
  ARRAY_AGG(name)
FROM
  shapes
UNION ALL
SELECT
  'Fillings',
  ARRAY_AGG(name)
FROM
  fillings
UNION ALL
SELECT
  'Toppings',
  ARRAY_AGG(name)
FROM
  toppings
`;

async function getInventory() {
  const { rows } = await pool.query(getInventorySQL);
  return rows;
}

async function getElements() {
  const { rows } = await pool.query(getElementsSQL);
  return rows;
}

module.exports = { getInventory, getElements };
