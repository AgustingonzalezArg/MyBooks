import { IntBook } from "../../../interfaces/IntBook"
import { Rank } from "../Rank"


type Props = {
    book: IntBook
}

export const FinishedBook = ({book}: Props) => {
  return (
    <div>
        <h2>{book.title}</h2>
        <p>Estado: {book.state}</p>
        <p>Puntuación:</p>
        <Rank rating={book.rating!}/>
        <p>Autor: {book.author}</p>
        <p>Paginas: {book.pages}</p>
        <p>Reseña:</p>
        <p>{book.review}</p>
    </div>
  )
}