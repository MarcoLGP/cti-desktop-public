import React from 'react'
import './TitleBar.css'
import close from '../assets/icon-close.png'
import minimize from '../assets/icon-minimize.png'
import maximize from '../assets/icon-maximize.png'
import unmaximize from '../assets/icon-unmaximize.png'

export default class Titlebar extends React.Component {

    state = {
        fullscreen: false
    }

    mudarImg() {
        this.setState({ fullscreen: !this.state.fullscreen })
    }

    render() {
        let image = this.state.fullscreen ? unmaximize : maximize;
        const imgStyle = {
            display: this.props.tirarMax ? "none" : "block"
        }
        const setEvent = () => {
            this.state.fullscreen ? window.electron.singleSend('unmaximize') : window.electron.singleSend('maximize')
            return this.state.fullscreen
        }
        return (
            <div id="titlebar">
                <div className='buttons'>
                    <img src={close} alt="fechar" height={24} onClick={() => { window.close() }} id='close' />
                    <img src={minimize} alt="minimizar" height={24} id='minimize' onClick={() => { window.electron.singleSend('minimize') }} />
                    <img src={image} alt="maximizar" height={25} id='maximize' onClick={() => {
                        setEvent()
                        this.mudarImg()
                    }} style={imgStyle} />
                </div>
            </div>
        )
    }
}