import express from 'express'
import { allBookings, allshops, editShop, ownerById, ownerLogin, ownerSignup } from '../Controller/shopOwnerController.js'
import { ownertoken } from '../Middlewares/OwnerMiddleware.js'
import uploadImage from '../Middlewares/upload.js'

const router=express.Router()

 router.post('/ownersignup',ownerSignup)
 router.post('/ownerlogin',ownerLogin)
 router.get('/ownerviewbyid/:id',ownerById)
 router.get('/ownerviewbookings/:id',allBookings)
  router.get('/ownerviewshop/:id',allshops)
  router.patch('/ownereditshop/:id',uploadImage,editShop)




  router.get('/protected',ownertoken , (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
  });
 export default router