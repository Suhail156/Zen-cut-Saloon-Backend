import express from 'express'
import { signup } from '../Controller/userController.js'

const router=express.Router()
router.post('/signup',signup)

export default router