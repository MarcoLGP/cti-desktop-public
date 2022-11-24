import { Avatar, InputAdornment, TextField } from '@mui/material'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import AssignmentIndRoundedIcon from '@mui/icons-material/AssignmentIndRounded';
import AlternateEmailRoundedIcon from '@mui/icons-material/AlternateEmailRounded';
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';
import './buttonPopUps.css'
import CellphoneInput from 'react-phone-input-2'
import React from 'react'
import PopUp from '../components/PopUp'
import PrintNotaFiscal from './PopUpPrintNotaFiscal';
import { useSelector } from 'react-redux';
import { setDbData } from '../firebase/firebase';

export default function DadosClienteNota(props) {

    const [Nome, setNome] = React.useState('')
    const [Endereco, setEndereco] = React.useState('')
    const [idNota, setIdNota] = React.useState('')
    const [Cpf, setCpf] = React.useState('')
    const [Telefone, setTelefone] = React.useState('')
    const [openPrintNota, setOpenPrintNota] = React.useState(false)
    const [formPag, setFormPag] = React.useState('Dinheiro')
    const [Email, setEmail] = React.useState('')

    const { vendaAtiva } = useSelector(state => state.requestSearch)

    const handleGerarNota = () => {
        setOpenPrintNota(true)
        const Produtos = []
        vendaAtiva.forEach(({ Produto, Valor }) => Produtos.unshift({ Produto, Valor }))
        setDbData({Produtos, Nome, Endereco, Telefone, Cpf}, setIdNota)
    }

    return (
        <PopUp setOpen={props.setOpen} height={'540px'} width={'430px'}>
            <div>
                <Avatar style={{ height: 120, width: 120, marginLeft: '36%', marginTop: '5%' }} />
                <TextField sx={{ marginTop: '3%' }} size='small' value={Nome} onChange={e => setNome(e.target.value)} placeholder="Nome Completo" InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <PersonRoundedIcon fontSize='medium' />
                        </InputAdornment>
                    ),
                }} />
                <TextField sx={{ marginTop: '3%' }} size='small' value={Endereco} onChange={e => setEndereco(e.target.value)} placeholder="Endereco" InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <ApartmentRoundedIcon fontSize='medium' />
                        </InputAdornment>
                    ),
                }} />
                <TextField sx={{ marginTop: '3%' }} size='small' value={Email} onChange={e => setEmail(e.target.value)} placeholder="E-mail" InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <AlternateEmailRoundedIcon fontSize='medium' />
                        </InputAdornment>
                    ),
                }} />
                <TextField sx={{ marginTop: '3%', marginBottom: '2%' }} size='small' value={Cpf} onChange={e => setCpf(e.target.value)} placeholder="CPF" InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <AssignmentIndRoundedIcon fontSize='medium' />
                        </InputAdornment>
                    ),
                }} />
                <div>
                    <Select size='small' value={formPag} onChange={e => setFormPag(e.target.value)}>
                        <MenuItem value='Dinheiro'>Dinheiro</MenuItem>
                        <MenuItem value='Cartão Débito'>Cartão de Débito</MenuItem>
                        <MenuItem value='Cartão Crédito'>Cartão de Crédito</MenuItem>
                    </Select>
                </div>
                <CellphoneInput inputStyle={{ width: '230px' }} containerStyle={{ width: '230px', marginLeft: 'auto', marginRight: 'auto', marginTop: '2%' }} value={Telefone} country={'br'} onChange={e => setTelefone(e)} disableDropdown={true} />
                <div onClick={() => handleGerarNota()} style={{ marginTop: '5%' }} id='buttonPopUp'>
                    <p>Gerar nota</p>
                </div >
                <PrintNotaFiscal nome={Nome} id={idNota} formPag={formPag} endereco={Endereco} cpf={Cpf} telefone={Telefone} open={openPrintNota} setOpen={setOpenPrintNota} />
            </div>
        </PopUp>
    )

}