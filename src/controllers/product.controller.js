const productService = require("../services/product.service");
var ObjectId = require("mongoose").Types.ObjectId;

module.exports = {
    createProduct: async (req, res) => {
        try {
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
    findProductByCategory: async (req, res) => {
        try {
            let { size, category } = req.query;
            //verify that the category id is in a valid format
            if (!ObjectId.isValid(category)) {
                return res
                    .status(400)
                    .json({ error: "The category id is wrong" });
            }
            //create the product
            const product = await productService.findByCategory(category);
            //in case an error happened
            if (product.error) {
                return res
                    .status(product.status)
                    .json({ error: product.error });
            }
            //in case a size is defined to limit the find we slice the first {size} elements
            if (size && size > 0) {
                return res.status(200).json(product.slice(0, size));
            }
            //return all products if the size is not defined
            return res.status(200).json(product);
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    },
};
