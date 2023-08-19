const mongoose = require("mongoose");
const connectDatabase = () => {
  mongoose
    .connect(process.env.URL)
    .then(() => {
      console.log(`Connection to database is successful`);
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = connectDatabase;
