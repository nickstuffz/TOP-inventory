const db = require("../db/queries");

async function indexGet(req, res) {
  const donuts = await db.getInventory();
  console.log(donuts);

  const elements = await db.getElements();
  console.log(elements);
  res.render("index", { donuts: donuts });
}

module.exports = { indexGet };
