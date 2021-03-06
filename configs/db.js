const mongoose = require("mongoose");

//coonect to the database
async function connection() {
    await mongoose
        .connect(
            `${process.env.DB_ROOT}://${process.env.DB_HOST}/${process.env.DB_NAME}`
        )
        .then(() => {
            //in case of successful connection
            console.log("MongoDB connection Success !!!");
        })
        .catch((error) => {
            //in case of error on the connection
            console.log("Database connection error : ", error);
        });
}

//a function that init a mongodb schema
function createSchema(schema) {
    return new mongoose.Schema(schema, {
        timestamps: true,
        versionKey: false,
    });
}

//create the model from the schema
function createModel(name, schemaStructor) {
    let schema = createSchema(schemaStructor);
    return mongoose.model(name, schema);
}

module.exports = {
    connection,
    createModel,
};
