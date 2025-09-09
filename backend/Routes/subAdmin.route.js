import { Router } from 'express';
import { deleteNews, loginPost, viewNewsCreated } from '../Controllers/subAdmin.controller.js';
import { verifyToken } from '../Middlewares/createNewsAuth.js';


const router = Router();

router.post("/login",loginPost)
router.get("/viewNewsArticles",verifyToken,viewNewsCreated)
router.delete("/deleteNews/:articleId",verifyToken,deleteNews)

export default router;
