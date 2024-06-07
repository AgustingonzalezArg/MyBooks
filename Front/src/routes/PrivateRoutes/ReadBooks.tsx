import { ContainerBook } from "./ContainerBook"
import { useSesion } from "../../store/useSession";
import { NotBooks } from "./NotBooks";


export const ReadBooks = () => {

  const {books} = useSesion()
  const readbooks = books.filter(book => book.state === 'Finalizado');

  if(readbooks.length === 0) return (
    <NotBooks state="Leidos"/>
  )

  return (
    <div>
      <h1>Libros Leidos</h1>
      <div className="container__read-books">
        {readbooks.map(book => {
          return <ContainerBook key={book._id} {...book}/>
        })}
      </div>
    </div>
  )
}