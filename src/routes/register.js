const express = require('express')
const app = express.Router()
const {signUpValidation,loginValidation} = require('../../users/models/user.validate')



app.post('/signin',async (req,res)=>{
    const {name, email, password} = req.body
    try{
        let value = await loginValidation.validateAsync(req.body)
    }catch(err){
        console.log(err)
    }

})

app.post('login',(req,res)=>{
    console.log(res);
})

module.exports = app