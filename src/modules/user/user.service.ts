import { Prisma, User } from "@prisma/client";
import { prisma } from "../../config/db";

const createUser = async (payload: Prisma.UserCreateInput): Promise<User> => {
    // console.log({ payload });
    const createUser = await prisma.user.create({
        data: payload
    })
    return createUser;
}

const getAllFromDB = async () => {
    const result = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            picture: true,
            createdAt: true,
            updatedAt: true,
            role: true,
            status: true,
            Posts: true
        },
        orderBy: {
            createdAt: "desc"
        },
        // ! is not assignable to type '"Please either choose `select` or `include
        // include: {
        //     Posts: true
        // }
    });
    return result
}

const getUserById = async (id: number) => {
    const result = await prisma.user.findUnique({
        where: {
            id
        },
        select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            picture: true,
            createdAt: true,
            updatedAt: true,
            role: true,
            status: true,
            Posts: true
        },
    })
    return result
};

export const userService = {
    createUser,
    getAllFromDB,
    getUserById
}