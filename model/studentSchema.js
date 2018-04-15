const Schema = require("mongoose").Schema;

let StudentSchema = new Schema({
    name: String,
    studentNumber: String,
    email: String
}, {
    collection: "students"
});

module.exports = StudentSchema;
