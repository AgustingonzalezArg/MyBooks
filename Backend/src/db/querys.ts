import { error } from "console"
import { Book } from "./bookmodel"
import { User } from "./usermodel"

export const queryCreateBook = (newBook: any, idUser: string) => {

    const { title, state, author, pages, readPages, rank, review} = newBook

    const book = Book.create({
        idUser,
        title ,
        state ,
        author,
        pages,
        ...(rank && {rank}),
        ...(review && {review}),
        ...(readPages && {readPages})
    })

    return book
}

export const queryFindBooks = async (idUser: string) => {
    const books = await Book.find({idUser})
    return books
}

export const queryFindBook = async (idBook: string) => {
    const book = await Book.find({_id : idBook})
    return book
}

export const queryDeleteBook = async (id: string) => {
    const resName = await Book.findById({_id: id})
    const resDelete = await Book.deleteOne({_id: id})
    if(resDelete.deletedCount === 0) {
        throw error("No existe ningun libro");
    }
    return resName?.title;
}

export const queryCreateUser = async (email: string, hash: string) => {
    try {
        const userCreated = await User.create({
        email,
        hash,
        readingSessions: 0
        })
        return userCreated
    } catch(err) {
        return err
    }
}

export const queryFindUser = async (email: string) => {
    try {
        const response = await User.find({email})
        const user = response[0]
        return user
    } catch (err) {
        return err
    }
}

export const queryUpdateBook = async ( bookModify ) => {
    
    const {
        idBook,
        state,
        title,
        author,
        pages,
        readPages,
        review,
        rating
    } = bookModify


    const updateBook = await Book.updateOne(
        {_id: idBook}, 
        {
         ...(state &&{state}),
         ...(pages &&{pages}),
         ...(title &&{title}),
         ...(author &&{author}),
         ...(readPages &&{readPages}),
         ...(review &&{review}),
         ...(rating &&{rating})
    })
    return updateBook
}

export const queryUpdateReadingSessions = async (email: string) => {
    try {
        const updateReadingSesions = await User.updateOne({email},
            { $inc: {readingSessions: 1}}
        )
        return updateReadingSesions
    } catch (err) {
        return err
    }
}