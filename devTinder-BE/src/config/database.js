const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://ReBorn:FVLBEKGS9CQgSpvn@zamilnodejs.z1mpjcf.mongodb.net/devTinder"

    );
};

module.exports = connectDB;