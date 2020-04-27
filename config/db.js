const mongoose = require("mongoose");
/*******************************************************/
const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex:true,
        useFindAndModify:false
    });
    console.log("mongoDB Connected....".brightBlue);
    console.log(`mongoDB Connected : ${conn.connection.host}`.blue);
};
/*******************************************************/
module.exports = connectDB;
