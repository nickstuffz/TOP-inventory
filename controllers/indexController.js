const db = require("../db/queries");

async function indexGet(req, res) {
  const inventory = await db.getInventory();
  const elements = await db.getElements();
  res.render("index", { inventory: inventory, elements: elements });
}

async function donutAddDonutPost(req, res) {
  console.log(req.body);
  await db.addDonut();
  res.redirect("/");
}

async function donutEditDonutPost(req, res) {
  res.send("Edited Donut");
}
module.exports = { indexGet, donutAddDonutPost, donutEditDonutPost };
