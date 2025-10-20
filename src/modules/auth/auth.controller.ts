import { Request, Response } from "express";
import { AuthService } from "./auth.service";


const loginWithEmailAndPassword = async (req: Request, res: Response) => {
    try {
        const result = await AuthService.loginWithEmailAndPassword(req.body);
        res.status(201).json({
            success: true,
            message: "user login success",
            data: result
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "something went Wrong!!",
            error: error
        })
    }
};

export const AuthController = {
    loginWithEmailAndPassword
}