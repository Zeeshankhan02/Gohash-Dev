import { Router } from 'express';
import { loginPost } from '../Controllers/subAdmin.controller.js';


const router = Router();

// route chaning 
router.route("/login")
.post(loginPost)




export default router;
