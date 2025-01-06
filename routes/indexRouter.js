const { Router } = require("express");
const indexController = require("../controllers/indexController.js");

const indexRouter = Router();

indexRouter.get("/", indexController.indexGet);
indexRouter.post("/inventory/add", indexController.donutAddDonutPost);
indexRouter.post("/inventory/update", indexController.donutEditDonutPost);

module.exports = indexRouter;
