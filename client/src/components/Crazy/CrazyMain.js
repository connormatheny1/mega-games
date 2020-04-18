import React, { useState, useEffect } from "react"
import queryString from 'query-string'
import io from 'socket.io-client'
import {
    Icon,
    H3,
    Classes,
    H5,
    Drawer,
    Position,
    Button
} from "@blueprintjs/core"
import PlayerList from './Game/PlayerList'
let socket;

const CrazyMain = props => {
    
    const [username, setUsername] = useState('')
    const [room, setRoom] = useState('')
    const [users, setUsers] = useState()
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [playerListOpen, setPlayerListOpen] = useState(true)
    const [playerListIcon, setPlayerListIcon] = useState('double-chevron-left')
    const [numUsers, setNumUsers] = useState(0);
    const [roomCreator, setRoomCreator] = useState('');
    const ENDPOINT = 'localhost:5000/crazy/rooms'
    
    useEffect(() => {
        const { username, room } = queryString.parse(props.location.search)
        socket = io(ENDPOINT)
        setUsername(username)
        setRoom(room)
        
        socket.emit('join', { username, room }, (error) => {
            if(error) {
              alert(error);
            }
          });

        return () => {
            socket.emit('disconnect')
            socket.off();
        }
    }, [ENDPOINT, props.location.search])

    useEffect(() => {
        socket.on('roomData', ({users}) => {
            setUsers(users)
            setNumUsers(users.length)
            const creatorIndex = users.findIndex((u) => u.creator === true)
            setRoomCreator(users[creatorIndex].username || username)
        })
    }, [users])

    const playerListToggle = () => {
        setPlayerListOpen(!playerListOpen)
        if(!playerListOpen){
            setPlayerListIcon('double-chevron-right')
        }
        else{
            setPlayerListIcon('double-chevron-left')
        }
    }

    const dialogHeader = () => (
        <div className={Classes.DIALOG_HEADER}>
            <H5 className="dialogHead" style={{fontWeight:'normal'}}>
                <span>Players in room:&nbsp; 
                    <b>
                        {numUsers}
                    </b>
                </span>
                <span style={ numUsers < 3 ? {color: '#A82A2A'} : {color: '#0D8050'}}>(min. 3)</span>
            </H5>
        </div> 
    )

    return(
            <div className="gameCont">
                <div className="roomInfoHeader">
                    <div className="left">
                        <H3><span style={{fontWeight: "normal"}}>{room}</span></H3>
                    </div>
                    <div className="right">
                        <span><Icon icon="new-person"/>Created by:&nbsp;<b>{roomCreator}</b></span>
                        <span>
                            <Icon icon="time"/> Room created:&nbsp;
                            <b>
                                Dates
                                {/* {new Date(info.rows.created_at).toDateString()}, {new Date(info.rows.created_at).toLocaleTimeString('en-US')} */}
                            </b>
                        </span>
                    </div>
                </div>
                <div className="gameBody">
                    <div className="playerListCont">
                        <Drawer 
                            title={dialogHeader()} 
                            isCloseButtonShown={false} 
                            isOpen={playerListOpen} 
                            usePortal={false} 
                            hasBackdrop={false} 
                            lazy={true}
                            position={Position.LEFT}
                            size="260px" 
                            className="drawer"
                            onClose={() => {setPlayerListOpen(!playerListOpen)}}
                            canOutsideClickClose={false}
                            canEscapeKeyClose={false}
                        >
                            <PlayerList users={users} user={props.user}/>
                        </Drawer>
                        <Button icon={playerListIcon} minimal="true" onClick={playerListToggle} className="drawer-button" style={ playerListOpen ? {left: '238px'} : {left: '0px'}}/>
                    </div>
                    <div>
                        {/* <Game /> */}
                    </div>
                    <div>
                        {/* <Chat /> */}
                    </div>
                </div>
            </div>
    )
}

export default CrazyMain;