const router = require("express").Router();
const { Category } = require("../models");
const {
    createCategory,
    updateCategory,
    addSubCategoryToCategory,
    deleteSubCategoryToCategory,
} = require("../controllers/category.controller");
const { findAll, findOne, remove } = require("../services/crud.service");

//Categories router
router.get("/", findAll(Category));
router.get("/:id", findOne(Category));
router.post("/", createCategory);
router.patch("/:id", updateCategory);
router.patch("/add/sub/:id", addSubCategoryToCategory);
router.patch("/delete/sub/:id", deleteSubCategoryToCategory);
router.delete("/:id", remove(Category));

module.exports = router;
