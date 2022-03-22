const express = require("express")
const app = express() ;
const cors = require('cors')
const session = require("express-session")
require("dotenv").config() ;

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin: process.env.CORS_URL,
    credentials: true
}));
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "https://employer-sigma.vercel.app/");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("crossDomain", true);
    next();
  });




app.get('/', (req, res) => {
    res.send("Hey, There!").status(200)
})

app.listen(process.env.PORT || 8080, () => {
    console.log("http://localhost:8080")
})

module.exports = app ;