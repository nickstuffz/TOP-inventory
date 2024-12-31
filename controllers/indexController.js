const db = require("../db/queries");

async function donutsGet(req, res) {
  const donuts = await db.getAllDonutsDetails();
  console.log(donuts);
  res.render("index", { donuts: donuts });
}

module.exports = { donutsGet };
