import { Link } from "react-router-dom"
import { useSesion } from "../../store/useSession"

export const Nav = () => {

  const {logout} = useSesion();

  const handleClick = () => {
    logout()
  }

  return (
    <div>
        <ul>
            <Link to={"/"}>📚</Link>
            <Link to={"/read-books"}> Libros leidos</Link>
            <Link to={"/books-in-progress"}>Libros en curso</Link>
            <Link to={"/pending-books"}>Libros Pendientes</Link>
            <Link to={"/add-book"}>Nuevo Libro</Link>
            <Link to={"/reading-sessions"}>Sesiones de lectura</Link>
        </ul>
        <button onClick={handleClick}>Cerrar Sesion</button>
    </div>
  )
}