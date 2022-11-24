import React from 'react'
import PopUp from '../components/PopUp'
import { colaborador } from '../firebase/firebase.js'

export default function ComingSoon(props) {

    return(
        <PopUp setOpen={props.setOpen} marginLeft={'26.5%'} height={'110px'} marginTop={'5%'} >
            <div style={{ marginRight: 'auto', marginLeft: 'auto', marginTop: '9%', maxHeight: 50, maxWidth: 290, minHeight: 50, minWidth: 290 }}>
                <p style={{fontSize: '1.1em', fontWeight: '600', textAlign: 'center'}}><span style={{color: '#342B49'}} >{colaborador().nome}</span>, este recurso estará disponível em breve! </p>
            </div>
        </PopUp>
    )
}