const { Category } = require("../models");

module.exports = {
    create: async (body) => {
        try {
            //verify that the name doesn't already exists
            if (await Category.findOne({ name: body.name })) {
                return { error: "Category name already exists", status: 400 };
            }
            const category = await Category.create(body);
            if (!category) {
                return {
                    error: "Error on creating the category",
                    status: 500,
                };
            }
            return category;
        } catch (error) {
            return { error: error, status: 500 };
        }
    },
    update: async (id, body) => {
        try {
            const category = await Category.findOne({ _id: id });
            if (!category) {
                return { error: "Category not found", status: 404 };
            }
            //verify that the name doesn't already exists
            if (
                await Category.findOne({
                    name: body.name,
                    _id: { $ne: category._id },
                })
            ) {
                return { error: "Category name already exists", status: 400 };
            }
            await Category.updateOne({ _id: category._id }, body);
            return { message: "Category updated succefully" };
        } catch (error) {
            return { error: error, status: 500 };
        }
    },
    addSubCategory: async (id, subCategory) => {
        try {
            const category = await Category.findOne({ _id: id });
            //verify that the category exists
            if (!category) {
                return { error: "Category not found", status: 404 };
            }
            const subCategoryDB = await Category.findOne({ _id: subCategory });
            //verify that the subCategory exists
            if (!subCategoryDB) {
                return { error: "Sub category not found", status: 400 };
            }
            //verify that the subCategory is not already in the category
            if (category.subs.indexOf(subCategory) !== -1) {
                return { error: "The subCategory is already added", status: 400 };
            }
            //add the subCategory to the category and update the category
            category.subs.push(subCategory);
            await Category.updateOne(
                {
                    _id: id,
                },
                { subs: category.subs }
            );
            return { message: "Category added to the category succefully" };
        } catch (error) {
            return { error: error, status: 500 };
        }
    },
    deleteSubCategory: async (id, subCategory) => {
        try {
            const category = await Category.findOne({ _id: id });
            //verify that the category exists
            if (!category) {
                return { error: "Category not found", status: 404 };
            }
            const subCategoryDB = await Category.findOne({ _id: subCategory });
            //verify that the subCategory exists
            if (!subCategoryDB) {
                return { error: "Category not found", status: 400 };
            }
            //verify that the subCategory is not already in the category
            const categoryIndex = category.subs.indexOf(subCategory);
            if (categoryIndex === -1) {
                return {
                    error: "The subCategory doesn't exist in the category",
                    status: 400,
                };
            }
            //add the subCategory to the category and update the category
            category.subs.splice(categoryIndex, 1);
            await Category.updateOne(
                {
                    _id: id,
                },
                { subs: category.subs }
            );
            return { message: "Category delete from the category succefully" };
        } catch (error) {
            return { error: error, status: 500 };
        }
    },
};
