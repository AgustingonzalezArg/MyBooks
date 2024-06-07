import { useState } from "react"
import { useSesion } from "../../../store/useSession"
import { useNavigate, useParams } from "react-router-dom"
import { RankStars } from "../RankStars"

type Props = {}

export const FinishBook = (props: Props) => {

  const {id} = useParams()
  const navigate = useNavigate()
  const {modifyBook} = useSesion()
  const [review, setReview] = useState("")
  const [rating, setRating] = useState(1)

  const handleChange = (e) => {
    setReview(e.target.value)
  }

  const handleRating = (newRating) => {
    setRating(newRating)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const bookModify = {
      idBook: id,
      state: "Finalizado",
      rating,
      review
    }
    const res = await modifyBook(bookModify)
    if (res !== "NOT AUTH") {
      navigate(`/book/${id}/Finalizado`)
    }
  }

  return (
    <div onSubmit={handleSubmit}>
      <h2>¿Que le parecio el libro?</h2>
      <p>Puntuación</p>
      <RankStars onRating={handleRating} rating={rating}/>
      <p>¿Le gustaria dejar un reseña o una nota para usted?</p>
      <form >
        <input value={review} onChange={handleChange}/>
        <input type="submit" value={'Finalizar'} />
      </form>
    </div>
  )
}