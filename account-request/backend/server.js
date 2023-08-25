const dotenv = require("dotenv");
dotenv.config({path: "./config.env"});

const connectDB = require("./config/connectWithDataBase");
const app =  require("./app");
const Producer = require("./producer");
const producer=new Producer();

connectDB();

producer.create();

const port = process.env.PORT;

app.listen(port, () => {
    console.log("Account Request server has started on port : ", port);
});