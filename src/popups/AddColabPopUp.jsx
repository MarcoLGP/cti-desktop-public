import PopUp from '../components/PopUp'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import BadgeIcon from '@mui/icons-material/Badge';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import { RegistrarUser } from '../firebase/firebase.js'
import MarkEmailReadRoundedIcon from '@mui/icons-material/MarkEmailReadRounded';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import EmailIcon from '@mui/icons-material/Email';
import './buttonPopUps.css'
import React from 'react'

export default function EditEmailPopUp(props) {

    const [colaborador, setColaborador] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [email2, setEmail2] = React.useState('')
    const [senha, setSenha] = React.useState('cti3808')
    const [erro, setErro] = React.useState(false)
    const [helper, setHelper] = React.useState('')

    function Validate() {
        if (!colaborador || !email || !senha) {
            setErro(true)
            setHelper('Campo(s) vazio(s)')
        } else if (!email.includes('@')) {
            setErro(true)
            setHelper('E-mail inválido')
        } else if (!colaborador.includes(' ')) {
            setErro(true)
            setHelper('É recomendado o sobrenome')
        } else if (email !== email2) {
            setErro(true)
            setHelper('E-mails não correspondentes')
        } else {
            RegistrarUser(colaborador, email, senha, setErro, setHelper, props.setOpen)
        }
    }

    return (
        <PopUp setOpen={props.setOpen} height={'500px'} marginTop={'1%'} >
            <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center', marginTop: '5%' }}>
                <div>
                    <PersonAddAlt1Icon sx={{ fontSize: 170, color: '#342B49', marginLeft: '8%' }} />
                    <TextField helperText={helper ? helper : null} error={erro ? true : false} size='small' sx={{ maxWidth: '70%' }} value={colaborador} onChange={e => setColaborador(e.target.value)} placeholder="Colaborador" InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <BadgeIcon fontSize='medium' />
                            </InputAdornment>
                        )
                    }} />
                    <TextField error={erro ? true : false} size='small' sx={{ maxWidth: '70%', paddingTop: '3%' }} value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <EmailIcon fontSize='medium' />
                            </InputAdornment>
                        )
                    }} />
                    <TextField error={erro ? true : false} size='small' sx={{ maxWidth: '70%', paddingTop: '3%' }} value={email2} onChange={e => setEmail2(e.target.value)} placeholder="Confirmar Email" InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <MarkEmailReadRoundedIcon fontSize='medium' />
                            </InputAdornment>
                        )
                    }} />
                    <TextField disabled size='small' sx={{ maxWidth: '70%', paddingTop: '3%' }} value={senha} onChange={e => setSenha(e.target.value)} placeholder="Senha" InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <VpnKeyRoundedIcon fontSize='medium' />
                            </InputAdornment>
                        )
                    }} />
                    <div onClick={e => Validate()} id='buttonPopUp' style={{ marginTop: '6.5%', height: '45px', fontSize: '1.2em' }} >
                        <p>Registrar</p>
                    </div >
                </div>
            </div>
        </PopUp>
    )
}