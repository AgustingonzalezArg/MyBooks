import { Link } from "react-router-dom"

type Props = {
    state: string
}

export const NotBooks = ({state}: Props) => {
  return (

    <div>
      <h1>Libros {state}</h1>
      <div>
        <p>
          No tienes libros {state} actualmente. Agrega uno!
        </p>
        <Link to={"/add-book"}>Agregar Libro</Link>
      </div>
    </div>
    
  )
}