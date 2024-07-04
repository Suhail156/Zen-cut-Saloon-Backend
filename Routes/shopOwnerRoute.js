import express from 'express'
import { ownerLogin, ownerSignup } from '../Controller/shopOwnerController.js'

const router=express.Router()

 router.post('/ownersignup',ownerSignup)
 router.post('/ownerlogin',ownerLogin)
 export default router