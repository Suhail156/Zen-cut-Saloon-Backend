import express from 'express'
import { allBookings, allshops, bookingApprove, BookingPending, bookingReject, editOwner, editShop, ownerById, ownerLogin, ownerSignup } from '../Controller/shopOwnerController.js'
import { ownertoken } from '../Middlewares/OwnerMiddleware.js'
import uploadImage from '../Middlewares/upload.js'

const router=express.Router()

router.post('/ownersignup',ownerSignup)
router.post('/ownerlogin',ownerLogin)
router.get('/ownerviewbyid/:id',ownerById)
router.get('/ownerviewbookings/:id',allBookings)
router.get('/ownerviewshop/:id',allshops)
router.patch('/ownereditshop/:id',uploadImage,editShop)
router.patch('/owneredit/:id',editOwner)
router.get('/ownerviewpending/:id',BookingPending)
router.patch('/owneraccept/:id',bookingApprove)
router.patch('/ownerreject/:id',bookingReject)
router.use(ownertoken)



  router.get('/protected',ownertoken , (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
  });
 export default router