import React from 'react'
import './grid_inicio.css'

export default function Grid(props) {

    return (
        <div id='box' onClick={props.onClick}>
            {props.children}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <p>{props.text}</p>
                {props.text2 ? <p style={{fontSize: props.fontSize}}>{props.text2}</p> : null}
            </div>
        </div>
    )

}