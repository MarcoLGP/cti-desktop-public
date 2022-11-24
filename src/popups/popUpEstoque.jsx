import React from 'react'
import PopUp from '../components/PopUp'
import ImageAvatar from '../components/imageAvatar'
import InputAdornment from '@mui/material/InputAdornment'
import GroupWorkRoundedIcon from '@mui/icons-material/GroupWorkRounded';
import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded';
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import './buttonPopUps.css'
import Dialog1 from './MuiDialog'
import Dialog2 from './MuiDialog2'

export default function PopUpFicha(props) {

    const [image, setImage] = React.useState('')
    const [produto, setProduto] = React.useState('')
    const [fornecedor, setFornecedor] = React.useState('')
    const [custo, setCusto] = React.useState()
    const [open1, setOpen1] = React.useState(false)
    const [open2, setOpen2] = React.useState(false)
    const [valor, setValor] = React.useState('')
    const [erro, setErro] = React.useState(false)
    const [erroText, setErroText] = React.useState('')
    const [unidades, setUnidades] = React.useState()

    function Validate() {
        if (!produto || !custo || !valor || !fornecedor) {
            setErroText('Campo(s) obrigatório(s) vazio(s)')
            setErro(true)
        } else if (isNaN(valor.replace(',' , '.' )) || isNaN(custo.replace(',' , '.' )) || isNaN(unidades.replace(',' , '.' ))) {
            setErro(true)
            setErroText('Apenas números nos campos de valores')
        } else if (valor < 0 || custo < 0 || unidades < 0) {
            setErroText('Valor(es) negativo(s)')
            setErro(true)
        } else {
            if(!produto.includes(' ')) setProduto(`${produto}`+` `)
            setErro(false)
            setErroText(null)
            setOpen1(true)
        }
    }

    return (
        <PopUp setOpen={props.setOpen} height={'515px'} >
            <Box
                component="form"
                sx={{
                    display: 'flex',
                    marginTop: '5%',
                    flexDirection: 'column',
                    '& .MuiTextField-root': { m: 0.7, width: '25ch', height: '15%' },
                }}
                noValidate
                autoComplete="off">
                <ImageAvatar marginLeft={'20%'} height={'150px'} width={'150px'} setOpen={setOpen2} preview={image} setPreview={setImage} />
                <div style={{ marginTop: '3%' }} />
                <TextField helperText={erroText} error={erro ? true : false} size='small' value={produto} onChange={e => setProduto(e.target.value)} placeholder="Produto" InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Inventory2RoundedIcon fontSize='medium' />
                        </InputAdornment>
                    ),
                }} />
                <TextField size='small' error={erro ? true : false} value={fornecedor} sx={{ maxWidth: '70%' }} onChange={e => setFornecedor(e.target.value)} placeholder="Fornecedor" InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <LocalShippingRoundedIcon fontSize='medium' />
                        </InputAdornment>
                    ),
                }} />

                <TextField size='small' error={erro ? true : false} sx={{ maxWidth: '60%' }} value={custo} onChange={e => setCusto(e.target.value)} placeholder="Custo Unitário" InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">R$</InputAdornment>
                    ),
                }} />

                <TextField sx={{ maxWidth: '50%' }} size='small' error={erro ? true : false} value={valor} placeholder='Valor Unitário' onChange={e => setValor(e.target.value)} InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">R$</InputAdornment>
                    )
                }} />

                <TextField sx={{ maxWidth: '40%' }} size='small' error={erro ? true : false} value={unidades} onChange={e => setUnidades(e.target.value)} placeholder='Unidades' InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <GroupWorkRoundedIcon fontSize='medium' />
                        </InputAdornment>
                    )
                }} />

                {open1 ? <Dialog1 context={'Estoque'} preview={image} produto={produto} fornecedor={fornecedor} custo={custo} valor={valor} unidades={unidades} setOpen2={props.setOpen} setOpen={setOpen1} open={open1} /> : null}
                {open2 ? <Dialog2 preview={image}  setPreview={setImage} open={open2} setOpen={setOpen2} /> : null}
            </Box>
            <div style={{ marginTop: erro ? '1%' : '3%' }} id='buttonPopUp' onClick={e => Validate()}>
                <p >Registrar</p>
            </div >
        </PopUp>
    )
}