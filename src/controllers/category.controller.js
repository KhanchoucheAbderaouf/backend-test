const categoryService = require("../services/category.service");

module.exports = {
    createCategory: async (req, res) => {
        try {
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
