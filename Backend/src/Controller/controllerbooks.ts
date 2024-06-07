import { Request, Response } from "express"
import { queryCreateBook, queryDeleteBook, queryFindBooks, queryFindUser, queryUpdateBook, queryUpdateReadingSessions  } from "../db/querys"

export const addbook = async(req: Request, res: Response) => {

    const {email, newBook} =req.body

    try {
        const resUser = await queryFindUser(email)
        const idUser = resUser._id
        const response = await queryCreateBook(newBook, idUser)
        res.status(201).json({response: "libro creado", book: response})
    } catch(err) {
        res.status(400).json({error: err})
    }
}

export const findBooks = async(req: Request, res: Response) => {

    const {email} = req.body
    try {
        const responseUser = await queryFindUser(email)
        const idUser = responseUser._id
        const books = await queryFindBooks(idUser)
        res.status(200).json({books})
    } catch (err) {
        console.error(err)
        res.status(404).json({
            data: null,
            message: `ERROR: ${err}`
        })
    }
}

export const deleteBook = async(req: Request, res: Response) => {

    const {id} = req.body
    try {
        const response = await queryDeleteBook(id)
        res.status(200).json({message: `El libro ${response} fue eliminado`})

    } catch(err) {
        if(err === "No existe ningun libro") {
            res.status(404).json(err)
        }
        res.status(400).json({error: err})
    }
}

export const updateBook = async(req: Request, res: Response) => {

    const { bookModify, user } = req.body

    try {
        const updateRes = await queryUpdateBook(bookModify)
        if(updateRes.modifiedCount === 0) throw new Error("No se ha logrado modificar el libro");

        const resUser = await queryFindUser(user);
        const idUser = resUser._id
        const books = await queryFindBooks(idUser);
        res.status(203).json(books)
    } catch (err) {
        console.error(err)
        res.status(404).json({
            data: null,
            message: `ERROR: ${err}`
        })
    }
}

export const updateReadingSessions = async(req: Request, res:Response) => {

    const {user} = req.body

    try {
        const response = await queryUpdateReadingSessions(user);
        if(response.modifiedCount === 0) throw new Error("No se ha logrado actualizar sus sesiones de lectura en la base de datos");

        res.status(201).json({
            message: "Estado actualizado con exito"
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            data: null,
            message: `ERROR: ${err}`
        })
    }
}