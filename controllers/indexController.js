const db = require("../db/queries");

async function indexGet(req, res) {
  const inventory = await db.getInventory();
  const elements = await db.getElements();
  res.render("index", { inventory: inventory, elements: elements });
}

async function donutAddPost(req, res) {
  res.send("Added Donut");
}

async function donutEditPost(req, res) {
  res.send("Edited Donut");
}
module.exports = { indexGet, donutAddPost, donutEditPost };
