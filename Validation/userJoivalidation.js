import Joi from "joi"

const userjoi = Joi.object({
    username:Joi.string(),
    email:Joi.string(),
    password:Joi.string(),
    phone:Joi.number()
})
export default userjoi