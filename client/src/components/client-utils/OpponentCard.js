import React, { useState, useEffect } from 'react'
import Card from './Card'

const OpponentCard = ( props ) => {
    
    return(
        <div className={props.className}>
            {
                props.cards ? (
                    <>
                        {
                            props.cards.map((card, i) => (
                                <div className="card-opponent-plus" style={{ zIndex: i, top: `${i * 10}%` }}>
                                    <div className="card-opponent-plus-inner">
                                        8s
                                    </div>
                                </div>
                            ))
                        }
                    </>
                ) : (
                    <span>no cards</span>
                )
            }
        </div>
    )
}


export default OpponentCard
