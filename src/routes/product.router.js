const router = require("express").Router();
const { Product } = require("../models");
const {
    createProduct,
    updateProduct,
    addCategoryToProduct,
    deleteCategoryFromProduct
} = require("../controllers/product.controller");
const { findAll, findOne, remove } = require("../services/crud.service");

//Products router
router.get("/", findAll(Product));
router.get("/:id", findOne(Product));
router.post("/", createProduct);
router.patch("/add/category/:id", addCategoryToProduct);
router.patch("/delete/category/:id", deleteCategoryFromProduct);
router.patch("/:id", updateProduct);
router.delete("/:id", remove(Product));

module.exports = router;
