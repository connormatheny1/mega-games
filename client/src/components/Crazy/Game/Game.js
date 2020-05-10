import React, {useState, useEffect} from 'react'
import GameBoard from "./GameBoard"
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
const Game = (props) => {
    const [started, setStarted] = useState();
    const [me, setMe] = useState(props.user)
    
    const { numUsers } = props
    const startGame = (e) => {
        e.preventDefault()
        setStarted(true)
        props.startGame(e);
    }

    //console.log(props.otherPlayers)
    return(
        <>
            {
                props.gameStarted ? (
                    <GameBoard users={props.users} otherPlayers={props.otherPlayers} playerListOpen={props.playerListOpen} numUsers={numUsers} gameStarted={props.gameStarted} user={props.user} deck={props.deck} opponents={props.opponents}/>
                ) : (//=== props.readyPlayers.length
                    numUsers ? (
                        <Button
                            text="Start a game"
                            icon="tick"
                            className="gameboard notstarted"
                            intent={Intent.SUCCESS}
                            onClick={(e) => startGame(e)}
                        />
                    ) : (
                        <Button 
                            text="All players must be ready to start"
                            icon="cross"
                            className="gameboard notstarted"
                            intent={Intent.WARNING}
                        />
                    )
                )
            }
        </>
    )

}

export default Game