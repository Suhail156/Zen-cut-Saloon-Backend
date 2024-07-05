import express from 'express'
import { addShop } from '../Controller/shopController.js'
import imageUpload from '../Middlewares/ImageUpload.js/ImageUpload.js'

 const router=express.Router()

 router.post('/shops',imageUpload,addShop)

 export default router