//product model
const { createModel } = require("../../configs/db");
const mongoose = require("mongoose");

const Product = createModel("Product", {
    name: {
        type: String,
        required: true,
        unique: true,
    },
    categories: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Category",
                required: true,
            },
        ],
        default: [],
    },
});

module.exports = {
    Product,
};
