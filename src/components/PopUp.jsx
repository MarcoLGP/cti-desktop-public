import React from 'react'
import CloseButton from '../assets/icon-close.png'
import './PopUp.css'

export default function PopUp(props) {

    return (
        <React.Fragment>
            <div id='popup-box' >
                <div id='containerPopUp'>
                    <div id='content' style={{ height: props.height, width: props.width, marginTop: props.marginTop }} >
                        <img style={{ marginLeft: props.marginLeft }} src={CloseButton} onClick={e => props.setOpen(false)} />
                        {props.children}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
