const { Product, Category } = require("../models");

module.exports = {
    create: async (body) => {
        try {
            //verify that the name doesn't already exists in db
            if (await Product.findOne({ name: body.name })) {
                return { error: "Product name already exists", status: 400 };
            }
            //crete the product
            const product = await Product.create(body);
            //in case of an error in the creation
            if (!product) {
                return {
                    error: "Error on creating the product",
                    status: 500,
                };
            }
            //if success
            return product;
        } catch (error) {
            return { error: error, status: 500 };
        }
    },
    update: async (id, body) => {
        try {
            //verify that the product to update exists in db
            const product = await Product.findOne({ _id: id });
            if (!product) {
                return { error: "Product not found", status: 404 };
            }
            //verify that the name doesn't already exists in db
            if (
                await Product.findOne({
                    name: body.name,
                    _id: { $ne: product._id },
                })
            ) {
                return { error: "Product name already exists", status: 400 };
            }
            //update the product
            await Product.updateOne({ _id: product._id }, body);
            //if success
            return { message: "Product updated succefully" };
        } catch (error) {
            return { error: error, status: 500 };
        }
    },
    addCategory: async (id, category) => {
        try {
            const product = await Product.findOne({ _id: id });
            //verify that the product exists in db
            if (!product) {
                return { error: "Product not found", status: 404 };
            }
            const categoryDB = await Category.findOne({ _id: category });
            //verify that the category exists in db
            if (!categoryDB) {
                return { error: "Category not found", status: 400 };
            }
            //verify that the category is not already in the product
            if (product.categories.indexOf(category) !== -1) {
                return { error: "The category is already added", status: 400 };
            }
            //add the category to the product and update the product
            product.categories.push(category);
            await Product.updateOne(
                {
                    _id: id,
                },
                { categories: product.categories }
            );
            return { message: "Category added to the product succefully" };
        } catch (error) {
            return { error: error, status: 500 };
        }
    },
    deleteCategory: async (id, category) => {
        try {
            const product = await Product.findOne({ _id: id });
            //verify that the product exists in db
            if (!product) {
                return { error: "Product not found", status: 404 };
            }
            const categoryDB = await Category.findOne({ _id: category });
            //verify that the category exists in db
            if (!categoryDB) {
                return { error: "Category not found", status: 400 };
            }
            //verify that the category is in the product
            const categoryIndex = product.categories.indexOf(category);
            if (categoryIndex === -1) {
                return {
                    error: "The category doesn't exist in the product",
                    status: 400,
                };
            }
            //delete the category from the product and update the product
            product.categories.splice(categoryIndex, 1);
            await Product.updateOne(
                {
                    _id: id,
                },
                { categories: product.categories }
            );
            return { message: "Category delete from the product succefully" };
        } catch (error) {
            return { error: error, status: 500 };
        }
    },
    findByCategory: async (category) => {
        try {
            //find first the category that we are looking for
            const categoryDB = await Category.findOne({ _id: category });
            //use the operator or to ge the products with the defined category id and it's subs
            const products = Product.find({
                $or: [
                    { categories: categoryDB._id },
                    { categories: { $in: categoryDB.subs } },
                ],
            });
            if (!products) {
                return {
                    error: "Error on finding the products",
                    status: 500,
                };
            }
            return products;
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    },
};
