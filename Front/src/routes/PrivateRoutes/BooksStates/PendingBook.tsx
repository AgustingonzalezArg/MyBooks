import { useNavigate } from "react-router-dom"
import { IntBook } from "../../../interfaces/IntBook"
import { useSesion } from "../../../store/useSession"

type Props = {
    book: IntBook,
    idBook: string
}

export const PendingBook = ({book, idBook}: Props) => {

  const navigate = useNavigate()
  const {modifyBook} = useSesion()

  const handleClick = async () => {
    const bookModify = {
      idBook,
      state: "En curso"
    }
    const res = await modifyBook(bookModify)
    if(res !== "NOT AUTH" )navigate(`/book/${idBook}/En%20curso`, {
    })
  }

  return (
    <div>
        <h2>{book.title}</h2>
        <p>Estado: {book.state}</p>
        <p>Autor: {book.author}</p>
        <p>Paginas: {book.pages}</p>
        <button onClick={handleClick}>Empezar libro</button>
    </div>
  )
}