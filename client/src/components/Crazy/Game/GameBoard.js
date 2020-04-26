import React, {useState, useEffect} from 'react'
import Deck from './Deck'
import numWords from 'num-words'
import Div from '../../client-utils/Div'
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
    const [readyPlayers, setReadyPlayers] = useState(props.readyPlayers)
    const [otherPlayers, setOtherPlayers] = useState([])
    const [yourCards, setYourCards] = useState()
    const [oppsCards, setOppsCards] = useState(props.opponentNumCards)
    const [oppsHand, setOppsHand] = useState(Array(props.opponentNumCards).fill('8s'))

    useEffect(() => {
        let youIndex = props.readyPlayers.findIndex((u) => u.username === props.user.username)
        if(youIndex != -1){
            for(let i = 0; i < props.readyPlayers.length; i++){
                if(i != youIndex){
                    setOtherPlayers(props.readyPlayers[i])
                }
            }
        }
    }, [readyPlayers])

    useEffect(() => {
        setOppsHand(new Array(oppsCards).fill('8s'))
    }, [oppsCards])

    const overlapLogic = (i, isUser) => {
        if(isUser){

        }
    }

    return(
        <div className={`gameboard started ${numWords(props.numUsers)}`}>
            {
                props.numUsers <= 3 ? (
                    <>
                        <div className="other-players-cards-2">
                            {
                                oppsHand ? (
                                    oppsHand.map((card, i) => {
                                        return(
                                            <Div className="card opponent" key={i}>
                                                <div className="card-inner inner-opponent">
                                                    {card}
                                                </div>
                                            </Div>
                                        )
                                    })
                                ) : ( <p>No Cards in opponent's `54   hand</p>)
                            }
                        </div>
                        <div className="middle-row-2">
                            <Deck numUsers={props.numUsers} gameStarted={props.gameStarted} />
                        </div>
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
                                            <Div className="card" key={i} id={`card-${i}`} style={overlapLogic(i, true), {zIndex: i}}>
                                                <div className="card-inner" style={{backgroundColor: hexVal}}>
                                                    <p className="card-val-left">{parsedValSm}</p>
                                                    <p className="card-val-center">{parsedValLg === card.val ? <span className="card-not-icon">{parsedValLg}</span> : parsedValLg}</p>
                                                    <p className="card-val-right">{parsedValSm}</p>
                                                </div>
                                            </Div>
                                        )
                                    })
                                ) : (
                                    <div>
                                        <p>No Cards in hand</p>
                                    </div>
                                )
                            }
                        </div>
                    </>
                ) : null
            }
        </div>
    )

}

export default GameBoard