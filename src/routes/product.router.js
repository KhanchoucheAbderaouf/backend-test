const router = require("express").Router();
const { Product } = require("../models");
const {
    createProduct,
    updateProduct,
    addCategoryToProduct,
    deleteCategoryFromProduct,
    findProductByCategory,
} = require("../controllers/product.controller");
const { findAll, findOne, remove } = require("../services/crud.service");
const {
    ProductValidation,
    addDeleteCategoryValidation,
} = require("../middlewares/bodyValidation.middleware");

//Products router
router.get("/", findAll(Product));
router.get("/category", findProductByCategory);
router.get("/:id", findOne(Product));
router.post("/", ProductValidation, createProduct);
router.patch(
    "/add/category/:id",
    addDeleteCategoryValidation,
    addCategoryToProduct
);
router.patch(
    "/delete/category/:id",
    addDeleteCategoryValidation,
    deleteCategoryFromProduct
);
router.patch("/:id", ProductValidation, updateProduct);
router.delete("/:id", remove(Product));

module.exports = router;
