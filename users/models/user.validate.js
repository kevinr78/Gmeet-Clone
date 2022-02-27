const Joi =require('joi')


const signUpValidation = Joi.object({
    name:Joi.string().min(2).required(),
    email:Joi.string().email(),
    password:Joi.string().required()
})

const loginValidation = Joi.object({
    email:Joi.string().email(),
    password:Joi.string().required()
})

module.exports={
    signUpValidation,loginValidation
}