import express from 'express'
import { bookingUser, checkAvailability } from '../Controller/bookingController.js'
import { verifytoken } from '../Middlewares/userMiddleware.js'

const router=express.Router()
router.post('/booking/:userid/shop/:shopid/:ownerid',bookingUser)
router.get('/checkavailability',checkAvailability)
router.use(verifytoken)

export default router