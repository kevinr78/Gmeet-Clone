const express = require('express')
const app = express.Router()
const bcrpyt = require('bcryptjs')
const {signUpValidation,loginValidation} = require('../../users/models/user.validate')

const User = require('../../users/models/user.schema')



app.post('/signin',async (req,res)=>{
    const {error} = signUpValidation.validate(req.body)
    if(error){
        return res.status(400).send({status:0,message:error.details})
    }

    /* Check if email exists */
    let emailExist =await User.findOne({email:req.body.email})
    if(emailExist) return res.status(400).send({status:false,message:"Email already exists"})

    /* Hash Password */
    let salt = await bcrpyt.genSalt(10)
    let hashedPassword = await bcrpyt.hash(req.body.password, salt)

    /* Create a new User*/
    
    const newUser = new User({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword
    })
try {
    let savedUser = await newUser.save()
    console.log(savedUser)

} catch (error) {
    res.status(400).send(error)
}

})

app.post('/login',async (req,res)=>{
    try{
        let value = await loginValidation.validate(req.body)
    }catch(err){
        console.log(err)
    }
})

module.exports = app