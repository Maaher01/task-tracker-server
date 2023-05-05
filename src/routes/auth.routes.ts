import { Router } from "express";
import { login, signup, forgotPassword } from "../controllers/authController";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.patch("/forgotpassword", forgotPassword);

export default router;
