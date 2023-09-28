import { Router } from "express";
import { getUser, logOutUser, loginUser, registerUser } from "../controllers/authController.js";
import { validateLoginUser, validateRegisterUser } from "../middlewares/validateUserMiddleware.js";
import { authMiddleWare } from "../middlewares/authMiddleware.js";


const router = Router()

router.get("/get-user", authMiddleWare, getUser)
router.post("/register", validateRegisterUser, registerUser)
router.post("/login", validateLoginUser, loginUser)
router.get("/logout", logOutUser)


export default router