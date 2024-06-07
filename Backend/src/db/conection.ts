import mongoose from 'mongoose'

const url: string = "mongodb://localhost:27017/BooksProyect"
export const conection = async () => {
    await mongoose.connect(url)
    console.log("base de datos conectada")
}