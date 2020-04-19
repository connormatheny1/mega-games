import React, {useState, useEffect} from 'react'
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
    const [started, setStarted] = useState(false);

    const startGame = (e) => {
        e.preventDefault()
        setStarted(true)
        props.startGame(e);
    }

    return(
        <>
            {
                props.gameStarted ? (
                    <div className="gameboard started">

                    </div>
                ) : (
                    props.numUsers > 1 ? (
                        <Button
                            text="Start a game"
                            icon="tick"
                            className="gameboard notstarted"
                            intent={Intent.SUCCESS}
                            onClick={e => startGame(e)}
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