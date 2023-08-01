const express = require('express');
const cors =  require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post("/test", async (req, res) => {
    console.log(req.body.user)
  res.status(201).send(`New user created successfully! \n Name : ${req.body.user} \n Password : ${req.body.pass}`);
});

app.listen(8000, () => {
    console.log('I am running on port 8000');
});