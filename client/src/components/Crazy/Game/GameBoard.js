import React, {useState, useEffect} from 'react'
import Deck from './Deck'
import numWords from 'num-words'
import Card from '../../client-utils/Card'
import OpponentCard from '../../client-utils/OpponentCard'
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
const img = 
[
    {val: 0, path:require("../../../assets/images/0.png")},
    {val: 1, path:require("../../../assets/images/1.png")},
    {val: 2, path:require("../../../assets/images/2.png")},
    {val: 3, path:require("../../../assets/images/3.png")},
    {val: 4, path:require("../../../assets/images/4.png")},
    {val: 5, path:require("../../../assets/images/5.png")},
    {val: 6, path:require("../../../assets/images/6.png")},
    {val: 7, path:require("../../../assets/images/7.png")},
    {val: 8, path:require("../../../assets/images/8.png")} 
]

const GameBoard = (props) => {
    const [yourCards, setYourCards] = useState()
    const [oppsCards, setOppsCards] = useState(props.opponentNumCards)
    const [oppsHand, setOppsHand] = useState(Array(props.opponentNumCards).fill(0, props.opponentNumCards - 1))
    const [deck, setDeck] = useState(props.deck)
    const [backwardsDeck, setBackwardsDeck] = useState(populateUnused())
    const [currentCard, setCurrentCard] = useState(backwardsDeck.splice(0, 1))
    const [firstCard, setFirstCard] = useState(true)
    const [drawCard, setDrawCard] = useState(false)
    const [newCard, setNewCard] = useState(props.newCard)
    
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

    const playCard = (e, value, color, special, id) => {
        e.preventDefault()
        setFirstCard(false)
        props.playCard(e, value, color, special, id)
        setCurrentCard([{
            color: color,
            special: special, 
            val: value
        }])
        
    }

    // useEffect(() => {
    //     if(props.newCard){
    //         setNewCard(props.newCard)
    //     }
        
    // }, [props.newCard])

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
                                            <Card className="card-opponent" key={i} passkey={i} id={`oppcard-${i}`} user={props.user} playCard={playCard}>
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
                                    props.otherPlayers.length > 1 ? (
                                        props.otherPlayers.map((c, i) => {
                                            return(
                                                <div className="other-player" id={`other-player-${i}`}>
                                                    <div className="other-players-cards"> 
                                                        {/* <Card className="card-opponent-plus" key={i} style={{ zIndex: i, top: `${i * 10}%` }}> */}
                                                            <OpponentCard cards={c.cards} />
                                                        {/* </Card> */}
                                                        
                                                    </div>
                                                    <p>{c.username}</p>
                                                    {/* <p>{c.cards.length}</p> */}
                                                </div>
                                            )
                                        })
                                    )  : (
                                        <p>some how there are at least 3 people in here</p>
                                    )
                                }
                        </div>
                    </>
                )
            }        
            <div className="middle-row-2">
                <Deck numUsers={props.numUsers} gameStarted={props.gameStarted} deck={props.deck} currentCard={currentCard} newCard={props.newCard} backwardsDeck={backwardsDeck} />
            </div>
            <div className="your-cards-2-cont">
                <div className="your-cards-2">
                    {
                        props.user.hand.length ? (
                            props.user.hand.map((card, i) => {
                                let parsedValSm, parsedValLg, hexVal, intentColor, playable, curCard = currentCard[0], playableCards = 0
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

                                let cur;
                                if(!props.newCard){
                                    cur = currentCard[0]
                                }
                                else{
                                    cur = props.newCard
                                }
                                try{
                                    if(card.val === cur.val || card.color === cur.color || card.val === 8){
                                        playable = true
                                        playableCards++
                                    }
                                    else{
                                        playable = false
                                    }
                                }
                                catch(e){
                                    console.log(e.message)
                                }
                                

                                if(i === (props.user.hand.length - 1)){
                                    
                                }

                                return(
                                    <Card 
                                        className="card"
                                        key={i}
                                        passkey={i}
                                        playable={playable}
                                        id={`card-${i}`}
                                        user={props.user}
                                        playerListOpen={props.playerListOpen}
                                        playCard={playCard}
                                        value={parsedValSm}
                                        color={card.color}
                                        special={card.special}
                                    >
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
                    <div className="me">
                        <div className="f-fs-c me-cont">
                            <img src={img[props.user.avatar].path} alt="user avatar icon" height={35} width={35}></img>
                            <span className="game-info-name">{props.user.username}</span>
                        </div>
                        <div className="fc-sb-c wins">
                            <span>Room wins: 0</span>
                            <span>Total wins: {props.user.gameswon}</span>
                        </div>
                        <div className="f-c-c turns">
                            <span className="user-turn-indicator f-c-c">
                                { 
                                    props.users[props.currentTurnIndex].username ===  props.user.username 
                                        ? "YOUR TURN" 
                                        : (
                                            <span>
                                                <Icon className="user-not-turn" icon="cross" iconSize={Icon.SIZE_LARGE} intent={Intent.DANGER} />
                                                    WAITING...
                                            </span>
                                        )
                                }
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default GameBoard