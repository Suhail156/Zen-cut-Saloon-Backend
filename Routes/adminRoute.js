import express from 'express'
import { adminApproveReject, adminBlock, adminEditOwner, adminFetchById, adminFetchShopOwners, adminFetchUser, adminLogin, adminViewBooking, adminViewShop } from '../Controller/AdminController.js'
const router=express.Router()

router.post('/adminlogin',adminLogin)

//users
router.get('/adminuserview',adminFetchUser)
router.patch('/adminblock/:id',adminBlock)

//shopOwners
router.get('/adminownerview',adminFetchShopOwners)
router.patch('/adminviewbyid/:id',adminFetchById)
router.patch('/admineditowners/:id',adminEditOwner)
router.get('/adminapprovereject',adminApproveReject)   
router.get('/adminviewbooking/:id',adminViewBooking) 
router.get('/adminviewshop/:id',adminViewShop)
export default router       