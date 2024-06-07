import { Request, Response } from "express";
import { comparehash, generateHash } from "../Services/hashing.service";
import { queryCreateUser, queryFindUser } from "../db/querys";
import jwt from "jsonwebtoken"


export const createUser = async (req: Request, res: Response) => {
    const {email, password} = req.body

    if(!email || !password) throw new Error("Todos los campos son obligatorios")
    try{    
        const hash = await generateHash(password.trim(), 12);
        const response = await queryCreateUser(email, hash);

        if(response.code === 11000) {
            res.status(400).json({
                data: null,
                message: "Ya existe un usuario con ese Email, intente con otro"
            })
            return
        }

        const accessToken = jwt.sign({email}, process.env.SECRET_KEY, {
            expiresIn: "1h"
        })
        const refreshToken = jwt.sign({email}, process.env.SECRET_KEY, {
            expiresIn: "2h"
        })

        res.status(201)
        .cookie(
            "refresh_token", refreshToken, {
                expires: new Date(Date.now() + 1000 *  60 * 60 * 2 ),
                httpOnly: true,
                sameSite: "none",
                secure: true
            }
        )
        .json({
            data: accessToken,
            message: `usuario ${email} creado con exito`});
    } catch(err) {
        console.error(err)
        res.status(400).json({
            data: null,
            message: `ERROR ${err.message}`
        })
    }

}

export const verifyUser = async (req: Request, res: Response) => {
    const { email, password } = req.body

    if(!email || !password) {
        res.status(401).json({
            data: null,
            message: "Todos los campos son obligatorios"})
            return
    }

    try {
        
        const user = await queryFindUser(email)

        if(user.length === 0) {
            res.status(401).json({message: "email o contraseña incorrectos"});
            return
        }
        const {hash, readingSessions} = user
        const response = await comparehash(password, hash)
        if(!response) {
            res.status(401).json({message: "usuario o contraseña incorrectos"});
            return
        }

        const accessToken = jwt.sign({email, readingSessions}, process.env.SECRET_KEY, {
            expiresIn: "2h"
        })

        const refreshToken = jwt.sign({email, readingSessions}, process.env.SECRET_KEY, {
            expiresIn: "5h"
        })

        res.cookie("refresh_token", refreshToken, {
            expires: new Date(Date.now() + 1000 * 60 * 60 * 2),
            httpOnly: true,
            sameSite: "none",
            secure: true
        })
        res.json({
            data: {accessToken},
            message: "Acceso consedido"
        })

    } catch (err) {
        console.error(err)
        res.status(500).json({
            errors: {
                data: null,
                message: `ERROR: ${err}`
            }
        })
    }
}

export const logout = (req: Request, res: Response) => {
    try {
        res.clearCookie("refresh_token", {
            httpOnly: true,
            sameSite: "none",
            secure: true
        });
        res.json({
            data: null,
            message: "Logout OK"
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            errors: {
                data: null,
                message: `ERROR: ${err}`
            }
        })
    }
}

export const refreshToken = async (req: Request, res: Response) => {
    const { 
        cookies: {refresh_token: refreshToken}
    } = req;

    try {
        if(!refreshToken) throw new Error("No refresh token found");

        const {email} = jwt.verify(refreshToken, process.env.SECRET_KEY)

        const user = await queryFindUser(email)
        const readingSessions = user.readingSessions
        
        const accessToken = jwt.sign({email, readingSessions}, process.env.SECRET_KEY, {
            expiresIn: "2h"
        })

        const newrefreshToken = jwt.sign({email, readingSessions}, process.env.SECRET_KEY, {
            expiresIn: "5h"
        })

        res.cookie("refresh_token", newrefreshToken, {
            expires: new Date(Date.now() + 1000 * 60 * 60 * 2),
            httpOnly: true,
            sameSite: "none",
            secure: true
        })
        res.json({
            data: {
                accessToken
            },
            message: "loggin OK"
        })

    } catch (err) {
        console.error(err)
        res.status(401).json({
            data: null,
            message: `ERROR: ${err}`
        })
    }
}