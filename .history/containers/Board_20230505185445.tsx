'use client'

import Square from '@/components/Square';
import React, { useState, useEffect } from 'react'

type Player="X" | "O" | "BOTH" | null;

function calculateWinner(squares: Player[]) { 
    const lines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];
    for (let i =0;i<lines.length; i++)
    {
        const [a,b,c] = lines[i];
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

const Board = () => {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [currentPlayer, setCurrentPlayer] = useState<"X" | "O"> (
        Math.round(Math.random() * 1) === 1 ? "X" : "O"
    )
    const[winner, setWinner] = useState<Player>(null)
    //reset game
    function reset() {
        setSquares(Array(9).fill(null));
        setWinner(null);
        setCurrentPlayer(Math.round(Math.random() * 1) === 1 ? "X" : "O")
    }
   

    function handleSquareValue(index: number) {
        const newData = squares.map((val, i) => {
            if(i===index)
            {
                return currentPlayer;
            }
            return val
        });
        setSquares(newData);
        setCurrentPlayer(currentPlayer === "X" ? "O" : "X")
    }

    useEffect(() => {
        const w = calculateWinner(squares);
        if(w) {
            setWinner(w)
        }
        const filteredSquares = squares.filter((square) => !square).length
        if(!w && !filteredSquares ) {
            setWinner('BOTH');
        }
    })

  return (
    <div className = 'center'>
        {!winner && (<h2> Hey {currentPlayer}, its your turn!</h2>) }
        {winner && winner !== "BOTH" && (<h2> Conguratulations {winner} </h2>)}
        {winner && winner === "BOTH" && (<h2> Conguratulations you are both winners! </h2>)}
        <div className="grid">
            {Array(9).fill(null).map((_, i) => {
                return (
                    <Square
                        winner={winner}
                        key={i}
                        onClick={() => handleSquareValue(i)}
                        value={squares[i]}
                    />
                )
            })}
        </div>
        <button className="reset" onClick={reset}>
            Reset
        </button>
    </div>
  )
}

export default Board