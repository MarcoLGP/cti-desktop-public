import React from 'react'
import PopUp from '../components/PopUp'
import { getDBpass } from '../firebase/firebase.js'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';
import IconButton from '@mui/material/IconButton';
import './ConfigAdminPass.css'
import './buttonPopUps.css'


export default function ConfigAdminPass(props) {

    const [pass, setPass] = React.useState('')
    const [click, setClick] = React.useState(false)
    const [erro, setErro] = React.useState(false)
    const [helperText, setHelperText] = React.useState('')

    function Validate() {
        if (!pass) {
            setErro(true)
            setHelperText('Campo Vazio')
        } else {
            getDBpass('Password', pass, props.setAuth, setErro, props.setOpen, setHelperText)
        }
    }

    return (
        <PopUp setOpen={props.setOpen} height={'320px'} marginTop={'5%'} >
            <div id='content'>
                <div>
                    <AdminPanelSettingsRoundedIcon sx={{ fontSize: 170, color: '#342B49', marginLeft: '7%' }} />
                    <TextField error={erro ? true : false} helperText={erro ? helperText : null} type={click ? 'text' : 'password'} size='small' sx={{ width: 300 }} value={pass} onChange={e => setPass(e.target.value)} placeholder="Senha" InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <VpnKeyRoundedIcon fontSize='medium' />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={e => setClick(!click)}>
                                    {click ? <VisibilityRoundedIcon fontSize='medium' />
                                        : <VisibilityOffRoundedIcon fontSize='medium' />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }} />
                    <div onClick={e => Validate()} id='buttonPopUp' style={{ marginTop: erro ? '2%' : '6.5%', height: '45px'}} >
                        <p>Desbloquear</p>
                    </div >
                </div>
            </div>
        </PopUp>
    )
}