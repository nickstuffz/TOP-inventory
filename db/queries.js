const pool = require("./pool");

async function getAllDonuts() {
  const { rows } = await pool.query("SELECT * FROM donuts");
  return rows;
}

module.exports = { getAllDonuts };
