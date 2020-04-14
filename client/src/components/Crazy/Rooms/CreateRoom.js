/* eslint-disable no-debugger, no-console, no-unused-vars */
import React, { useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import axios from "axios"
import {
    Card,
    Button,
    ButtonGroup,
    InputGroup,
    Icon,
    H3,
    H4,
    H5,
    Tooltip,
    Intent,
    Label,
    Toaster,
    Toast,
    ToasterPosition,
    Position,
    Radio,
    RadioGroup,
    FormGroup,
    Popover,
    PopoverInteractionKind
} from "@blueprintjs/core"

const CreateRoom = props => {
    const [roomName, setRoomName] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [disabled, setDisabled] = useState(false)
    const [helperTextOpen, setHelperTextOpen] = useState(false)
    const [formIntent, setFormIntent] = useState(Intent.PRIMARY)
    const [showErrorText, setShowErrorText] = useState(false)
    const [errorHelperText, setErrorHelperText] = useState("All fields are needed")
    const [idk, setIdk] = useState("idk man")
    const [user, setUser] = useState(props.user)

    const setUsernameAsDisplayName = () => {
        if(!disabled){
            setDisplayName(props.user.username)
            setDisabled(true)
        }
        else{
            setDisabled(false)
        }
    }
    
    const userIcon = (
        <Button 
            icon="user"
            minimal="true"
            onClick={setUsernameAsDisplayName}
        />
    )

    const randomIcon = (
        <Button 
            icon="random"
            minimal="true"
        />
    )

    const toggleHelperText = () => {
        setHelperTextOpen(!helperTextOpen)
    }

    const updateUser = (res) => {
        props.updateUserRoom(res)
    }

    const createRoom = (e) => {
        e.preventDefault()
        if(roomName && displayName){
            const data = {
                room: roomName,
                displayName: displayName,
                username: props.user.username
            }
            axios.post("/crazy/rooms", {room: data.room, name: data.username})
                .then((res) => {
                    console.log(res)
                    if(res.data.roomCreated){
                        props.createRoomSocketEvt('room-created', data)
                        props.setUserRoomId(roomName)
                    }
                    else{
                        console.log("didnt do")
                    }
                })
                .catch(err => console.error(err)) 
        }
        
        else{
            console.log('Please enter correct info')
            setDisplayName('');
            setRoomName('');
            setHelperTextOpen(true)
            setFormIntent(Intent.DANGER)
            setShowErrorText(true)
        }
    }

    return(
        <Card className="createRoom">
            <H4>Create a room, or join an existing one by entering the name of the room you'd like to join</H4>
                <FormGroup
                    helperText={
                        helperTextOpen && showErrorText ? errorHelperText : null
                    }
                >
                    <Label intent={formIntent}>
                        Room Name {/* <Icon icon="info-sign" iconSize={14} /> */}
                        <InputGroup
                            id="roomName"
                            large={true}
                            type="text"
                            placeholder="Name your room"
                            rightElement={randomIcon}
                            intent={formIntent}
                            onChange={(e) => setRoomName(e.currentTarget.value)}
                        />
                    </Label>
                </FormGroup> 

                <FormGroup
                    helperText={
                        helperTextOpen ? (
                            !showErrorText ?
                                "The name you'd like to use in this room, or click the icon in the box to the right of this field to display your username" 
                                : errorHelperText
                            ) : null
                    }
                >
                    <Label intent={formIntent}>
                        Display Name <Icon icon="help" iconSize={14}  onClick={toggleHelperText}/>
                        <InputGroup
                            id="displayName"
                            large={true}
                            type="text"
                            placeholder="Name in this room"
                            rightElement={userIcon}
                            value={displayName}
                            disabled={disabled}
                            onChange={(e) => setDisplayName(e.currentTarget.value)}
                            intent={formIntent}
                        />
                    </Label>
                </FormGroup> 
            <Link
                onClick={(e) => (!roomName || !displayName || !props.user.username) ? e.preventDefault() : null }
                to={`/crazy/rooms?username=${displayName || props.user.username}&room=${roomName}`}
                style={{width:'100%'}}
            >
                <Button
                    className="createButton"
                    intent={Intent.PRIMARY}
                    outlined="true"
                    text="GO"
                    fill="true"
                    type="submit"
                    large="true"
                />
            </Link>
        </Card>
    )
}

export default CreateRoom;