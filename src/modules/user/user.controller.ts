import { Request, Response } from "express";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
    try {
        const result = await userService.createUser(req.body);
        res.status(201).json({
            success: true,
            message: "data insert success",
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
const getAllFromDB = async (req: Request, res: Response) => {
    try {
        const result = await userService.getAllFromDB();
        res.status(201).json({
            success: true,
            message: "get all user success",
            data: result
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "something went Wrong!!",
            error: error
        })
    }
};

const getUserById = async (req: Request, res: Response) => {
    try {
        const result = await userService.getUserById(Number(req.params.id));
        res.status(201).json({
            success: true,
            message: "get user by id  success",
            data: result
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "something went Wrong!!",
            error: error
        })
    }
};


export const userController = {
    createUser,
    getAllFromDB,
    getUserById
}