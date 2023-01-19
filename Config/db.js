const mongoose = require("mongoose");
const connect = async () => {
    return mongoose.connect(
        "mongodb+srv://p:t@cluster0.mndmrhq.mongodb.net/test",
    );
};
module.exports = connect;