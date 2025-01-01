const pool = require("./pool");

const inventorySQL = `
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

const elementsSQL = `
SELECT
    types.name AS types,
    shapes.name AS shapes,
    fillings.name AS fillings,
    toppings.name AS toppings
FROM
    types
`;

async function getInventory() {
  const { rows } = await pool.query(inventorySQL);
  return rows;
}

async function getElements() {
  return "elements";
}

module.exports = { getInventory, getElements };
