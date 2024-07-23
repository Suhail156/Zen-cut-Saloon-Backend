import express from 'express'
import { shopByCategory, UserShopId, userShopView } from '../Controller/userShopController.js'
import { verifytoken } from '../Middlewares/userMiddleware.js'

 const router=express.Router()
 router.get('/usershopview',userShopView)
 router.get('/usershopid/:id',UserShopId)
 router.get('/usershopsearch',shopByCategory)
 router.use(verifytoken)        
 
 export default router