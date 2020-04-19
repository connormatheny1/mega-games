import React, { useState, useEffect } from "react"
import queryString from 'query-string'
import onlineIcon from '../../../assets/icons/onlineIcon.png';
import {
    Button,
    Intent,
    Elevation
} from "@blueprintjs/core"


const PlayerList = ({ users, user, room, updateReadyPlayers, readyPlayers, setReady }) => {
    const [username, setUsername] = useState('')
    const [numUsers, setNumUsers] = useState()
    const [buttonText, setButtonText] = useState("Join")
    const [disabledJoin, setDisabledJoin] = useState()
    const [userList, setUserList] = useState()
    const [isReady, setIsReady] = useState()
    const [btnIcon, setBtnIcon] = useState("ban-circle")
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

    const joinClick = (e) => {
        e.preventDefault()
        // setBtnStateStyle({
        //     boxShadow: 'inset 1px 1px 2px #BABECC, inset -1px -1px 2px #fff'
        // })
        // setBtnStateStyle({
        //     boxShadow: '-5px -5px 20px #fff,  5px 5px 20px #BABECC',
        // })
        setReady(true)
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
            setButtonText("Join")
        }
        updateReadyPlayers(user, room, readyPlayers)
    }

    useEffect(() => {
        setUserList(users)
    }, [userList])

    const isReadyF = (u) => {
        let t;
        const existingUser = readyPlayers.find((user) => user.username === u)
        if(existingUser){
            return true;
        }
        return false
    }

    return(
        <div className="playerListComp">
            {
                users ? (
                    users.map((u, i) => (
                        <div className="player-list-item" key={i}>
                            <div>
                                <img src={onlineIcon} height={10} width={10}></img>
                                <span>{u.username}</span>
                            </div>
                            <Button
                                icon={btnIcon}
                                className="joinButton"
                                disabled={user.username === u.username ? false : true}
                                style={btnStateStyle}
                                onClick={(e) => joinClick(e)}
                                intent={u.ready ? Intent.SUCCESS : null}
                                text={buttonText}
                            />
                        </div>
                    ))
                ) : (
                    <p>No players in this room, weird, not normal behavior</p>
                )
            }
        </div>
    )
}

export default PlayerList;