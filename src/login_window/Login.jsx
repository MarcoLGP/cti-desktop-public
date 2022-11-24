import React from 'react'
import './Login.css'
import TextField from '@mui/material/TextField';
import { LoginUser } from '../firebase/firebase.js'
import Titlebar from '../components/TitleBar'
import EmailIcon from '@mui/icons-material/Email';
import InputAdornment from '@mui/material/InputAdornment';
import LogoImg from '../assets/logo-cti.png'
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import LoginIcon from '@mui/icons-material/Login';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Login() {

  const [email, setEmail] = React.useState('')
  const [senha, setSenha] = React.useState('')
  const [helper, setHelper] = React.useState(false)
  const [click, setClick] = React.useState(false)
  const [erro, setErro] = React.useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  return (
    <React.Fragment>
      <Titlebar tirarMax={true} />
      <div id="windowLogin" onKeyDown={e => e.key == 'Enter' ? LoginUser(email, senha, setErro, setHelper, true, null, navigate, setSenha) : null}>
        <div id='bannerBox'>
          <img src={LogoImg} />
          <h1>CTI informática</h1>
        </div>
        <div id='loginBox'>
          <h1>Entrar</h1>
          <Box
            component="form"
            sx={{
              marginTop: '5%',
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off">
            <div id='FormLogin'>
              <TextField helper={helper ? helper : null} placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} error={erro ? true : false} InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon fontSize='medium' />
                  </InputAdornment>
                ),
              }} />
              <TextField error={erro ? true : false} helperText={erro ? helper : null} type={click ? 'text' : 'password'} sx={{ maxWidth: '70%' }} value={senha} onChange={e => setSenha(e.target.value)} placeholder="Senha" InputProps={{
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
            </div>
          </Box>
          <IconButton onClick={(e) => {
            LoginUser(email, senha, setErro, setHelper, true, null, navigate, setSenha)
          }}>
            <LoginIcon id='entrarButton' sx={{ color: 'black', fontSize: 50 }} />
          </IconButton>
        </div>
      </div>
    </React.Fragment>
  )
}