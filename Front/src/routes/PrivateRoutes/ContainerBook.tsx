import { Link } from 'react-router-dom'
import { IntBook } from '../../interfaces/IntBook'

export const ContainerBook: React.FC<IntBook> = (book) => {
  return (
    <Link to={`/book/${book._id}/${book.state}`}>
        <div className="container__Read-Book">
            <h2>{book.title}</h2>
            <p>Estado: {book.state}</p>
            <p>Paginas: {book.pages}</p>
        </div>
    </Link>
  )
}