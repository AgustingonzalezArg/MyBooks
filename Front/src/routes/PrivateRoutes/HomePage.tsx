import { useSesion } from "../../store/useSession";
import { PendingBooks } from "./PendingBooks";

export const HomePage = () => {
    const { books, numReadingSessions } = useSesion();
    const numReadBooks = books.filter(book => book.state === "Finalizado").length
    const numbooks = books.length
  return (
    <div> 
        <div className="container__read-books">
            <h3>Libros Leidos</h3>
            <p>{numReadBooks}/{numbooks}</p>
        </div>
        <div className="container__reading-sessions">
            <h3>Sesiones de lectura realizadas</h3>
            <p>{numReadingSessions}</p>
        </div>
        <div className="container__pending-books">
            <PendingBooks books={books} />           
        </div>
    </div>
  )
}