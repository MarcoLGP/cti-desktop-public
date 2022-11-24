import PopUp from '../components/PopUp'
import './buttonPopUps.css'
import React from 'react'

export default function EditEmailPopUp(props) {

    return (
        <PopUp setOpen={props.setOpen} height={'140px'} marginTop={'5%'} >
            <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center', marginTop: props.error ? '15%' : '10%' }}>
                <p style={{fontSize: '1.1em', fontWeight: '600', textAlign: 'center'}}>{props.error ? 'Desculpe, houve um erro no servidor. \n Tente novamente mais tarde' : <p>Confira o seu e-mail {'\n'}<p style={{color: '#342B49'}}>{props.email}</p>{'\n'} enviamos um codigo.</p>}</p>
            </div>
        </PopUp>
    )
}