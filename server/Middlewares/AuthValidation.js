const joi  = require('joi');

const signupValidation = (req,res,next)=>{
    const schema = joi.object({
        name: joi.string().min(1).max(30).required(),
        email: joi.string().email().required(),
        phone: joi.string().length(10).pattern(/^[0-9]+$/).required(),
        password: joi.string().min(4).max(10).required(),
    });
    const { error } = schema.validate(req.body);
    if(error){
        return res.status(400)
        .json( { message: "Bad request", error} )
    }
    next();
}

 const loginValidation = (req,res,next)=>{
    const schema = joi.object({
            email: joi.string().email().required(),
           password: joi.string().min(4).max(10).required()
    });
    const {error} = schema.validate(req.body);
    if(error){
    return res.status(400)
    .json( {message: "Bad request", error})
    }
    next();
 }
module.exports={
    signupValidation,
    loginValidation
}