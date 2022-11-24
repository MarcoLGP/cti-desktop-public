import React from 'react'
import PopUp from '../components/PopUp'
import Checkbox from '@mui/material/Checkbox';
import DatePicker from '@mui/lab/DatePicker';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import OtherHousesRoundedIcon from '@mui/icons-material/OtherHousesRounded';
import AddRoadIcon from '@mui/icons-material/AddRoad';
import HomeWorkRoundedIcon from '@mui/icons-material/HomeWorkRounded';
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ImageAvatar from '../components/imageAvatar'
import InputAdornment from '@mui/material/InputAdornment'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import HomeRepairServiceRoundedIcon from '@mui/icons-material/HomeRepairServiceRounded';
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import brLocale from 'date-fns/locale/pt-BR'
import LaptopChromebookIcon from '@mui/icons-material/LaptopChromebook'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/semantic-ui.css'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
import './buttonPopUps.css'
import Dialog1 from './MuiDialog'
import Dialog2 from './MuiDialog2'

export default function PopUpFicha(props) {

    const [image, setImage] = React.useState('')
    const [nome, setNome] = React.useState('')
    const [equipamento, setEquipamento] = React.useState('')
    const [erroData, setErroData] = React.useState(false)
    const [numero, setNumero] = React.useState()
    const [email, setEmail] = React.useState('')
    const [telefone, setTelefone] = React.useState('')
    const [open1, setOpen1] = React.useState(false)
    const [open2, setOpen2] = React.useState(false)
    const [rua, setRua] = React.useState()
    const [check, setCheck] = React.useState(false)
    const [first, setFirst] = React.useState(0)
    const [servico, setServico] = React.useState('')
    const [prazo, setPrazo] = React.useState(new Date())
    const [erro, setErro] = React.useState(false)
    const [erroText, setErroText] = React.useState('')
    const [cidade, setCidade] = React.useState()
    const [endereco, setEndereco] = React.useState(false)
    const [qrCodeData, setQrCodeData] = React.useState('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAAAklEQVR4AewaftIAAAONSURBVO3BQY5bCRYDweSD7n/lHC96wdUHBMnVdg8j4i/M/OOYKcdMOWbKMVOOmXLMlGOmHDPlmCnHTDlmyjFTjplyzJRjprz4UBJ+kkpLQlN5koSm0pLQVJ4koam0JPwklU8cM+WYKcdMefFlKt+UhCcqn0hCU3mHyjtUvikJ33TMlGOmHDPlxW+WhHeo/CSVJ0loKi0JTeUdSXiHyu90zJRjphwz5cVfLgk/KQlN5b/kmCnHTDlmyov/GJWWhCdJeKLyJAlN5W92zJRjphwz5cVvpvJvUnmShKbSktBUmsonVP4kx0w5ZsoxU158WRL+JEloKt+UhKbyJAl/smOmHDPlmCkvPqTyJ1NpSWgq70hCU3mi8jc5ZsoxU46Z8uJDSWgq70hCU2lJ+CaVT6g8ScI3qTxJQlP5xDFTjplyzJQXH1JpSXiHSktCU2lJeEcS3qHSVJ4k4YnKkyQ0lSdJaCrfdMyUY6YcM+XFl6k8SUJLQlNpSXii8pOS0FQ+ofInOWbKMVOOmfLiy5LQVJpKS0JLQlN5koSm8kTlHUloKi0JTaUloam0JDSVloSfdMyUY6YcM+XFh5LwOyXhicoTlZaEptKS8A6VloQnSWgqLQlN5ScdM+WYKcdMefFlKk+S0FQ+kYSm8kSlJaGptCS0JDxRaUloKi0J70hCU/mmY6YcM+WYKfEXfqMk/JtUWhK+SaUl4YnKkyQ0lZ90zJRjphwzJf7Cb5SEptKS0FSeJOGbVFoSmkpLQlN5koQnKk+S0FR+p2OmHDPlmCkvPpSEb0rCE5VvSsI7VFoSPpGEpvIkCU9UPnHMlGOmHDMl/sJfLAlN5RNJeKLSktBU3pGEpvJvOmbKMVOOmfLiQ0n4SSrvSEJTeaLyTUloKk+S0FR+0jFTjplyzJQXX6byTUl4ovKJJDSVloSm8g6Vd6i0JDxR+aZjphwz5ZgpL36zJLxD5R1JeKLSktBUWhI+kYSflISm8oljphwz5ZgpL/5yKk+S0FRaEprKkyQ0lZaETyTh33TMlGOmHDPlxf+ZJDxJwhOVd6i0JDSVdyShqXzTMVOOmXLMlBe/mcqfTKUloam0JDSVd6i8Iwk/6Zgpx0w5ZsqLL0vCT0rCE5UnSfgmlSdJaCpPVFoSWhKayieOmXLMlGOmxF+Y+ccxU46ZcsyUY6YcM+WYKcdMOWbKMVOOmXLMlGOmHDPlmCnHTPkfI92VEPhJcgEAAAAASUVORK5CYII=')
    const [sendEmail, setSendEmail] = React.useState(false)
    const [bairro, setBairro] = React.useState()
    const fichaForm = React.useRef()

    function changeAddress() {
        if (first === 0) {
            setCidade('')
            setBairro('')
            setRua('')
        }
        setFirst(1)
        setEndereco(!endereco)
    }

    function Validate() {
        if (!nome || !equipamento || !servico) {
            setErroText('Campo(s) vazio(s)')
            setErro(true)
        } else if (!nome.includes(' ')) {
            setErro(true)
            setErroText('Sobrenome obrigatório')
        } else if (!telefone && !email) {
            setErroText('Telefone ou e-mail obrigatório')
            setErro(true)
        } else if (telefone || email) {
            if (telefone && telefone.lenght < 13) {
                setErroText('Telefone inválido')
                setErro(true)
            } else if (email && !email.includes('@')) {
                setErroText('E-mail inválido')
                setErro(true)
            } else {
                setErro(false)
                setErroText(null)
                setOpen1(true)
            }
        }
    }
    
    return (
        <PopUp height={endereco ? 480 : null} width={'405px'} setOpen={props.setOpen} >
            <p onClick={e => changeAddress()} style={{ position: 'absolute', marginTop: '0.7%', marginLeft: '2%' }} ><HomeWorkRoundedIcon sx={{ fontSize: 32 }} /></p>
            <Box
                component="form"
                ref={fichaForm}
                sx={{
                    display: 'flex',
                    marginTop: '5%',
                    flexDirection: 'column',
                    '& .MuiTextField-root': { m: 0.7, width: '25ch', height: '15%' },
                }}
                noValidate
                autoComplete="off">
                <ImageAvatar marginLeft={'23%'} height={'150px'} width={'150px'} setOpen={setOpen2} preview={image} setPreview={setImage} />
                <TextField value={qrCodeData} name='qrcode' sx={{ display: 'none' }} />
                <div style={{ marginTop: '3%' }} />
                {endereco ? <TextField helperText={erroText} error={erro ? true : false} size='small' value={cidade} onChange={e => setCidade(e.target.value)} placeholder="Cidade" InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <ApartmentRoundedIcon fontSize='medium' />
                        </InputAdornment>
                    ),
                }} /> : <TextField name='nome' helperText={erroText} error={erro ? true : false} size='small' value={nome} onChange={e => setNome(e.target.value)} placeholder="Cliente" InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <AssignmentIndIcon fontSize='medium' />
                        </InputAdornment>
                    ),
                }} />}
                {endereco ? <TextField size='small' error={erro ? true : false} value={bairro} sx={{ maxWidth: '70%' }} onChange={e => setBairro(e.target.value)} placeholder="Bairro" InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <HomeWorkRoundedIcon fontSize='medium' />
                        </InputAdornment>
                    ),
                }} /> : <TextField size='small' error={erro ? true : false} name='valor' value={equipamento} sx={{ maxWidth: '70%' }} onChange={e => setEquipamento(e.target.value)} placeholder="Equipamento" InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <LaptopChromebookIcon fontSize='medium' />
                        </InputAdornment>
                    ),
                }} />}
                {endereco ? <TextField size='small' error={erro ? true : false} value={rua} placeholder='Rua' onChange={e => setRua(e.target.value)} InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <AddRoadIcon fontSize={'medium'} />
                        </InputAdornment>
                    )
                }} /> : <TextField size='small' error={erro ? true : false} value={servico} placeholder='Defeito' onChange={e => setServico(e.target.value)} InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <HomeRepairServiceRoundedIcon fontSize={'medium'} />
                        </InputAdornment>
                    )
                }} />}
                {endereco ? <TextField size='small' error={erro ? true : false} value={numero} placeholder='Número' onChange={e => setNumero(e.target.value)} InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <OtherHousesRoundedIcon fontSize={'medium'} />
                        </InputAdornment>
                    )
                }} /> : <div style={{ display: 'flex', flexDirection: 'row' }} >
                    <div style={{ marginLeft: '12%' }} />
                    <LocalizationProvider dateAdapter={AdapterDateFns} locale={brLocale}>
                        <DatePicker
                            openTo='day'
                            onError={e => setErroData(true)}
                            disabled={check ? false : true}
                            label="Prazo"
                            value={check ? prazo : null}
                            onChange={e => check ? setPrazo(e) : null}
                            renderInput={(params) => <TextField disabled={check ? false : true} {...params} sx={{ maxWidth: 150 }} />}
                        />
                    </LocalizationProvider>
                    <Checkbox onChange={e => setCheck(!check)} icon={<CheckBoxOutlinedIcon />} checkedIcon={<CheckBoxIcon color='success' />} />
                </div>}
                {endereco ? null : <PhoneInput defaultErrorMessage={'Número inválido'} disableDropdown={true} value={telefone} country={'br'} onChange={e => setTelefone(e)} />}
                {endereco ? null : <TextField size='small' error={erro ? true : false} value={email} onChange={e => setEmail(e.target.value)} placeholder="E-mail" InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <AlternateEmailIcon fontSize='medium' />
                        </InputAdornment>
                    ),
                }} />}
                {open1 ? <Dialog1 rua={rua} setQrCodeData={setQrCodeData} sendEmail={sendEmail} setSendEmail={setSendEmail} cidade={cidade} bairro={bairro} numero={numero} prazo={check ? prazo : null} telefone={telefone} context={'Ficha'} preview={image} servico={servico} nome={nome} equipamento={equipamento} email={email} titulo={'Ficha de entrada'} setOpen2={props.setOpen} setOpen3={props.setOpenFichaFisicaConfirm} setOpen={setOpen1} open={open1} /> : null}
                {open2 ? <Dialog2 preview={image} setPreview={setImage} open={open2} setOpen={setOpen2} /> : null}
            </Box>
            <div style={{ marginTop: erro ? '2%' : '3%' }} id='buttonPopUp' onClick={e => Validate()}>
                <p style={{ marginBottom: erro ? '1%' : null }} >Registrar</p>
            </div >
        </PopUp>
    )
}