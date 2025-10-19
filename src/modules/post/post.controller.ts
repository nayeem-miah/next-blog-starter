import { Request, Response } from "express";
import { postService } from "./post.service";

const createPost = async (req: Request, res: Response) => {
    try {
        const result = await postService.createPost(req.body)
        res.status(201).json({
            success: true,
            message: "post create success",
            error: result
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

const getAllPosts = async (req: Request, res: Response) => {
    try {
        const result = await postService.getAllPosts()
        res.status(200).json({
            success: true,
            message: "all post success",
            error: result
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

const getSinglePost = async (req: Request, res: Response) => {
    try {
        const result = await postService.getSinglePost(Number(req.params.id))
        res.status(200).json({
            success: true,
            message: "get single post success",
            error: result
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

const deletePost = async (req: Request, res: Response) => {
    try {
        const result = await postService.deletePost(Number(req.params.id))
        res.status(200).json({
            success: true,
            message: "post delete success",
            error: result
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


const updatePost = async (req: Request, res: Response) => {
    try {
        const result = await postService.updatePost(Number(req.params.id), req.body)
        res.status(200).json({
            success: true,
            message: "post update success",
            error: result
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


export const postController = {
    createPost,
    getAllPosts,
    getSinglePost,
    deletePost,
    updatePost
}