
const express = require('express');
const res = require('express/lib/response');
const app = express()
const path= require('path')
const register = require('./src/routes/register')
const mongoose = require('mongoose');
const { handle } = require('express/lib/application');

const appDir = path.join(__dirname,"public")
app.use(express.static(appDir));
app.use(express.json())
app.use('/home',register)

try {
    
mongoose.connect('mongodb://localhost:27017/User',{
    useNewURLParser:true,
    useUnifiedTopology:true
})

} catch (error) {
    handleError(error)
}


app.get('/',(req, res)=>{
    res.sendFile(appDir+'/html/index.html')
})



app.listen('3000',(req,res)=>{
    console.log("Server has started");
})