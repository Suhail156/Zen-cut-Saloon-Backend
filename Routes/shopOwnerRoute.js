import express from 'express'
import { ownerSignup } from '../Controller/shopOwnerController.js'

const router=express.Router()

 router.post('/ownersignup',ownerSignup)
 export default router