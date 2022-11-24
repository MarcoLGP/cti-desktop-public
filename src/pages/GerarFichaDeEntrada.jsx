import React from 'react'
import Content from '../components/Content'
import { mdiHomeGroup } from '@mdi/js';
import Icon from '@mdi/react'
import BarraPesquisa from './BarraPesquisa'
import Avatar from '@mui/material/Avatar'
import AlternateEmailRoundedIcon from '@mui/icons-material/AlternateEmailRounded';
import IconButton from '@mui/material/IconButton';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import KeyboardTabRoundedIcon from '@mui/icons-material/KeyboardTabRounded';
import { parse, format } from 'telefone'
import AddRoadRoundedIcon from '@mui/icons-material/AddRoadRounded';
import OtherHousesRoundedIcon from '@mui/icons-material/OtherHousesRounded';
import HomeRepairServiceRoundedIcon from '@mui/icons-material/HomeRepairServiceRounded';
import InputAdornment from '@mui/material/InputAdornment'
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';
import LocationCityRoundedIcon from '@mui/icons-material/LocationCityRounded';
import BusinessCenterRoundedIcon from '@mui/icons-material/BusinessCenterRounded';
import TextField from '@mui/material/TextField'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import { useNavigate } from 'react-router-dom'
import './GerarFichaDeEntrada.css'
import validarEmail from '../utils/validadorEmail';
import buscarCep from '../utils/buscarCep';
import { addFicha } from '../firebase/firebase';
import data from '../utils/data';
import tratamentoNome from '../utils/nomeTratamento';
import FichaFisicaConfirm from '../popups/PopUpFichaFisicaConfirm';

export default function GerarFicha() {

    const [Nome, setNome] = React.useState('')
    const [Problema, setProblema] = React.useState('')
    const [Equipamento, setEquipamento] = React.useState('')
    const navigate = useNavigate()
    const [Cidade, setCidade] = React.useState('')
    const [Telefone, setTelefone] = React.useState('')
    const [Email, setEmail] = React.useState('')
    const [Bairro, setBairro] = React.useState('')
    const [helper, setHelper] = React.useState()
    const [Rua, setRua] = React.useState('')
    const [Numero, setNumero] = React.useState('')
    const [erro, setErro] = React.useState(false)
    const [Cep, setCep] = React.useState('')
    const [resCep, setResCep] = React.useState('')
    const [erroCep, setErroCep] = React.useState(false)
    const [sucess, setSucess] = React.useState(false)
    const [Senha, setSenha] = React.useState('')
    const [fail, setFail] = React.useState(false)
    const [mostEnd, setMostEnd] = React.useState(false)
    const [fichaId, setFichaId] = React.useState()
    const [openPopUp, setOpenPopUp] = React.useState()
    const [helperCep, setHelperCep] = React.useState('')

    function onFail(helper, cep) {
        setFail(true)
        cep ? setHelperCep('') : setHelper('')
        const interval = setInterval(() => {
            setFail(false)
            clearInterval(interval)
            if (cep) {
                setErroCep(true)
                setHelperCep(helper)
            } else {
                setErro(true)
                setHelper(helper)
            }
        }, 1000)
    }

    function ValidateDados() {
        if (!Nome || !Problema || !Equipamento) onFail('Campo(s) vazio(s).')
        else if (!Telefone && !Email) onFail('E-mail ou telefone obrigatório.')
        else if (Email && !validarEmail(Email)) onFail('E-mail inválido.')
        else if (Telefone && !parse(Telefone)) onFail('Telefone inválido.')
        else {
            setHelper('')
            setErro(false)
            setSucess(true)
            !Bairro && !Cidade && !Rua && !Numero ? addFicha({ Nome: tratamentoNome(Nome), Problema, Equipamento, Email, Telefone: format(Telefone), Senha, Data: `${data()}` }, setFichaId) : addFicha({ Nome, Problema, Equipamento, Email, Telefone: format(Telefone), Senha, Data: `${data()}`, Bairro, Cidade, Rua, Numero }, setFichaId)
            const interval = setInterval(() => {
                setSucess(false)
                clearInterval(interval)
                setOpenPopUp(true)
            }, 1000)
        }
    }

    const styles = {
        imgStyle: {
            height: 180,
            width: 180
        },
        textfields: {
            maxWidth: '70%',
            marginBottom: 1,
            marginLeft: '8.5%'
        },
        boxForm: {
            backgroundColor: sucess ? '#00962D' : fail ? '#AA242C' : null,
            color: sucess || fail ? '#fff' : null
        }

    }

    React.useEffect(() => {
        if (resCep) {
            if (!resCep.city && !resCep.street && !resCep.neighborhood) onFail('CEP inválido!', true)
            else {
                setMostEnd(true)
                setErroCep(false)
                setHelperCep('')
                setBairro(resCep.neighborhood)
                setCidade(resCep.city)
                setRua(resCep.street)
            }
        }
    }, [resCep])

    function handleClearButton() {
        if (mostEnd || Cep) {
            setErroCep(false)
            setHelperCep('')
            setRua('')
            setCidade('')
            setBairro('')
            setNumero('')
            setCep('')
        } else setMostEnd(true)
    }

    return (
        <Content>
            <BarraPesquisa hidePesquisa titulo='Gerando ficha de entrada' />
            {openPopUp ? <FichaFisicaConfirm telefone={Telefone} fichaId={fichaId} nome={Nome} problema={Problema} equipamento={Equipamento} open={openPopUp} setOpen={setOpenPopUp} /> : null}
            <div id='containerGerarFicha'>
                <div id='boxForm' style={styles.boxForm}>
                    <Avatar sx={styles.imgStyle} />
                    <div id='formContainer'>
                        <div>
                            <TextField size='small' placeholder='Nome Sobrenome' helperText={helper} error={erro} value={Nome} onChange={e => setNome(e.target.value)} sx={{ maxWidth: '80%', marginBottom: 1 }} InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonRoundedIcon />
                                    </InputAdornment>
                                )
                            }} />
                            <TextField size='small' placeholder='Equipamento' error={erro} value={Equipamento} onChange={e => setEquipamento(e.target.value)} sx={{ maxWidth: '80%', marginBottom: 1 }} InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <BusinessCenterRoundedIcon />
                                    </InputAdornment>
                                )
                            }} />
                            <TextField size='small' placeholder='Problema' error={erro} value={Problema} onChange={e => setProblema(e.target.value)} sx={{ maxWidth: '80%', marginBottom: 1 }} InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <HomeRepairServiceRoundedIcon />
                                    </InputAdornment>
                                )
                            }} />
                            <TextField size='small' placeholder='Email' error={erro} value={Email} onChange={e => setEmail(e.target.value)} sx={{ maxWidth: '80%', marginBottom: 1 }} InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AlternateEmailRoundedIcon />
                                    </InputAdornment>
                                )
                            }} />
                            <TextField size='small' placeholder='Telefone' error={erro} value={Telefone} onChange={e => setTelefone(e.target.value)} sx={{ maxWidth: '80%', marginBottom: 1 }} InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LocalPhoneRoundedIcon />
                                    </InputAdornment>
                                )
                            }} />
                            <TextField size='small' placeholder='Senha' error={erro} value={Senha} onChange={e => setSenha(e.target.value)} sx={{ maxWidth: '80%', marginBottom: 1 }} InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <KeyRoundedIcon />
                                    </InputAdornment>
                                )
                            }} />
                        </div>
                        <div>
                            <div id='cepField'>
                                <TextField size='small' placeholder='CEP' error={erroCep} helperText={helperCep} value={Cep} onChange={e => setCep(e.target.value)} sx={[styles.textfields, { marginLeft: 'auto' }]} InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LocationOnRoundedIcon />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <IconButton onClick={() => buscarCep(Cep, setResCep)}>
                                                <ArrowCircleRightRoundedIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }} />
                                <p onClick={() => handleClearButton()}>
                                    <CloseRoundedIcon />
                                </p>
                            </div>
                            {mostEnd ?
                                <React.Fragment>
                                    <TextField size='small' placeholder='Bairro' error={erroCep} value={Bairro} onChange={e => setBairro(e.target.value)} sx={styles.textfields} InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Icon path={mdiHomeGroup} size={1} />
                                            </InputAdornment>
                                        )
                                    }} />
                                    <TextField size='small' placeholder='Cidade' error={erroCep} value={Cidade} onChange={e => setCidade(e.target.value)} sx={styles.textfields} InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LocationCityRoundedIcon />
                                            </InputAdornment>
                                        )
                                    }} />
                                    <TextField size='small' placeholder='Rua' error={erroCep} value={Rua} onChange={e => setRua(e.target.value)} sx={styles.textfields} InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AddRoadRoundedIcon />
                                            </InputAdornment>
                                        )
                                    }} />
                                    <TextField size='small' placeholder='Número' error={erroCep} value={Numero} onChange={e => setNumero(e.target.value)} sx={styles.textfields} InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <OtherHousesRoundedIcon />
                                            </InputAdornment>
                                        )
                                    }} />
                                </React.Fragment> : null}
                        </div>
                    </div>
                </div>
                <div id='buttons'>
                    <p onClick={() => navigate(-1)}>
                        <KeyboardBackspaceRoundedIcon fontSize='large' />
                    </p>
                    <p style={{ marginTop: 5 }} onClick={() => ValidateDados()}>
                        <KeyboardTabRoundedIcon fontSize='large' />
                    </p>
                </div>
            </div>
        </Content>
    )
}