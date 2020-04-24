import React, {useState, useEffect} from 'react'
import GameBoard from "./GameBoard"
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
    const [readyPlayers, setReadyPlayers] = useState()
    const { numUsers, gameStarted } = props

    const startGame = (e) => {
        e.preventDefault()
        props.startGame(e);
        setStarted(true)
    }

    return(
        <>
            {
                gameStarted ? (
                    <GameBoard numUsers={numUsers} readyPlayers={props.readyPlayers} user={props.user} />
                ) : (
                    numUsers === props.readyPlayers.length ? (
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