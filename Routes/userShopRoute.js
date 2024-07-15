import express from 'express'
import { UserShopId, userShopView } from '../Controller/userShopController.js'
import { verifytoken } from '../Middlewares/userMiddleware.js'

 const router=express.Router()
 router.get('/usershopview',userShopView)
 router.get('/usershopid/:id',UserShopId)
 router.use(verifytoken)        
 
 export default router