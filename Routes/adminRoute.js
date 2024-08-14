import express from 'express'
import { adminApproveReject, adminBlock, adminEditOwner, adminFetchById, adminFetchShopOwners, adminFetchUser, adminLogin, adminViewBooking, adminViewShop, allowners, allUsers, totalBooking, totalBookings } from '../Controller/AdminController.js'
import { adminToken } from '../Middlewares/adminMiddleware.js'
const router=express.Router()
router.post('/adminlogin',adminLogin)

//users
router.get('/adminuserview',adminFetchUser) 
router.patch('/adminblock/:id',adminBlock)

//shopOwners
router.get('/adminownerview',adminFetchShopOwners)
router.get('/adminviewbyid/:id',adminFetchById)
router.patch('/admineditowners/:id',adminEditOwner)
router.get('/adminapprovereject',adminApproveReject)   
router.get('/adminviewbooking/:id',adminViewBooking) 
router.get('/adminviewshop/:id',adminViewShop)
router.get('/adminviewdetailes',totalBooking)
router.get('/adminviewallusers',allUsers)
router.get('/adminviewallowners',allowners)
router.get('/adminviewchart',totalBookings)
router.use(adminToken)
export default router       