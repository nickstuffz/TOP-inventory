const db = require("../db/queries");

async function donutsGet(req, res) {
  const donuts = await db.getAllDonuts();
  res.send(donuts);
}

module.exports = { donutsGet };
