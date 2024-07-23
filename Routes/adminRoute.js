import express from 'express'
import { adminBlock, adminFetchShopOwners, adminFetchUser, adminLogin } from '../Controller/AdminController.js'
const router=express.Router()

router.post('/adminlogin',adminLogin)

//users
router.get('/adminuserview',adminFetchUser)
router.patch('/adminblock/:id',adminBlock)

//shopOwners
router.get('/adminownerview',adminFetchShopOwners)

export default router   