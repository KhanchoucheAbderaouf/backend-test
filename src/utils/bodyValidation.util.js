const Joi = require("joi");

module.exports = {
    createProductValidation: async (body) => {
        let product = Joi.object()
            .keys({
                name: Joi.string().required(),
                categories: Joi.array().items(Joi.string()).min(0).optional(),
            })
            .validate(body);
        if (product.error) {
            return {
                error: product.error.details[0].message
                    .replace(/\\/g, "")
                    .replace(/"/g, "")
                    .split(":")[0],
            };
        }
        return true;
    },
    createCategoryValidation: async (body) => {
        let category = Joi.object()
            .keys({
                name: Joi.string().required(),
                subs: Joi.array().items(Joi.string()).min(0).optional(),
            })
            .validate(body);
        if (category.error) {
            return {
                error: category.error.details[0].message
                    .replace(/\\/g, "")
                    .replace(/"/g, "")
                    .split(":")[0],
            };
        }
        return true;
    },
};
