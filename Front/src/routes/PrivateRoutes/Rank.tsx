import { AiOutlineStar, AiFillStar } from "react-icons/ai"

type Props = {
    rating: number
}

export const Rank = ({rating}: Props) => {
  return (
    <div>
        {Array.from(Array(5)).map((_, i) => {
            const starIndex = i + 1;
            return (
                <span key={i}>
                    {starIndex <= rating ? 
                    <AiFillStar id={`star_${starIndex}`}/> :
                    <AiOutlineStar id={`star_${starIndex}`}/>}
                </span>
            )
        })}
    </div>
  )
}