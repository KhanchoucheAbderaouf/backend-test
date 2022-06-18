const productService = require("../services/product.service");
const { createProductValidation } = require("../utils/bodyValidation.util");
var ObjectId = require("mongoose").Types.ObjectId;

module.exports = {
    createProduct: async (req, res) => {
        try {
            //verify the body using joi
            const bodyVerification = await createProductValidation(req.body);
            if (bodyVerification.error) {
                return res.status(400).json({
                    error: bodyVerification.error,
                });
            }
            //create the product
            const product = await productService.create(req.body);
            //in case an error happened
            if (product.error) {
                return res
                    .status(product.status)
                    .json({ error: product.error });
            }
            //return the value of the created product
            return res.status(200).json(product);
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    },
    updateProduct: async (req, res) => {
        try {
            //verify the body using joi
            const bodyVerification = await createProductValidation(req.body);
            if (bodyVerification.error) {
                return res.status(400).json({
                    error: bodyVerification.error,
                });
            }
            //update the product
            const product = await productService.update(
                req.params.id,
                req.body
            );
            //in case an error happened
            if (product.error) {
                return res
                    .status(product.status)
                    .json({ error: product.error });
            }
            //return the value of the created product
            return res.status(200).json(product);
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    },
    addCategoryToProduct: async (req, res) => {
        try {
            //verify the body
            if (!req.body.category) {
                return res
                    .status(400)
                    .json({ error: "The category id is missing in the body" });
            }
            //verify that the category id is in a valid format
            if (!ObjectId.isValid(req.body.category)) {
                return res
                    .status(400)
                    .json({ error: "The category id is wrong" });
            }
            const product = await productService.addCategory(
                req.params.id,
                req.body.category
            );
            //in case an error happened
            if (product.error) {
                return res
                    .status(product.status)
                    .json({ error: product.error });
            }
            //return the value of the created product
            return res.status(200).json(product);
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    },
    deleteCategoryFromProduct: async (req, res) => {
        try {
            //verify the body
            if (!req.body.category) {
                return res
                    .status(400)
                    .json({ error: "The category id is missing in the body" });
            }
            //verify that the category id is in a valid format
            if (!ObjectId.isValid(req.body.category)) {
                return res
                    .status(400)
                    .json({ error: "The category id is wrong" });
            }
            const product = await productService.deleteCategory(
                req.params.id,
                req.body.category
            );
            //in case an error happened
            if (product.error) {
                return res
                    .status(product.status)
                    .json({ error: product.error });
            }
            //return the value of the created product
            return res.status(200).json(product);
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    },
};
