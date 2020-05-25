import React, { useState, useEffect } from 'react'
import Card from '../../client-utils/Card'

const Deck = (props) => {
    const [needCards, setNeedCards] = useState(false)
    const [gameStarted, setGameStarted] = useState(props.gameStarted)
    const [newCard, setNewCard] = useState()//props.newCard
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

    // useEffect(() => {
    //     if(props.newCard){
    //         setNewCard(props.newCard)
    //     }
    // }, [newCard])

    const playCard = (e) => {
        props.playCard(e)
    }

    return(
        <>
            <div className="deck-container">
                {
                    props.backwardsDeck.map((card, i) => {
                        return(
                            <Card className="unplayed-card" key={i} passkey={i} id={`deck-${i}`} style={{zIndex: (i + 2)}} />
                        )
                    })
                }
            </div>
            <div className="played-cards-container">
                <Card className={`current-card ${props.newCard ? props.newCard.color : props.currentCard[0].color}`} id={`current-card-id`} playCard={playCard}>
                    <p>{props.newCard ? props.newCard.val : props.currentCard[0].val}</p>
                </Card>
            </div>
        </>
    )
}

export default Deck