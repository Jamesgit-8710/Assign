const mongoose = require("mongoose");

const connectDataBase = () => {
    mongoose.connect(process.env.CONN_STR).then(() => {
        console.log("Database connected!");
    }).catch((err) => {
        console.log(err);
    });
};

module.exports = connectDataBase;