import React from 'react'

const Div = ( props ) => (
    <div className={props.className} style={ props.styles ? props.styles : null }>
        {props.children}
    </div>
)

export default Div