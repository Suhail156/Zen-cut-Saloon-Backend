import express from 'express'
import { adminApproveReject, adminBlock, adminEditOwners, adminFetchById, adminFetchShopOwners, adminFetchUser, adminLogin } from '../Controller/AdminController.js'
const router=express.Router()

router.post('/adminlogin',adminLogin)

//users
router.get('/adminuserview',adminFetchUser)
router.patch('/adminblock/:id',adminBlock)

//shopOwners
router.get('/adminownerview',adminFetchShopOwners)
router.patch('/adminviewbyid/:id',adminFetchById)
router.patch('/admineditowners/:id',adminEditOwners)
router.get('/adminapprovereject',adminApproveReject)    
export default router       