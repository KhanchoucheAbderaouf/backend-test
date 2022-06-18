// categories router
const router = require("express").Router();
const { Category } = require("../models");
const {
    createCategory,
    updateCategory,
    addSubCategoryToCategory,
    deleteSubCategoryToCategory,
} = require("../controllers/category.controller");

//crud functions import
const { findAll, findOne, remove } = require("../services/crud.service");

//verification middlewares
const {
    CategoryValidation,
    addDeleteSubCategoryValidation,
} = require("../middlewares/bodyValidation.middleware");

//Categories routes
router.get("/", findAll(Category));
router.get("/:id", findOne(Category));
router.post("/", CategoryValidation, createCategory);
router.patch("/:id", CategoryValidation, updateCategory);
router.patch(
    "/add/sub/:id",
    addDeleteSubCategoryValidation,
    addSubCategoryToCategory
);
router.patch(
    "/delete/sub/:id",
    addDeleteSubCategoryValidation,
    deleteSubCategoryToCategory
);
router.delete("/:id", remove(Category));

module.exports = router;
