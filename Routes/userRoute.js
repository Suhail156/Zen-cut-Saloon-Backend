import express from 'express'
import { editUser, login, signup, UserViewById, verifyOTP } from '../Controller/userController.js'


const router=express.Router()
router.post('/signup',signup)
router.post("/verifyotp",verifyOTP)
router.post('/login',(login))
router.get('/userview/:id',UserViewById)
router.patch('/useredit/:id',editUser)

export default router   