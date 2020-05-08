import React from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
import {
    Intent,
    Button,
    Collapse,
    Pre,
    Code
} from "@blueprintjs/core"
const Log = (props) => {
    const toggle = () => {
        props.toggleLog(!props.logOpen)
    }

    return(
        <div className="site-log">
            <Collapse isOpen={props.logOpen} keepChildrenMounted={true} className="logs">
                <ScrollToBottom>
                    {
                        props.data.map((log, i) => (
                            <>
                                <p><code>{log}</code></p>                                    
                            </>
                        ))
                    }
                </ScrollToBottom>
            </Collapse>
            <Button onClick={toggle} outlined="true" intent={Intent.PRIMARY} className="logs-btn">
                {props.logOpen ? 'Close' : 'Open'} logs
            </Button>
        </div>
    )
}

export default Log