const db = require("../db/queries");

async function donutsGet(req, res) {
  const donuts = await db.getAllDonuts();
  res.render("index", { donuts: donuts });
}

module.exports = { donutsGet };
