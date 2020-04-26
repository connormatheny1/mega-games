import React, { useState, useEffect } from 'react'

const Deck = (props) => {
    const [deck, setDeck] = useState()
    const [needCards, setNeedCards] = useState(false)
    const [gameStarted, setGameStarted] = useState(props.gameStarted)
    
    
    const { numUsers } = props

    function createDeck () {
        const colors = ['red', 'green', 'yellow', 'blue']
        const specialCards = ['draw2', 'draw4', 'reverse', 'skip']
        let tmpcards = []
        let cards = []

        for(let i = 0; i < colors.length; i++){
            for(let j = 1; j <= 10; j++){
                let currCard
                if(i != 8){
                    currCard = { val: j, color: colors[i], special: false }
                }
                else{
                    currCard = { val: j, color: 'black', special: true }
                }
                tmpcards.push(currCard)
            }
        }
        for(let i = 0; i < colors.length; i++){
            for(let k = 0; k < specialCards.length; k++){
                let currCard
                if(specialCards[k] === 'draw4'){
                    currCard = { val: 'draw4', color: 'black', special: true }
                }
                else{
                    currCard = { val: specialCards[k], color: colors[i], special: true }
                }
                tmpcards.push(currCard)
            }
        }

        while(tmpcards.length > 0){
            let newCard
            let rand = Math.floor(Math.random() * (Math.floor(tmpcards.length) - Math.ceil(0)) + Math.ceil(0));
            newCard = { val: tmpcards[rand].val, color: tmpcards[rand].color, special: tmpcards[rand].special }
            cards.push(newCard)
            tmpcards.splice(rand, 1)
        }
        return cards
    }
    

    return(
        <div className="deck-container">

        </div>
    )
}

export default Deck