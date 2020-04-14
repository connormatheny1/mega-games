import React, { useState, useEffect } from "react"
import queryString from 'query-string'
import onlineIcon from '../../../assets/icons/onlineIcon.png';
import {
    Button,
} from "@blueprintjs/core"


const PlayerList = ({users, user}) => {
    const [username, setUsername] = useState('')
    const [room, setRoom] = useState('')
    const [numUsers, setNumUsers] = useState()
    const [disabledJoin, setDisabledJoin] = useState()
    const [userList, setUserList] = useState()
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

    // const joinHoverIn = () => {
    //     setBtnStateStyle({
    //         boxShadow: '-2px -2px 5px #fff, 2px 2px 5px #BABECC'
    //     })
    // }

    // const joinHoverOut = () => {
    //     setBtnStateStyle({
    //         boxShadow: '-5px -5px 20px #fff,  5px 5px 20px #BABECC',
    //     })
    // }

    const joinClick = () => {
        setBtnStateStyle({
            boxShadow: 'inset 1px 1px 2px #BABECC, inset -1px -1px 2px #fff'
        })
        setBtnStateStyle({
            boxShadow: '-5px -5px 20px #fff,  5px 5px 20px #BABECC',
        })
    }

    useEffect(() => {
        setUserList(users)
    }, [userList])


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
                                className="joinButton"
                                disabled={user.username === u.username ? false : true}
                                style={btnStateStyle}
                                onClick={joinClick}
                            >JOIN</Button>
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