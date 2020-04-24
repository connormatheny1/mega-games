import React, { useState, useEffect } from 'react'

const Deck = (props) => {
    const [deck, setDeck] = useState([])
    const colors = ['red', 'green', 'yellow', 'blue']
    const specialCards = [8, 'draw2', 'draw4', 'reverse', 'skip']
    
    const { numUsers } = props

    const createDeck = () => {
        
    }


    return(
        <div className="deck-container">

        </div>
    )
}

export default Deck