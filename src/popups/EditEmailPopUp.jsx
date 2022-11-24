import PopUp from '../components/PopUp'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import { atualizarEmail, LoginUser } from '../firebase/firebase.js'
import MarkEmailReadRoundedIcon from '@mui/icons-material/MarkEmailReadRounded';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import DraftsRoundedIcon from '@mui/icons-material/DraftsRounded';
import {useSelector} from 'react-redux'
import './buttonPopUps.css'
import React from 'react'

export default function EditEmailPopUp(props) {

    const {userInformation} = useSelector(state => state.login)
    const [email, setEmail] = React.useState('')
    const [email2, setEmail2] = React.useState('')
    const [senha, setSenha] = React.useState('')
    const [erro, setErro] = React.useState(false)
    const [helper, setHelper] = React.useState('')

    function Validate() {
        if(!email || !email2 || !senha) {
            setErro(true)
            setHelper('Campo(s) Vazio(s)')
        } else if (email !== email2) {
            setErro(true)
            setHelper('Emails não correspondentes')
        } else if (!email.includes('@') || !email2.includes('@')) {
            setErro(true)
            setHelper('E-mail inválido')
        } else if (senha.length < 4) {
            setErro(true)
            setHelper('Insira uma senha acima de 3 caracteres')
        } else {
            LoginUser(userInformation.email, senha, setErro, setHelper, false, props.setOpen)
            if(!erro) atualizarEmail(email)
        }
    }

    return (
        <PopUp setOpen={props.setOpen} height={'450px'} marginTop={'5%'} >
            <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center', marginTop: '5%' }}>
                <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <DraftsRoundedIcon sx={{ fontSize: 170, color: '#342B49' }} />
                    <TextField helperText={helper ? helper : null} error={erro ? true : false} size='small' value={email} onChange={e => setEmail(e.target.value)} placeholder="Novo Email" InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <EmailRoundedIcon fontSize='medium' />
                            </InputAdornment>
                        )
                    }} />
                    <TextField error={erro ? true : false} size='small' sx={{ paddingTop: '3%' }} value={email2} onChange={e => setEmail2(e.target.value)} placeholder="Confirmar Email" InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <MarkEmailReadRoundedIcon fontSize='medium' />
                            </InputAdornment>
                        )
                    }} />
                    <TextField error={erro ? true : false} size='small' sx={{ paddingTop: '3%' }} value={senha} onChange={e => setSenha(e.target.value)} placeholder="Senha" InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <VpnKeyRoundedIcon fontSize='medium' />
                            </InputAdornment>
                        )
                    }} />
                    <div onClick={e => Validate()} id='buttonPopUp' style={{ marginTop: '6.5%', height: '45px', fontSize: '1.2em' }} >
                        <p>Alterar</p>
                    </div >
                </div>
            </div>
        </PopUp>
    )

}