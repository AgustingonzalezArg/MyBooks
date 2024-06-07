import express  from "express";
import  { addbook, deleteBook, findBooks, updateBook, updateReadingSessions}  from "../Controller/controllerbooks";

export const booksRoutes = express.Router()

booksRoutes.post("/", findBooks)
booksRoutes.post("/addbook", addbook)
booksRoutes.put("/book", updateBook)
booksRoutes.delete("/book", deleteBook)
booksRoutes.post("/readingSessions", updateReadingSessions)