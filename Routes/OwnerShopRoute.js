import express from 'express'
import { addShop, shopById, viewShop } from '../Controller/OwnrShopController.js'
import uploadImage from '../Middlewares/upload.js'
import { ownertoken} from '../Middlewares/OwnerMiddleware.js'


 const router=express.Router()
 router.post('/shops',uploadImage,addShop)
 router.get('/viewshops',viewShop)
 router.get("/shopbyid/:id",shopById)
 
 router.use(ownertoken) 
 export default router  