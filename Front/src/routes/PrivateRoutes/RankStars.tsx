import React, { useState } from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'

type Props = {
    rating: number,
    onRating: (rating: number) => void
  }

export const RankStars = ({rating, onRating}: Props) => {

    const limit = 5
    const [hoverRating, setHoverRating] = useState(1)

    const handleMouseOver = (starIndex: number) => {
        setHoverRating(starIndex)
    }

    const handleMouseLeave = () => {
       setHoverRating(rating)
    }

    const handleClick = (starIndex: number) => {
        if(starIndex === rating) return
        onRating(starIndex) 
    }

  return (
    <div onMouseLeave={handleMouseLeave}>
        {Array.from(Array(limit)).map((_ , i) => {
            const starIndex = i + 1
            return (
                <span key={i}
                onMouseOver={() => handleMouseOver(starIndex)}
                onClick={() => handleClick(starIndex)}>
                    {starIndex <= hoverRating ?
                    <AiFillStar id={`star_${starIndex}`}/> :
                    <AiOutlineStar id={`star_${starIndex}`}/>}
                </span>
            )
        })}
    </div>
  )
}