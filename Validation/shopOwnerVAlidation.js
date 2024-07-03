import Joi from "joi"

const userjoi = Joi.object({
    username:Joi.string(),
    shopname:Joi.string(),
    phone:Joi.number(),
    email:Joi.string(),
    password:Joi.string(),
    category:Joi.string(),
   
})
export default userjoi