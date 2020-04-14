import React, { useState, useEffect } from "react"
import CrazyMain from './components/Crazy/CrazyMain'
import Rooms from './components/Crazy/Rooms/Rooms'
import Home from './components/Home/Home'
import Navigation from './components/Navigation/Navigation'
import UserProfile from './components/UserProfile/UserProfile'
import LoginModal from './components/Modals/LoginModal/LoginModal'
import RegisterModal from './components/Modals/RegisterModal/RegisterModal'
import Footer from './components/Footer/Footer'
import axios from "axios"
import './App.css'
import { Route, Switch } from 'react-router-dom'


const App = () => {
    const [username, setUsername] = useState('')
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [token, setToken] = useState('')
    const [gameswon, setGamesWon] = useState(0)
    const [gamesplayed, setGamesPlayed] = useState(0)
    const [avatar, setAvatar] = useState(null)
    const [roomInfo, setRoomInfo] = useState()

    function usePersistedState(key, def){
        const [user, setUser] = useState(
            () => JSON.parse(localStorage.getItem(key)) || def
    );
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(user));
    }, [key, user]);
        return [user, setUser];
    }

    const [user, setUser] = usePersistedState('user', {
        username: 'unauth',
        email: '',
        isLoggedIn: false,
        gamesplayed: 0,
        gameswon: 0,
        avatar: null,
        uid: null,
        current_room: null,
        roomCreator: false,
    });

    const [loginModal, toggleLoginModal] = useState(false)
    const [registerModal, toggleRegisterModal] = useState(false)
    const [tokenList, setTokenList] = useState()

    const login = (bool) => setIsLoggedIn(bool)

    const updateGrandparent = (val) => {
        if(registerModal) toggleRegisterModal(false);
        toggleLoginModal(val) 
    }

    const updateRegisterModal = (val) => {
        if(loginModal) toggleLoginModal(false)
        toggleRegisterModal(val)
    }

    const userAuthed = (res) => {
    console.log(res);
        if(res.data.auth){
            setUser({
                username: res.data.rows.username,
                isLoggedIn: res.data.rows.logged_in,
                email: res.data.rows.email,
                gameswon: res.data.rows.games_won,
                gamesplayed: res.data.rows.games_played,
                avatar: res.data.rows.avatar,
                current_room: res.data.rows.room_id,
                uid: res.data.rows.uid,
                roomCreator: false,
            })
        }
    }

    const userLoggedOut = (res) => {
        localStorage.removeItem('user')
        window.location.href = "/"
    }

    const logout = () => {
        axios.post('/users/logout', { username: user.username, rid: user.room_id, creator: user.roomCreator })
            .then(res => userLoggedOut(res))
            .catch(err => console.log(err))
    }

    const updateAvatar = (val) => {
        setUser(prevState => ({
            ...prevState,
            avatar: val,
        }))
    }

    const updateUserRoom = (res) => {
        console.log(res)
        setUser(prevState => ({
            ...prevState,
            current_room: res.data.rid,
            roomCreator: res.data.creator
        }))
        window.location.reload();
    }

    const setUserRoomId = (o) => {
        setUser(prevState => ({
            ...prevState,
            current_room: o,
        }))
        //window.location.href=`/crazy/rooms/${o}`
    }

    return(
        <>
            <Navigation updateApp={updateGrandparent} isLoggedIn={user.isLoggedIn} logout={logout} updateReg={updateRegisterModal} registerOpen={registerModal} loginOpen={loginModal} user={user} />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/crazy" exact
                    render={
                        (props) => <Rooms {...props} user={user} updateUserRoom={updateUserRoom} setUserRoomId={setUserRoomId}/>
                    }
                />
                <Route path="/crazy/rooms" 
                    render={
                        (props) => <CrazyMain {...props} user={user} updateUserRoom={updateUserRoom}  />
                    }
                />
                 {/* <Route path="/settings" component={UserSettings} /> */}
                <Route 
                    path="/profile" 
                    render={
                        (props) => <UserProfile {...props} user={user} updateAvatar={updateAvatar}/>
                    } 
                />
            </Switch>
            <Footer />
            <LoginModal updateUser={userAuthed} updateApp={updateGrandparent} isOpen={loginModal} />
            <RegisterModal updateUser={userAuthed} isOpen={registerModal} updateApp={updateRegisterModal}/>
        </>
    )
}

export default App;