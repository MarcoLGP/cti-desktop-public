import PopUp from '../components/PopUp'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import BadgeIcon from '@mui/icons-material/Badge';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import EmailIcon from '@mui/icons-material/Email';
import './buttonPopUps.css'
import React from 'react'

export default function EditEmailPopUp(props) {

    const [colaborador, setColaborador] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [senha, setSenha] = React.useState('cti3808')

    return (
        <PopUp setOpen={props.setOpen} height={'450px'} marginTop={'5%'} >
            <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center', marginTop: '5%' }}>
                <div>
                    <PersonRemoveIcon sx={{ fontSize: 170, color: '#342B49', marginLeft: '5%' }} />
                    <TextField size='small' sx={{ maxWidth: '70%' }} value={colaborador} onChange={e => setColaborador(e.target.value)} placeholder="Colaborador" InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <BadgeIcon fontSize='medium' />
                            </InputAdornment>
                        )
                    }} />
                    <TextField size='small' sx={{ maxWidth: '70%', paddingTop: '3%' }} value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <EmailIcon fontSize='medium' />
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
                    <div id='buttonPopUp' style={{ marginTop: '6.5%', height: '45px', fontSize: '1.2em' }} >
                        <p>Registrar</p>
                    </div >
                </div>
            </div>
        </PopUp>
    )
}