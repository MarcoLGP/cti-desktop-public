import PopUp from '../components/PopUp'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import { getDBpass } from '../firebase/firebase'
import HttpsRoundedIcon from '@mui/icons-material/HttpsRounded';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import SyncLockRoundedIcon from '@mui/icons-material/SyncLockRounded';
import './buttonPopUps.css'
import React from 'react'

export default function EditEmailPopUp(props) {

    function Validate() {
        if(!senhaAntiga || !novaSenha || !novaSenha2) {
            setErro(true)
            setHelper('Campo(s) vazios')
        } else if (novaSenha !== novaSenha2) {
            setErro(true)
            setHelper('Senhas diferentes, digite novamente')
        } else if(novaSenha.length < 5) {
            setErro(true)
            setHelper('Senha muito curta')
        } else {
            getDBpass('Password', senhaAntiga, false, setErro, props.setOpen, setHelper, novaSenha)
        }
    }

    const [senhaAntiga, setSenhaAntiga] = React.useState('')
    const [novaSenha, setNovaSenha] = React.useState('')
    const [novaSenha2, setNovaSenha2] = React.useState('')
    const [erro, setErro] = React.useState(false)
    const [helper, setHelper] = React.useState('')

    return (
        <PopUp setOpen={props.setOpen} height={'420px'} marginTop={'5%'} >
            <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center'}}>
                <div>
                    <SyncLockRoundedIcon sx={{ fontSize: 170, color: '#342B49' }} />
                    <TextField type='password' error={erro ? true : false} helperText={helper ? helper : false} size='small' sx={{ maxWidth: '70%' }} value={senhaAntiga} onChange={e => setSenhaAntiga(e.target.value)} placeholder="Senha Antiga" InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <HttpsRoundedIcon fontSize='medium' />
                            </InputAdornment>
                        )
                    }} />
                    <TextField type='password' error={erro ? true : false} size='small' sx={{ maxWidth: '70%', paddingTop: '3%' }} value={novaSenha} onChange={e => setNovaSenha(e.target.value)} placeholder="Senha Nova" InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <VpnKeyRoundedIcon fontSize='medium' />
                            </InputAdornment>
                        )
                    }} />
                    <TextField type='password' error={erro ? true : false} size='small' sx={{ maxWidth: '70%', paddingTop: '3%' }} value={novaSenha2} onChange={e => setNovaSenha2(e.target.value)} placeholder="Confirmar Senha" InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <VpnKeyRoundedIcon fontSize='medium' />
                            </InputAdornment>
                        )
                    }} />
                    <div onClick={e => Validate()} id='buttonPopUp' style={{ marginTop: erro ? '4%' : '6.5%', height: '45px', fontSize: '1.2em' }} >
                        <p>Alterar</p>
                    </div >
                </div>
            </div>
        </PopUp>
    )
}