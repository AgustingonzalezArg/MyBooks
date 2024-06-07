import { Outlet, useParams } from "react-router-dom"
import { PendingBook } from "./BooksStates/PendingBook";
import { BookInProgress } from "./BooksStates/BookInProgress";
import { FinishedBook } from "./BooksStates/FinishedBook";
import { IntBook } from "../../interfaces/IntBook";
import { useSesion } from "../../store/useSession";

export const Book = () => {

    const {books} = useSesion()
    const {id, state} = useParams();
    const filterbooks = books.filter(b => b._id == id);
    const book: IntBook | null = filterbooks.length > 0 ? filterbooks[0] : null

    if(!book) return <p>No se encontro el libro</p>

    switch (state) {
        case 'En curso':
            return (
                <>
                    <BookInProgress book={book} idBook={id}/>
                    <Outlet />
                </>
            )
        case 'Finalizado':
            return (
                <FinishedBook book={book} />
            )
        case 'Pendiente':
            return (
                <PendingBook book={book} idBook={id} />
            )
    }


}