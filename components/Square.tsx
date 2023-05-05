import React from 'react'

type Player="X" | "O" | "BOTH" | null;

interface SquareSignature {
    value: Player,
    winner: Player,
    onClick: () => void
}

const Square = ({
    value,
    onClick,
    winner
}: SquareSignature) => {
    if(!value)
    {
        return (
            <button className='square' onClick={onClick} disabled={Boolean(winner)} />
        )
    }
  return (
    <button className={`square square_${value.toLocaleLowerCase()}`} disabled>
        {value}
        </button>
  )
}

export default Square