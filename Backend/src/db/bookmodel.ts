import mongoose from 'mongoose';
const {Schema} = mongoose

mongoose.connect("mongodb://localhost:27017/BooksProyect")

const bookShema = new Schema({
    idUser: String,
    title: String,
    state: String,
    rating: Number,
    review: String,
    author: String,
    pages: Number,
    readPages: Number
})

export const Book = mongoose.model("Book", bookShema)