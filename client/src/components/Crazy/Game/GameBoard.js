import React, {useState, useEffect} from 'react'
import Deck from './Deck'
import numWords from 'num-words'
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
    const [otherPlayers, setOtherPlayers] = useState([])

    useEffect(() => {
        let youIndex = props.readyPlayers.findIndex((u) => u.username === props.user.username)
        if(youIndex != -1){
            for(let i = 0; i < props.readyPlayers.length; i++){
                if(i != youIndex){
                    console.log(youIndex)
                    console.log(props.readyPlayers[i])
                    setOtherPlayers(props.readyPlayers[i])
                }
            }
        }
    }, [])

    console.log(numWords(props.numUsers))
    return(
        <div className={`gameboard started ${numWords(props.numUsers)}`}>
            {
                props.numUsers <= 3 ? (
                    <>
                        <div className="other-players-cards-2">
                            <H3>Their cards</H3>
                        </div>
                        <div className="middle-row-2">
                            <Deck numUsers={props.numUsers} />
                        </div>
                        <div className="your-cards-2">
                            <H3>Your cards</H3>
                        </div>
                    </>
                    
                ) : null
            }
        </div>
    )

}

export default GameBoard