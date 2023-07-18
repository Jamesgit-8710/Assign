const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors')

app.use(cors())
app.use(express.json())




app.post('/signup', (req, res) => {

    if(!fs.existsSync('xyz.json')){
        fs.writeFileSync("xyz.json",'[]')
    }

    const d = req.body;

    fs.readFile('xyz.json', (err,user)=>{

        const val = JSON.parse(user);

        val.push(d)

        fs.writeFile("xyz.json", JSON.stringify(val), () => {
            res.send("signed up successfully")
        })

    })

    
})

app.post('/login', (req, res) => {

    if(!fs.existsSync('xyz.json')){
        fs.writeFileSync("xyz.json",'[]')
    }

    const d = req.body;

    let response = "";

    fs.readFile('xyz.json', (err,user)=>{

        const data = JSON.parse(user);

        for(let i of data){
        if(d.username==i.username && d.password==i.password){
            response="already exist!"
            break;
        }
    }

        // val.push(d)

        // fs.writeFile("xyz.json", JSON.stringify(val), () => {
        //     res.send("signed up successfully")
        // })

    })
    

    res.send(response);
})


app.listen(8000,()=>{
    console.log(`I'm running on port ${8000}`);
});

