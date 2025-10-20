import { prisma } from "../../config/db"

const loginWithEmailAndPassword = async ({ email, password }: { email: string, password: string }) => {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (!user) {
        throw new Error("user not found !!");
    }

    //  match password
    if (password === user.password) {
        return user
    };
    throw new Error("password did not match !!");
}

export const AuthService = {
    loginWithEmailAndPassword
}