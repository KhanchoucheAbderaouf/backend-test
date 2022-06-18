const Joi = require("joi");
var ObjectId = require("mongoose").Types.ObjectId;

module.exports = {
    ProductValidation: async (req, res, next) => {
        let product = Joi.object()
            .keys({
                name: Joi.string().required(),
                categories: Joi.array().items(Joi.string()).min(0).optional(),
            })
            .validate(req.body);
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
        next();
    },
    CategoryValidation: async (req, res, next) => {
        let category = Joi.object()
            .keys({
                name: Joi.string().required(),
                subs: Joi.array().items(Joi.string()).min(0).optional(),
            })
            .validate(req.body);
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
        next();
    },
    addDeleteCategoryValidation: async (req, res, next) => {
        let category = Joi.object()
            .keys({
                category: Joi.string().required(),
            })
            .validate(req.body);
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
        if (!ObjectId.isValid(req.body.category)) {
            return res
                .status(400)
                .json({ error: "The category id format is not valid" });
        }
        next();
    },
    addDeleteSubCategoryValidation: async (req, res, next) => {
        let category = Joi.object()
            .keys({
                category: Joi.string().required(),
            })
            .validate(req.body);
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
        if (!ObjectId.isValid(req.body.category)) {
            return res
                .status(400)
                .json({ error: "The sub category id format is not valid" });
        }
        next();
    },
};
