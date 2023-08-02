const express = require('express');
const cors =  require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post("/test", async (req, res) => {
  res.status(201).send({user: req.body.user, pass: req.body.pass});
});

app.listen(8000, () => {
    console.log('I am running on port 8000');
});