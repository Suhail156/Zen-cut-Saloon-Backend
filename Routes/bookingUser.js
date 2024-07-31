import express from 'express'
import { bookingUser } from '../Controller/bookingController.js'

const router=express.Router()

router.post('/booking/:userid/shop/:shopid',bookingUser)

export default router