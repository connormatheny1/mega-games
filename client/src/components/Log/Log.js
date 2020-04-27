import React, {useState, useEffect} from 'react'
import {
    Icon,
    H3,
    H4,
    H5,
    Position,
    Intent,
    Button,
    Collapse,
    Pre
} from "@blueprintjs/core"
const Log = (props) => {

    const toggle = () => {
        props.toggleLog(!props.logOpen)
    }

    return(
        <div className="site-log">
            <Collapse isOpen={props.logOpen} keepChildrenMounted={true} className="logs">
                {
                    props.data.map((log, i) => (
                        <Pre key={i} className="log-item">
                            {log}
                        </Pre>
                    ))
                }
            </Collapse>
            <Button onClick={toggle} outlined="true" intent={Intent.PRIMARY}>
                {props.logOpen ? 'Close' : 'Show'} logs
            </Button>
        </div>
    )

}

export default Log