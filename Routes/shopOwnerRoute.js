import express from 'express'
import { ownerLogin, ownerSignup } from '../Controller/shopOwnerController.js'
import { ownertoken } from '../Middlewares/OwnerMiddleware.js'

const router=express.Router()

 router.post('/ownersignup',ownerSignup)
 router.post('/ownerlogin',ownerLogin)
 router.get('/protected',ownertoken , (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
  });
 export default router