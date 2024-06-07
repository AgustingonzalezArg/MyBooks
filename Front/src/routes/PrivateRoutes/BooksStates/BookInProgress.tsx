import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { IntBook } from "../../../interfaces/IntBook"
import { useSesion } from "../../../store/useSession"

type Props = {
    book: IntBook
    idBook: string
}

export const BookInProgress = ({book, idBook}: Props ) => {0

    const {modifyBook} = useSesion()

    const [inputValue, setInputValue] = useState("")

    useEffect(() => {
        if(Number(inputValue) > book.pages) setInputValue(book.pages.toString())
    }, [inputValue, book.readPages])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>)=> {
        e.preventDefault()
        let numberValue = Number(inputValue)
        const bookModify = {
            idBook,
            readPages: numberValue
        }
        if (!isNaN(numberValue)) {
            modifyBook(bookModify)
        }
        
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (Number(e.target.value) < 0) return setInputValue('0')
        setInputValue(e.target.value)
    }



  return (
    <div>
    <h2>{book.title}</h2>
    <p>Progreso</p>
    <div>
    <p>{Math.round((book.readPages || 0) * 100 /book.pages)}%</p>
    <div className="container-progress">
        <div className="progress"/>
    </div>
    <p>Estado: {book.state}</p>
    </div>
    <p>Paginas Leidas: {book.readPages || 0} </p>
    <form onSubmit={handleSubmit}>
        <input type="number" value={inputValue} onChange={handleChange}/>
        <input type="submit" value="Actualizar"  />
    </form>
    <p>Autor: {book.author}</p>
    <p>Paginas: {book.pages}</p>
    <Link to={`/book/${book._id}/${book.state}/finish`}> Finalizar Libro</Link>

</div>
  )
}