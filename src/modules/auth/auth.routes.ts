import { Router } from "express";
import { AuthController } from "./auth.controller";

const router = Router();

router.post("/login", AuthController.loginWithEmailAndPassword);
router.post("/login", AuthController.authWithGoogle);




export const authRouter = router; 