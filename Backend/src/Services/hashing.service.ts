import bcrypt from "bcrypt"

export const generateHash = async (password: string, saltRounds: number) => {

    return bcrypt.hash(password ,  saltRounds)

}

export const comparehash = async (password: string, hash: string) => {
    return bcrypt.compare(password, hash)
}