import express from 'express'
import { bookingUser, checkAvailability } from '../Controller/bookingController.js'

const router=express.Router()

router.post('/booking/:userid/shop/:shopid/:ownerid',bookingUser)
router.get('/checkavailability',checkAvailability)

export default router