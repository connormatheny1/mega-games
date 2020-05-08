import React, { useState, useEffect, useRef } from "react"
import queryString from 'query-string'
import io from 'socket.io-client'
import Chat from "./Chat/Chat"
import Game from "./Game/Game"
import {
    Icon,
    H3,
    H4,
    Classes,
    H5,
    Drawer,
    Position,
    Button,
    Popover,
    Menu,
    MenuItem,
    Elevation
} from "@blueprintjs/core"
import Collapse from '@material-ui/core/Collapse'
import Paper from '@material-ui/core/Paper'
import PlayerList from './Game/PlayerList'
let socket;

const CrazyMain = props => {
    let currentdate = new Date(); 
    let datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
    const [username, setUsername] = useState('')
    const [room, setRoom] = useState('')
    const [users, setUsers] = useState()
    const [otherPlayers, setOtherPlayers] = useState()
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [playerListOpen, setPlayerListOpen] = useState(true)
    const [playerListIcon, setPlayerListIcon] = useState(true)
    const [numUsers, setNumUsers] = useState(0);
    const [roomCreator, setRoomCreator] = useState('');
    const [socketId, setSocketId] = useState('')
    const [errors, setErrors] = useState([])
    const [isChatOpen, setIsChatOpen] = useState(true)
    const [chatIcon, setChatIcon] = useState(true)
    const [msgCount, setMsgCount] = useState(0)
    const [emojis, setEmojis] = useState(false)
    const [gameStarted, setGameStarted] = useState(false)    
    const [deck, setDeck] = useState()  
    const [hand, setHand] = useState(props.user.hand)
    const [opponents, setOpponents] = useState([])
    const [player, setPlayer] = useState(props.user)
    const [currentTurnIndex, setCurrentTurnIndex] = useState(0)
    const [playDirection, setPlayerDirection] = useState(true)//true = clockwise, false = counter clockwise
    const [lastMove, setLastMove] = useState({player: {}, cardPlayed: {}, turnTo: {}})
    const size = useWindowSize()

    const [readyPlayers, setReadyPlayers] = useState([])
    

    const ENDPOINT = 'localhost:5000/crazy/rooms'

    useEffect(() => {
        if(props.location.search.length < 2){
            return socket.emit('bad-path', {qs: props.location.search}, (error) => {
                if(error){
                    alert(error)
                    window.location.href = "/crazy/rooms"
                }
            })
        }
        const { username, room } = queryString.parse(props.location.search)
        socket = io(ENDPOINT)
        setUsername(username)
        setRoom(room)
        
        socket.emit('join', { username, room }, (error) => {
            if(error) {
              alert(error);
            }
        });

        props.updateLog(`${username} joined room '${room}' at ${datetime}`)

        return () => {
            socket.emit('disconnect')
            socket.off();
            setUserSocketId(null)
        }
    }, [ENDPOINT, props.location.search])


    useEffect(() => {
        socket.on('roomData', ({users, socket_id}) => {
            setUsers(users)
            setNumUsers(users.length)
            setOtherPlayers(users.filter((u) => u.username !== props.user.username))
            let creatorIndex = users.findIndex((u) => u.creator === true)
            if(creatorIndex != -1) {
                setRoomCreator(users[creatorIndex].username)
            }
            setSocketId(socket_id)
            setUserSocketId(socket_id)
        })
    }, [users, otherPlayers])


    useEffect(() => {
        socket.on('bad-path-ui', ({user, error}) => {
            setErrors([...errors, error])
        })
    }, [errors])


    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message])
            setMsgCount(prevCount => prevCount + 1)
        })

        // socket.on("roomData", ({ users }) => {
        //     setUsers(users)
        // })
    }, [msgCount])


    const sendMessage = (e, m) => {
        e.preventDefault()
        if(m){
            socket.emit('sendMessage', m, () => setMessage(''))
        }
        else{
            console.log('no messages')
        }
    }

    const startGame = (e) => {
        socket.emit('game-started', { user: props.user, users, room, numUsers })
    }

    useEffect(() => {
        socket.on('start-game', (data) => {
            setGameStarted(data.bool)
        })
        socket.emit('get-cards')
    }, [])


    useEffect(() => {
        socket.on('deal-cards-on-start', (data) => {
            for(let i = 0; i < data.users.length; i++){
                if(props.user.username === data.users[i].username){
                    console.log(`Dealing to: ${data.users[i].username}`)
                    setHand(data.users[i].cards)
                    props.setHand(data.users[i].cards)
                }
                // else{
                //     setOpponents([...opponents, data.users[i]])
                //     //TODO remove opponents card data from readyPlayer hook and anywhere else it can be viewed
                // }
            }
        })
    }, [])

    useEffect(() => {
        socket.on('updated-deck', (data) => {
            setDeck(data.deck)
        })
    }, [deck])
    
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

    const chatToggle = () => {
        setIsChatOpen(!isChatOpen)
        setChatIcon(!chatIcon)
    }
 
    const playerListToggle = () => {
        let b = !playerListOpen
        setPlayerListOpen(b)
        setPlayerListIcon(b)
    }

    const setUserSocketId = (s) => {
        props.setUserSocketId(s)
    }

    const cogToggle = () => {
        setEmojis(!emojis)
    }

    const setReady = (v) => {
        props.setReady(v)
    }

    const drawerProps = {
        title: dialogHeader(),
        isCloseButtonShown: false,
        isOpen: playerListOpen,
        usePortal: false,
        hasBackdrop: false,
        lazy: true,
        position: Position.LEFT,
        size: "240px",
        className: "drawer",
        onClose: () => {setPlayerListOpen(!playerListOpen)},
        canOutsideClickClose: false,
        canEscapeKeyClose: false
    }

    const ChatMenu = () => (
        <Menu>
            <MenuItem text={emojis ? "Disable chat emojies" : "Enable chat emojies"} icon={emojis ? "cross" : "add"} onClick={cogToggle}/>
        </Menu>
    )

    return(
        <div className="gameCont">
            <div className="roomInfoHeader">
                <div className="left">
                    <H3><span style={{fontWeight: "normal"}}>{room}</span></H3>
                </div>
                <div>
                    { errors ? (errors.toString()) : null }
                </div>
                <div className="right">
                    <span><Icon icon="new-person"/>Created by:&nbsp;<b>{roomCreator ? roomCreator : ( users ? users[0].username : props.user.username )}</b></span>
                </div>
            </div>
            <div className="gameBody">
                <div className="playerListCont">
                    <Drawer {...drawerProps}>
                        <div className="fc-sb-c h-100 w-100">
                            <PlayerList users={users} user={props.user} room={room} setReady={setReady}/>
                            <div className="chat-container">
                                <Paper className="f-sb-c w-100 chat-head" elevation={2}>
                                    <H4>Chat</H4>
                                    <div className="f-sb-c w-30">
                                    <Popover content={<ChatMenu />} position={Position.RIGHT_BOTTOM} elevation={Elevation.TWO}>
                                        <Button
                                            icon="cog"
                                            minimal="true"
                                            size={18}
                                        />
                                    </Popover>
                                        <Button 
                                            icon={chatIcon ? 'caret-down' : 'caret-up'}
                                            onClick={chatToggle}
                                            className="chat-collapse-button"
                                            minimal="true"
                                            size={18}
                                        />
                                    </div>
                                </Paper>
                                <Collapse
                                    elevation={2}
                                    in={isChatOpen}
                                    timeout="auto"
                                    unmountOnExit
                                    className="w-100 h-100 fc-fe-c"
                                >
                                    <Chat location={props.location} username={username} emojis={emojis} emitSendMessage={sendMessage} messages={messages} />
                                </Collapse>
                            </div>
                        </div>
                    </Drawer>
                    <Button icon={playerListOpen ? "double-chevron-left" : "double-chevron-right"} minimal="true" onClick={playerListToggle} className="drawer-button" style={ playerListOpen ? {left: '238px'} : {left: '0px'}}/>
                </div>
                <Paper elevation={4} className="gameboard-container h-100" style={playerListOpen ? {width: 'calc(100% - 240px'} : {width: '100%'}}>
                    <Game user={props.user} users={users} numUsers={numUsers} otherPlayers={otherPlayers} startGame={startGame} gameStarted={gameStarted} deck={deck} opponents={opponents} playerListOpen={playerListOpen}/>
                </Paper>
            </div>
        </div>
    )
}

function useWindowSize() {
    const isClient = typeof window === 'object';
  
    function getSize() {
      return {
        width: isClient ? window.innerWidth : undefined,
        height: isClient ? window.innerHeight : undefined
      };
    }
  
    const [windowSize, setWindowSize] = useState(getSize);
  
    useEffect(() => {
      if (!isClient) {
        return false;
      }
      
      function handleResize() {
        setWindowSize(getSize());
      }
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []); // Empty array ensures that effect is only run on mount and unmount
  
    return windowSize;
}

export default CrazyMain;