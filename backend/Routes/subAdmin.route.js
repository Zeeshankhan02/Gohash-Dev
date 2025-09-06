import { Router } from 'express';
import { loginPost, testing } from '../Controllers/subAdmin.controller.js';


const router = Router();

// route chaning 
router.route("/login")
.get(testing)
.post(loginPost)




export default router;
