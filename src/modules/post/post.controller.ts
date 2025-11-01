import { Request, Response } from "express";
import { postService } from "./post.service";
import { stringify } from "querystring";

const createPost = async (req: Request, res: Response) => {
    try {
        const result = await postService.createPost(req.body);
        res.status(201).json({
            success: true,
            message: "post create success",
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

const getAllPosts = async (req: Request, res: Response) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = (req.query.search as string) || "";
        const isFeatured = req.query.isFeatured ? req.query.isFeatured === "true" : undefined;
        const tags = req.query.tags ? (req.query.tags as string).split(",") : [];



        const result = await postService.getAllPosts({ page, limit, search, isFeatured, tags })
        res.status(200).json({
            success: true,
            message: "all post success",
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

const getSinglePost = async (req: Request, res: Response) => {
    try {
        const result = await postService.getSinglePost(Number(req.params.id))
        res.status(200).json({
            success: true,
            message: "get single post success",
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

const getBlogStats = async (req: Request, res: Response) => {

    try {
        const result = await postService.getBlogStats();
        res.status(201).json({
            success: true,
            message: "get blog stats success",
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


export const postController = {
    createPost,
    getAllPosts,
    getSinglePost,
    deletePost,
    updatePost,
    getBlogStats
}