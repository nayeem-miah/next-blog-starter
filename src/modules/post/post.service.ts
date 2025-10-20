import { Post, Prisma } from "@prisma/client";
import { prisma } from "../../config/db";

// * create post
const createPost = async (payload: Prisma.PostCreateInput): Promise<Post> => {
    // console.log(payload);
    const result = await prisma.post.create({
        data: payload,

        // ! include user password
        // include: {
        //     author: true
        // }

        // * use select in author data ---> relation data
        include: {
            author: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                }
            }
        }
    });
    return result
};

/**
 * ? get all posts 
 * ? get single posts
 * ? update post
 * ? delete post
 */

// ! implement pagination
const getAllPosts = async ({
    page,
    limit,
    search
}: {
    page: number,
    limit: number,
    search: string
}) => {

    // console.log({ page, limit });

    const skip = (page - 1) * limit;

    const result = await prisma.post.findMany({
        skip: skip,
        take: limit,
        where: {
            OR: [
                {
                    title: {
                        contains: search,
                        mode: "insensitive"
                    },
                    content: {
                        contains: search,
                        mode: "insensitive"
                    },
                }
            ]
        },
        include: {
            author: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                }
            }
        }

    });
    return result;
}

const getSinglePost = async (id: number) => {
    const result = await prisma.post.findUnique({
        where: {
            id
        },
        include: {
            author: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                }
            }
        }
    });
    return result;
}

const deletePost = async (id: number) => {
    const result = await prisma.post.delete({
        where: {
            id
        }
    });
    return result;
}

const updatePost = async (id: number, payload: Partial<Post>) => {
    const result = await prisma.post.update({
        where: {
            id
        },
        data: payload
    });
    return result;
}

export const postService = {
    createPost,
    getAllPosts,
    getSinglePost,
    deletePost,
    updatePost
}