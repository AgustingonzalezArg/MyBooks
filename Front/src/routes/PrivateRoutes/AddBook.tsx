import React, { useEffect, useState } from 'react'
import { IntBook } from '../../interfaces/IntBook'
import { useSesion } from '../../store/useSession'
import { RankStars } from './RankStars'

type Props = {}

export const AddBook = (props: Props) => {

    const {addBook} = useSesion()
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [pages, setPages] = useState(0)
    const [state, setState] = useState("Pendiente")
    const [review, setReview] = useState("")
    const [readPages, setReadPages] = useState(0)
    const [bookCreated, setbookCreated] = useState(false)
    const [rating, setRating] = useState(1)

    const handleChanges = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {id, value} = e.target

        switch (id) {
            case "title":
                setTitle(value)
                break;
            case "author":
                setAuthor(value)    
                break;
            case "pages":
                const valPages = Number(value)

                if(valPages < 0)  setPages(0)                       
                setPages(valPages)
                break;
            case "select":
                setState(value)
                break;
            case "review":
                setReview(value)
                break;
            case "read-pages":
                const valReadPages = Number(value)
                if(valReadPages < 0)  setReadPages(0)
                setReadPages(valReadPages)
                break;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newBook: IntBook = { title, author, pages, state}
        if (readPages !== 0) newBook.readPages = readPages
        if (review !== "") newBook.review = review
        const res = await addBook(newBook);
        if (res !== "NOT AUTH") {
            setbookCreated(true);
        }

    }

    const handleRating = (newRating) => {
        setRating(newRating)
    }
    
    useEffect(() => {
        if(readPages > pages) setReadPages(pages)

    }, [readPages, pages]);

    useEffect(() => {
        if(bookCreated) {
            const timer = setTimeout(() => {
                setbookCreated(false)
            }, 4000)

            return () => clearTimeout(timer)
        }
    }, [bookCreated])
    

  return (
    <div>
        <h2>Agregar Libro</h2>
        <form onSubmit={handleSubmit}>
            <label>Titulo del libro
                <input type="text" id="title" value={title} onChange={handleChanges} required/>
            </label>
            <label> Autor
                <input type="text" id="author" value={author} onChange={handleChanges} required/>
            </label>
            <label> Cantidad de Paginas
                <input type="number" id="pages" value={pages} onChange={handleChanges} required/>
            </label>
            <select value={state} id="select" onChange={handleChanges}> Estado
                <option value="Pendiente">Pendiente</option>
                <option value="En curso">En curso</option>
                <option value="Finalizado">Finalizado</option>
            </select>
            {state === "Finalizado" && (
                <div>
                    <p>¿Cual es la calificación del libro?</p>
                    <RankStars onRating={handleRating} rating={rating}/>
                    <label > Reseña
                        <input type="text" id="review" value={review} onChange={handleChanges}/>
                    </label>
                </div>
            )}
            {state === "En curso" && (
                <label >Paginas leidas
                    <input type="number" id="read-pages" value={readPages} onChange={handleChanges} required/>
                </label>
            )}
            <input type="submit" value="Agregar" />
        </form>
        {bookCreated && (<div>
            <button onClick={() => setbookCreated(false)}>X</button>
            Libro creado con exito 
        </div>)}
    </div>
  )
}