import PopUp from '../components/PopUp'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import { userInfo } from '../firebase/firebase.js'
import HttpsRoundedIcon from '@mui/icons-material/HttpsRounded';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded';
import './buttonPopUps.css'
import React from 'react'

export default function EditEmailPopUp(props) {

    const [senhaAntiga, setSenhaAntiga] = React.useState('')
    const [novaSenha, setNovaSenha] = React.useState('')
    const [novaSenha2, setNovaSenha2] = React.useState('')

    return (
        <PopUp setOpen={props.setOpen} height={'450px'} marginTop={'5%'} >
            <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center', marginTop: '5%' }}>
                <div>
                    <LockOpenRoundedIcon sx={{ fontSize: 170, color: '#342B49' }} />
                    <TextField size='small' sx={{ maxWidth: '70%' }} value={senhaAntiga} onChange={e => setSenhaAntiga(e.target.value)} placeholder="Senha Antiga" InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <HttpsRoundedIcon fontSize='medium' />
                            </InputAdornment>
                        )
                    }} />
                    <TextField size='small' sx={{ maxWidth: '70%', paddingTop: '3%' }} value={novaSenha} onChange={e => setNovaSenha(e.target.value)} placeholder="Senha Nova" InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <VpnKeyRoundedIcon fontSize='medium' />
                            </InputAdornment>
                        )
                    }} />
                    <TextField size='small' sx={{ maxWidth: '70%', paddingTop: '3%' }} value={novaSenha2} onChange={e => setNovaSenha2(e.target.value)} placeholder="Confirmar Senha" InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <VpnKeyRoundedIcon fontSize='medium' />
                            </InputAdornment>
                        )
                    }} />
                    <div onClick={e => userInfo().nome} id='buttonPopUp' style={{ marginTop: '6.5%', height: '45px', fontSize: '1.2em' }} >
                        <p>Alterar</p>
                    </div >
                </div>
            </div>
        </PopUp>
    )

}