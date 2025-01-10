const db = require("../db/queries");

function normalizeToArray(data) {
  if (Array.isArray(data)) return data;
  if (data === null) return [];
  return [data];
}

async function indexGet(req, res) {
  const inventoryRaw = await db.getInventory();
  const elementsRaw = await db.getElements();

  const elementCategories = elementsRaw.map((element) => {
    return element.category;
  });

  const inventory = inventoryRaw.map((donut) => {
    const donutElements = elementCategories.reduce((acc, category) => {
      acc[category] = normalizeToArray(donut[category]);
      return acc;
    }, {});
    return {
      ...donut,
      ...donutElements,
    };
  });

  const elements = elementsRaw.map((element) => {
    return { ...element, names: normalizeToArray(element.names) };
  });

  res.render("index", {
    inventory: inventory,
    elements: elements,
    elementCategories: elementCategories,
  });
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
