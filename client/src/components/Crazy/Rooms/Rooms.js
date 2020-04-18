import React, { useState, useEffect } from "react"
import CreateRoom from './CreateRoom'

const Rooms = ( props ) => { 
    const updateUserRoom = (res) => {
        props.updateUserRoom(res)
    }

    const setUserRoomId = (o) => {
        props.setUserRoomId(o)
    }

    return(
            <div className="roomCont">
                <div className="roomsLeft">
                    <CreateRoom
                        setUserRoomId={setUserRoomId}
                        user={props.user}
                        updateUserRoom={updateUserRoom}
                    />
                </div>
                {/* <BrowseRooms rooms={rooms} /> */}
            </div>
    )
}

export default Rooms