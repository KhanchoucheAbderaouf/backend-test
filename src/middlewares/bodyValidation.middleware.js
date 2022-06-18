const Joi = require("joi");
var ObjectId = require("mongoose").Types.ObjectId;

module.exports = {
    ProductValidation: async (req, res, next) => {
        //validate the create and update product body using joi
        let product = Joi.object()
            .keys({
                name: Joi.string().required(),
                categories: Joi.array().items(Joi.string()).min(0).optional(),
            })
            .validate(req.body);
        //in case of the error
        if (product.error) {
            return res.status(400).json({
                error:
                    "Request body error : " +
                    product.error.details[0].message
                        .replace(/\\/g, "")
                        .replace(/"/g, "")
                        .split(":")[0],
            });
        }
        //if there is no error go next to the controller
        next();
    },
    CategoryValidation: async (req, res, next) => {
        //validate the create and update category body using joi
        let category = Joi.object()
            .keys({
                name: Joi.string().required(),
                subs: Joi.array().items(Joi.string()).min(0).optional(),
            })
            .validate(req.body);
        //in case of the error
        if (category.error) {
            return res.status(400).json({
                error:
                    "Request body error : " +
                    category.error.details[0].message
                        .replace(/\\/g, "")
                        .replace(/"/g, "")
                        .split(":")[0],
            });
        }
        //if there is no error go next to the controller
        next();
    },
    addDeleteCategoryValidation: async (req, res, next) => {
        //validate the add and delete category to and from product
        let category = Joi.object()
            .keys({
                category: Joi.string().required(),
            })
            .validate(req.body);
        //in case of the error
        if (category.error) {
            return res.status(400).json({
                error:
                    "Request body error : " +
                    category.error.details[0].message
                        .replace(/\\/g, "")
                        .replace(/"/g, "")
                        .split(":")[0],
            });
        }
        //verify that the id is on a valid format of mongodb ObjectID
        if (!ObjectId.isValid(req.body.category)) {
            return res
                .status(400)
                .json({ error: "The category id format is not valid" });
        }
        //if there is no error go next to the controller
        next();
    },
    addDeleteSubCategoryValidation: async (req, res, next) => {
        //validate the add and delete sub category to and from category
        let category = Joi.object()
            .keys({
                category: Joi.string().required(),
            })
            .validate(req.body);
        //in case of the error
        if (category.error) {
            return res.status(400).json({
                error:
                    "Request body error : " +
                    category.error.details[0].message
                        .replace(/\\/g, "")
                        .replace(/"/g, "")
                        .split(":")[0],
            });
        }
        //verify that the id is on a valid format of mongodb ObjectID
        if (!ObjectId.isValid(req.body.category)) {
            return res
                .status(400)
                .json({ error: "The sub category id format is not valid" });
        }
        //if there is no error go next to the controller
        next();
    },
};
