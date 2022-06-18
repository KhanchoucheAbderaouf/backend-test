const categoryService = require("../services/category.service");
const { createCategoryValidation } = require("../utils/bodyValidation.util");
var ObjectId = require("mongoose").Types.ObjectId;

module.exports = {
    createCategory: async (req, res) => {
        try {
            //verify the body using joi
            const bodyVerification = await createCategoryValidation(req.body);
            if (bodyVerification.error) {
                return res.status(400).json({
                    error: bodyVerification.error,
                });
            }
            //create the category
            const category = await categoryService.create(req.body);
            //in case an error happened
            if (category.error) {
                return res
                    .status(category.status)
                    .json({ error: category.error });
            }
            //return the value of the created category
            return res.status(200).json(category);
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    },
    updateCategory: async (req, res) => {
        try {
            //verify the body using joi
            const bodyVerification = await createCategoryValidation(req.body);
            if (bodyVerification.error) {
                return res.status(400).json({
                    error: bodyVerification.error,
                });
            }
            //update the category
            const category = await categoryService.update(
                req.params.id,
                req.body
            );
            //in case an error happened
            if (category.error) {
                return res
                    .status(category.status)
                    .json({ error: category.error });
            }
            //return the value of the created category
            return res.status(200).json(category);
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    },
    addSubCategoryToCategory: async (req, res) => {
        try {
            //verify the body
            if (!req.body.category) {
                return res.status(400).json({
                    error: "The sub category id is missing in the body",
                });
            }
            //verify that the category id is in a valid format
            if (!ObjectId.isValid(req.body.category)) {
                return res
                    .status(400)
                    .json({ error: "The sub category id is wrong" });
            }
            console.log("here")
            const category = await categoryService.addSubCategory(
                req.params.id,
                req.body.category
            );
            //in case an error happened
            if (category.error) {
                return res
                    .status(category.status)
                    .json({ error: category.error });
            }
            //return the value of the created category
            return res.status(200).json(category);
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    },
    deleteSubCategoryToCategory: async (req, res) => {
        try {
            //verify the body
            if (!req.body.category) {
                return res
                    .status(400)
                    .json({
                        error: "The sub category id is missing in the body",
                    });
            }
            //verify that the category id is in a valid format
            if (!ObjectId.isValid(req.body.category)) {
                return res
                    .status(400)
                    .json({ error: "The sub category id is wrong" });
            }
            const category = await categoryService.deleteSubCategory(
                req.params.id,
                req.body.category
            );
            //in case an error happened
            if (category.error) {
                return res
                    .status(category.status)
                    .json({ error: category.error });
            }
            //return the value of the created category
            return res.status(200).json(category);
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    },
};
