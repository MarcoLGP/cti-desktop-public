import React from 'react'
import PopUpListaServ from './PopUpListaServ'
import PopUp from '../components/PopUp'
import CachedRoundedIcon from '@mui/icons-material/CachedRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import StoreMallDirectoryRoundedIcon from '@mui/icons-material/StoreMallDirectoryRounded';
import HomeRepairServiceRoundedIcon from '@mui/icons-material/HomeRepairServiceRounded';
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Avatar from '@mui/material/Avatar';
import AssignmentIndRoundedIcon from '@mui/icons-material/AssignmentIndRounded';
import LocalConvenienceStoreRoundedIcon from '@mui/icons-material/LocalConvenienceStoreRounded';
import Box from '@mui/material/Box'
import './popUpDashboard.css'
import './buttonPopUps.css'
import { useDispatch } from 'react-redux';
import { setListaServ } from '../redux/searchSlice';

export default function PopupDashboard(props) {

    const [nome, setNome] = React.useState('')
    const [Cpf, setCpf] = React.useState('')
    const [Cnpj, setCnpj] = React.useState('')
    const [Servico, setServico] = React.useState()
    const [changeCpf, setChangeCpf] = React.useState(false)
    const [Valor, setValor] = React.useState()
    const [erro, setErro] = React.useState(false)
    const [helper, setHelper] = React.useState('')
    const dispatch = useDispatch()

    function Validate() {
        if (!nome) {
            setErro(true)
            setHelper('Campo nome vazio')
        } else if (!nome.includes(' ')) {
            setErro(true)
            setHelper('Sobrenome obrigatório')
        } else if (isNaN(Valor.replace(',', '.'))) {
            setErro(true)
            setHelper('Apenas números no campo de valor')
        } else {
            setErro(false)
            setHelper('')
            props.setOpen(false)
        }
    }

    return (
        <PopUp setOpen={props.setOpen} height={'500px'} width={'410px'} >
            <Box
                component="form"
                sx={{
                    display: 'flex',
                    marginTop: '5%',
                    alignItems: 'center',
                    flexDirection: 'column',
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off">
                <Avatar sx={{ height: 150, width: 150 }} />
                <div style={{ marginTop: '3%' }} />
                <TextField size='small' helperText={helper} error={erro} value={nome} onChange={e => setNome(e.target.value)} placeholder={changeCpf ? 'Loja' : 'Nome Completo'} InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            {changeCpf ? <StoreMallDirectoryRoundedIcon fontSize='medium' /> : <PersonRoundedIcon fontSize='medium' />}
                        </InputAdornment>
                    ),
                }} />
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <TextField style={{ marginLeft: '10%' }} size='small' placeholder={changeCpf ? 'CNPJ' : 'CPF'} error={erro} value={changeCpf ? Cnpj : Cpf} onChange={e => changeCpf ? setCnpj(e.target.value) : setCpf(e.target.value)} sx={{ maxWidth: '80%' }} InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                {changeCpf ? <LocalConvenienceStoreRoundedIcon /> : <AssignmentIndRoundedIcon />}
                            </InputAdornment>
                        )
                    }} />
                    <p onClick={() => {
                        setChangeCpf(!changeCpf)
                        setCpf('')
                        setCnpj('')
                    }}>
                        <CachedRoundedIcon />
                    </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <TextField style={{ marginLeft: '15%' }} size='small' placeholder='Serviço' error={erro} value={Servico} onChange={e => setServico(e.target.value)} sx={{ maxWidth: '65%' }} InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <HomeRepairServiceRoundedIcon />
                            </InputAdornment>
                        )
                    }} />
                    <p onClick={() => {
                        dispatch(setListaServ({ Servico, Valor }))
                        setServico('')
                        setValor('')
                    }}>
                        <AddCircleRoundedIcon />
                    </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <TextField style={{ marginLeft: '28%' }} size='small' placeholder='1234,56' error={erro} value={Valor} onChange={e => setValor(e.target.value)} sx={{ maxWidth: '40%' }} label='Valor' InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">R$</InputAdornment>
                        )
                    }} />
                    <p onClick={() => {
                        props.setOpen(false)
                        props.setOpenListaServView(true)
                    }}>
                        <VisibilityRoundedIcon />
                    </p>
                </div>
                <div onClick={e => Validate()} id='buttonPopUp' style={{ marginTop: erro ? '3.5%' : '6%' }} >
                    <p>Gerar nota</p>
                </div >
            </Box>
        </PopUp>
    )
}