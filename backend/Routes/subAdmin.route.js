import { Router } from 'express';
import { deleteNews, loginPost } from '../Controllers/subAdmin.controller.js';


const router = Router();

// route chaning 
router.route("/login")
.post(loginPost)


router.delete("/deleteNews/:articleId",deleteNews)

export default router;
