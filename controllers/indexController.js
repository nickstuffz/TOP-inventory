const db = require("../db/queries");

async function indexGet(req, res) {
  const inventory = await db.getInventory();
  const elements = await db.getElements();
  res.render("index", { inventory: inventory, elements: elements });
}

module.exports = { indexGet };
