import { useEffect, useState } from "react"
import { IntBook } from "../../../interfaces/IntBook"
import { useSesion } from "../../../store/useSession"
import { Link, useNavigate } from "react-router-dom"

type Props = {
    books: IntBook[],
    onClickClose: any
}

export const FinishSession = ({books, onClickClose}: Props) => {

    const {modifyBook} = useSesion();
    const navigate = useNavigate();
    const booksInProgress: IntBook[] | null = books.filter(book => book.state === "En curso")
    const [selectVal, setSelectVal] = useState(booksInProgress.length > 0 ? booksInProgress[0]._id : "")
    const bookSelected = booksInProgress.find(book => book._id === selectVal)
    const [readPages, setReadPages] = useState(bookSelected?.readPages || 0);
    
        useEffect(() => {

            if(bookSelected && readPages > bookSelected.pages) {
                setReadPages(bookSelected!.pages)
            }
        }, [readPages])
    
        useEffect(() => {
            setReadPages(bookSelected?.readPages ||0)
        }, [selectVal])

    const handleChanges = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {id, value} = e.target
        switch (id) {
            case "select":
                setSelectVal(value)
                break;
            case "input":
                setReadPages(Number(value));
                break;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const bookModify = {
            idBook: selectVal,
            readPages
        }
        const res = await modifyBook(bookModify)
        if(res !== "NOT AUTH") {
            navigate(`/book/${selectVal}/En%20curso`)
        }
    }
    

  return (
    <div>
        <button onClick={onClickClose}>X</button>
        <h2>Sesion Finalizada</h2>
        <div>
            {booksInProgress.length !== 0 ?
            <form onSubmit={handleSubmit}>
                <select id="select" value={selectVal} onChange={handleChanges}>Libro
                    {booksInProgress.map(book => {
                       return <option value={book._id} key={book._id}>{book.title}</option>
                    })}    
                </select>
                <label>¿Hasta que pagina avanzo?
                    <input id="input" type="number" value={readPages} onChange={handleChanges}/>
                </label>
                <input type="submit" value="Finalizar" />
            </form>
            :
            <>
                <p>No tienes libros "En curso" para avanzar. Agrega uno!!</p>
                <Link to={"/add-book"}> Agregar libro</Link>
            </>}
        </div>
            
    </div>
  )
}

