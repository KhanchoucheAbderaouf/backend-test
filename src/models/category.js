const { createModel } = require("../../configs/db");
const mongoose = require("mongoose");

const Category = createModel("Category", {
    name: {
        type: String,
        required: true,
        unique: true,
    },
    subs: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Category",
                required: true,
            },
        ],
    },
});

module.exports = {
    Category,
};
