import express from 'express'
import { addShop } from '../Controller/shopController.js'

 const router=express.Router()

 router.post('/shops',addShop)

 export default router