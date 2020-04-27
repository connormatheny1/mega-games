import React, {useState, useEffect} from 'react'
import Deck from './Deck'
import numWords from 'num-words'
import Card from '../../client-utils/Card'
import { removeUser } from '../../client-utils/users'
import {
    Icon,
    H3,
    H4,
    H5,
    Position,
    Intent,
    Button,
} from "@blueprintjs/core"

const GameBoard = (props) => {
    const [yourCards, setYourCards] = useState()
    const [oppsCards, setOppsCards] = useState(props.opponentNumCards)
    const [oppsHand, setOppsHand] = useState(Array(props.opponentNumCards).fill('8s'))
    const [deck, setDeck] = useState(props.deck)
    const [backwardsDeck, setBackwardsDeck] = useState(populateUnused())
    const [currentCard, setCurrentCard] = useState(backwardsDeck.splice(0, 1))

    useEffect(() => {
        setDeck(props.deck)
        setBackwardsDeck(populateUnused(props.deck))
        if(props.deck[props.deck.length - 1].special === true){
            props.deck.splice(0,1)
            setCurrentCard(props.deck.splice(0, 1))
        }
        else{
            setCurrentCard(props.deck.splice(0, 1))
        } 
    }, [props.deck])

    function populateUnused (d){
        let newArr = deck.slice(0).reverse().map(
            function(val, idx){
                return val
            }
        )
        return newArr
    }

    useEffect(() => {
        setOppsHand(new Array(oppsCards).fill('8s'))
    }, [oppsCards])


    return(
        <div className={`gameboard started ${numWords(props.numUsers)}`}>
            {
                props.numUsers < 3 ? (
                    <div className="other-players-cards-2-cont">
                        <div className="other-players-cards-2">
                            {
                                oppsHand ? (
                                    oppsHand.map((card, i) => {
                                        return(
                                            <Card className="card-opponent" key={i} passkey={i} id={`oppcard-${i}`} user={props.user}>
                                                <div className="card-inner inner-opponent">
                                                    {card}
                                                </div>
                                            </Card>
                                        )
                                    })
                                ) : ( <p>No Cards in opponent's `54   hand</p>)
                            }
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="other-players-cards-3-cont">
                                {
                                    props.otherPlayers > 1 ? (
                                        props.otherPlayers.map((player) => (
                                            <div className="other-player">
                                                <div className="other-players-cards">
                                                    {
                                                        player.cards.map((card, i) => (
                                                            <Card className="card-opponent-plus" style={{ zIndex: i, top: `${i * 10}%` }}>
                                                                <div className="card-opponent-plus-inner">
                                                                    8s
                                                                </div>
                                                            </Card>
                                                        ))
                                                    }
                                                </div>
                                                <p>{player.username}</p>
                                                <p>{player.cards.length}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p>some how there are at least 3 people in here</p>
                                    )
                                }
                        </div>
                    </>
                )
            }        
            <div className="middle-row-2">
                <Deck numUsers={props.numUsers} gameStarted={props.gameStarted} deck={props.deck} currentCard={currentCard} backwardsDeck={backwardsDeck} />
            </div>
            <div className="your-cards-2-cont">
                <div className="your-cards-2">
                    {
                        props.user.hand ? (
                            props.user.hand.map((card, i) => {
                                let parsedValSm, parsedValLg, hexVal, intentColor

                                switch(card.color){
                                    case 'blue':
                                        intentColor = 'Intent.PRIMARY'
                                        hexVal = '#106BA3'
                                        break;
                                    case 'orange':
                                        intentColor = 'Intent.WARNING'
                                        hexVal = '#BF7326'
                                        break;
                                    case 'red':
                                        intentColor = 'Intent.DANGER'
                                        hexVal = '#C23030'
                                        break;
                                    case 'green':
                                        intentColor = 'Intent.SUCCESS'
                                        hexVal = '#0D8050'
                                        break;
                                    default: 
                                        intentColor = 'Intent.NONE'
                                        hexVal = '#738694'
                                }
                                switch(card.val){
                                    case 'draw2':
                                        parsedValSm = '+2'
                                        parsedValLg = <Icon icon="add" intent={intentColor} iconSize={28} className="card-icon"/>
                                        break;
                                    case 'draw4':
                                        parsedValSm = '+4'
                                        parsedValLg = <Icon icon="add" intent={intentColor} iconSize={28} className="card-icon"/>
                                        break;
                                    case 'reverse':
                                        parsedValSm = 'Reverse'
                                        parsedValLg = <Icon icon="reset" intent={intentColor} iconSize={28} className="card-icon"/>
                                        break;
                                    case 'skip':
                                        parsedValSm = 'Skip'
                                        parsedValLg = <Icon icon="disable" intent={intentColor} iconSize={28} className="card-icon"/>
                                        break;
                                    case 8:
                                        parsedValSm = '8'
                                        parsedValLg = <Icon icon="git-new-branch" intent={intentColor} iconSize={28} className="card-icon"/>
                                        break;
                                    default: 
                                        parsedValSm = card.val
                                        parsedValLg = card.val
                                }

                                return(
                                    <Card className="card" key={i} passkey={i} id={`card-${i}`} user={props.user} playerListOpen={props.playerListOpen}>
                                        <div className="card-inner" style={{backgroundColor: hexVal}}>
                                            <p className="card-val-left">{parsedValSm}</p>
                                            <p className="card-val-center">{parsedValLg === card.val ? <span className="card-not-icon">{parsedValLg}</span> : parsedValLg}</p>
                                            <p className="card-val-right">{parsedValSm}</p>
                                        </div>
                                    </Card>
                                )
                            })
                        ) : (
                            <div>
                                <p>No Cards in hand</p>
                            </div>
                        )
                    }
                </div>
                <div className="my-game-info">
                    <div>
                        //avatar + num wins in room
                        //name
                    </div>
                    <div>
                        //your turn, not your turn
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GameBoard