import express from 'express'
import { adminFetchUser, adminLogin } from '../Controller/AdminController.js'
const router=express.Router()
router.post('/adminlogin',adminLogin)
router.get('/adminuserview',adminFetchUser)

export default router