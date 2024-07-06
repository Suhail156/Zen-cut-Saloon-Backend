import express from 'express'
import { addShop, shopById, viewShop } from '../Controller/shopController.js'
import uploadImage from '../Middlewares/upload.js'


 const router=express.Router()

 router.post('/shops',uploadImage,addShop)
 router.get('/viewshops',viewShop)
 router.get("/shopbyid/:id",shopById)
 export default router