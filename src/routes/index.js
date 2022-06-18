//router index
const router = require("express").Router();

//Categories-Routes
const categoryRouter = require("./category.router");
router.use("/categories", categoryRouter);

//Products-Routes
const productRouter = require("./product.router");
router.use("/products", productRouter);

module.exports = router;
