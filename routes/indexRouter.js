const { Router } = require("express");
const indexController = require("../controllers/indexController.js");

const indexRouter = Router();

indexRouter.get("/", indexController.indexGet);
indexRouter.post("/inventory/add", indexController.donutAddPost);
indexRouter.post("/inventory/update", indexController.donutEditPost);

module.exports = indexRouter;
