const productService = require("../services/product.service");

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
            let { size, page, order, direction, category } = req.query;
            let pagination = {};
            if (size) {
                pagination.limit = size;
                pagination.skip = (page && page > 0 ? page - 1 : 0) * size;
            }
            if (order) {
                pagination.sort = {};
                pagination.sort[order] = direction ? parseInt(direction) : 1;
            }
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
            //return the value of the created product
            return res.status(200).json(product);
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    },
};
