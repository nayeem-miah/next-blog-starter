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
    page = 1,
    limit = 10,
    search,
    isFeatured,
    tags,
    sortOrder
}: {
    page?: number;
    limit?: number;
    search?: string;
    isFeatured?: boolean;
    tags?: string[];
    sortOrder?: string;
}) => {

    // console.log({ page, limit });
    // console.log({ sortOrder });

    const skip = (page - 1) * limit;

    const where: any = {
        AND: [
            search && {
                OR: [
                    { title: { contains: search, mode: "insensitive" } },
                    { content: { contains: search, mode: "insensitive" } }
                ],
            },
            typeof isFeatured === "boolean" && { isFeatured },
            tags && tags.length > 0 && { tags: { hasEvery: tags } }
        ].filter(Boolean)
    }



    const result = await prisma.post.findMany({
        skip: skip,
        take: limit,
        where,
        orderBy: { createdAt: "desc" },
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

    const total = await prisma.post.count({ where });

    return {
        data: result,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
        }
    };
}

const getSinglePost = async (id: number) => {

    // * using transaction 
    return await prisma.$transaction(async (tx) => {
        // ? increment views 
        await tx.post.update({
            where: { id },
            data: {
                views: {
                    increment: 1
                }
            }
        })

        return await tx.post.findUnique({
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
    })
    // return result;
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