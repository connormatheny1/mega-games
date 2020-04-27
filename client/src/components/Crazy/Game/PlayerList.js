import React, { useState, useEffect } from "react"
import queryString from 'query-string'
import onlineIcon from '../../../assets/icons/onlineIcon.png';
import {
    Button,
    Intent,
    Elevation
} from "@blueprintjs/core"


const PlayerList = ({ users, user, room, emitReady, readyPlayers, setReady }) => {
    const [username, setUsername] = useState('')
    const [numUsers, setNumUsers] = useState()
    const [buttonText, setButtonText] = useState("")
    const [disabledJoin, setDisabledJoin] = useState()
    const [userList, setUserList] = useState()
    const [isReady, setIsReady] = useState()
    const [btnIcon, setBtnIcon] = useState("")
    const [btnStateStyle, setBtnStateStyle] = useState({
        boxShadow: '-5px -5px 20px #fff,  5px 5px 20px #BABECC',
    })
    const img = [
        {val: 0, path:require("../../../assets/images/0.png")},
        {val: 1, path:require("../../../assets/images/1.png")},
        {val: 2, path:require("../../../assets/images/2.png")},
        {val: 3, path:require("../../../assets/images/3.png")},
        {val: 4, path:require("../../../assets/images/4.png")},
        {val: 5, path:require("../../../assets/images/5.png")},
        {val: 6, path:require("../../../assets/images/6.png")},
        {val: 7, path:require("../../../assets/images/7.png")},
        {val: 8, path:require("../../../assets/images/8.png")},
    ]

    const joinClick = (e, u) => {
        e.preventDefault()
        if(user.ready && user.username == u){
            if(btnIcon === "ban-circle"){
                setBtnIcon("confirm")
            }
            else{
                setBtnIcon("ban-circle")
            }
            if(buttonText === "Join"){
                setButtonText("")
            }
            else{
                setButtonText("")
            }
        }
        emitReady(user, room, readyPlayers)
    }

    useEffect(() => {
        setUserList(users)
    }, [userList, readyPlayers])

    return(
        <div className="playerListComp">
            {
                users ? (
                    users.map((u, i) => {
                        return(
                            <div className="player-list-item" key={i} id={u.username}>
                                <div>
                                    <img src={onlineIcon} height={10} width={10}></img>
                                    <span>{u.username}</span>
                                </div>
                                <Button
                                    key={u.username}
                                    id={u.username}
                                    icon={user.ready ? "confirm" : "ban-circle"}
                                    className="joinButton"
                                    disabled={user.username === u.username ? false : true}
                                    style={btnStateStyle}
                                    onClick={(e) => joinClick(e, u.username)}
                                    intent={u.ready ? Intent.SUCCESS : null}
                                    text={buttonText}
                                />
                            </div>
                        )
                        
                    })
                ) : (
                    <p>No players in this room, weird, not normal behavior</p>
                )
            }
        </div>
    )
}

export default PlayerList;