import express from 'express'
import { adminBlock, adminFetchUser, adminLogin } from '../Controller/AdminController.js'
const router=express.Router()
router.post('/adminlogin',adminLogin)
router.get('/adminuserview',adminFetchUser)
router.patch('/adminblock/:id',adminBlock)

export default router   