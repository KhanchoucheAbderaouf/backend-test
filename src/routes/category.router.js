const router = require("express").Router();
const { Category } = require("../models");
const {
    createCategory,
    updateCategory,
    addSubCategoryToCategory,
    deleteSubCategoryToCategory,
} = require("../controllers/category.controller");
const { findAll, findOne, remove } = require("../services/crud.service");
const {
    CategoryValidation,
    addDeleteSubCategoryValidation,
} = require("../middlewares/bodyValidation.middleware");

//Categories router
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
