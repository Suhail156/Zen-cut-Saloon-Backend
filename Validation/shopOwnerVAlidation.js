import Joi from "joi"

const ownerJoi = Joi.object({
    username:Joi.string(),
    shopname:Joi.string(),
    phone:Joi.number(),
    email:Joi.string(),
    password:Joi.string(),
    category:Joi.string(),
    district:Joi.string(),
    state:Joi.string()
   
})
export default ownerJoi