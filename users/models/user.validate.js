const Joi =require('joi')


const signUpValidation = Joi.object({
    name:Joi.string().min(2).required(),
    email:Joi.string().email(),
    password:Joi.string().pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"))

})

const loginValidation = Joi.object({
    email:Joi.string().email(),
    password:Joi.string().pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"))
})

module.exports={
    signUpValidation,loginValidation
}