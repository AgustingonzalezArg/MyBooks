import { useSesion } from "../../store/useSession";
import { ContainerBook } from "./ContainerBook";
import { NotBooks } from "./NotBooks";

export const PendingBooks = () => {
    const {books} = useSesion()
    const pendingbooks = books.filter(book => book.state === 'Pendiente');

    if(pendingbooks.length === 0) return (
      <NotBooks state="Pendientes"/>
    )

  return (
    <div>
      <h1>Libros Pendientes</h1>
      <div className="container__read-books">
        {pendingbooks.map(book => {
          return <ContainerBook key={book._id} {...book}/>
        })}
      </div>
    </div>
  )
}
