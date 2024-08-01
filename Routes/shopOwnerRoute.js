import express from 'express'
import { allBookings, ownerLogin, ownerSignup } from '../Controller/shopOwnerController.js'
import { ownertoken } from '../Middlewares/OwnerMiddleware.js'

const router=express.Router()

 router.post('/ownersignup',ownerSignup)
 router.post('/ownerlogin',ownerLogin)
 router.get('/protected',ownertoken , (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
  });
  router.get('/ownerviewbookings/:id',allBookings)
 export default router