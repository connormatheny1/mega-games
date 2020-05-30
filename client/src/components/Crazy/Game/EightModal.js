import React from 'react';
import {
    Card,
    Elevation
} from "@blueprintjs/core"

const EightModal = (props) => {
    const handleBlue = () => {
        props.handleBlue()
    }

    const handleGreen = () => {
        props.handleGreen()
    }

    const handleOrange = () => {
        props.handleOrange()
    }

    const handleRed = () => {
        props.handleRed()
    }

    return(
        <Card elevation={Elevation.FOUR} style={props.open ? {display: 'flex'} : {display: 'none'}} className="eight-modal">
            <h4 className="eight-modal-header">
                Pick a color...
            </h4>
            <div className="f-sb-c w-100 h-50">
                <div className="red eight f-c-c" onClick={handleRed}>Red</div>
                <div className="blue eight f-c-c" onClick={handleBlue}>Blue</div>
            </div>
            <div className="f-sb-c w-100 h-50">
                <div className="green eight f-c-c bbl-r-2" onClick={handleGreen}>Green</div>
                <div className="orange eight f-c-c bbr-r-2" onClick={handleOrange}>Orange</div>
            </div>
        </Card>
    )
}

export default EightModal