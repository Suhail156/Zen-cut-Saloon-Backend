import express from 'express'
import { login, signup, verifyOTP } from '../Controller/userController.js'


const router=express.Router()
router.post('/signup',signup)
router.post("/verifyotp",verifyOTP)
router.post('/login',(login))

export default router