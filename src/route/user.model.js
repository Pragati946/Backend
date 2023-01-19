const { model, Schema } = require("mongoose");
const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true,

    },
    password: String,

})
const userModel = model("user", userSchema);

module.exports = userModel