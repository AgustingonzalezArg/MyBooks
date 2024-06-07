import { useSesion } from "../../store/useSession";
import { ContainerBook } from "./ContainerBook";
import { NotBooks } from "./NotBooks";

export const BooksInProgress = () => {
  const {books} = useSesion()
    const readbooks = books.filter(book => book.state === 'En curso');


    if(readbooks.length === 0) return (
      <NotBooks state="En Curso"/>
    )

  return (
    <div>
      <h1>Libros En Curso</h1>
      <div className="container__read-books">
        {readbooks.map(book => {
          return <ContainerBook key={book._id} {...book}/>
        })}
      </div>
    </div>
  )
}
