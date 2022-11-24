import React from 'react'
import Content from '../components/Content'
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import BarraPesquisa from './BarraPesquisa'
import { mdiBarcode, mdiPackageVariantClosed } from '@mdi/js';
import WorkspacesRoundedIcon from '@mui/icons-material/WorkspacesRounded';
import Icon from '@mdi/react'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import './RegistrarProduto.css'
import { useNavigate } from 'react-router-dom';
import ImageAvatar from '../components/imageAvatar';
import { useSelector } from 'react-redux';
import { addDocument, deleteDocument } from '../firebase/firebase';
import tratamentoNome from '../utils/nomeTratamento';

export default function RegistrarProduto() {

    const [Img, setImg] = React.useState()
    const [erro, setErro] = React.useState(false)
    const [Produto, setProduto] = React.useState()
    const [Custo, setCusto] = React.useState()
    const [helper, setHelper] = React.useState()
    const [Codigo, setCodigo] = React.useState()
    const [sucess, setSucess] = React.useState()
    const [Valor, setValor] = React.useState()
    const navigate = useNavigate()
    const { codigoProd } = useSelector(state => state.requestSearch)

    function Validate() {
        if (!Produto || !Valor || !Codigo) {
            setErro(true)
            setHelper('Campo(s) obrigatório(s) vazio(s)')
        } else if (!Number(Valor.replace(',', '.')) || !Number(Custo.replace(',', '.'))) {
            setErro(true)
            setHelper('Valor(es) inválido(s)')
        } else {
            setSucess(true)
            setErro(false)
            addDocument({ Produto: tratamentoNome(Produto), Valor, Codigo, Img: Img ? Img : '', Custo }, 'Estoque')
            if (codigoProd) deleteDocument('CodProduto', codigoProd.idCodigo)
            const interval = setInterval(() => {
                setSucess(false)
                setProduto('')
                setValor('')
                setCusto('')
                setCodigo('')
                setHelper('')
                setImg('')
                clearInterval(interval)
            }, 1000)
        }
    }

    React.useEffect(() => {
        if (codigoProd) setCodigo(codigoProd.codigo)
    }, [codigoProd])

    return (
        <Content>
            <BarraPesquisa hidePesquisa titulo='Registrando produto' />
            <div id='containerRegistrarProduto'>
                <div id='boxRegistrarProduto' style={{ backgroundColor: sucess ? '#00962D' : null }}>
                    <ImageAvatar preview={Img} setImg={setImg} hideIcon={sucess} />
                    <TextField size='small' placeholder='Produto' error={erro} helperText={helper} value={Produto} onChange={e => setProduto(e.target.value)} sx={{ marginBottom: 1, marginTop: 3, width: '80%' }} InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Icon path={mdiPackageVariantClosed} size={1.1} />
                            </InputAdornment>)
                    }} />
                    <TextField size='small' placeholder='Codigo' error={erro} value={Codigo} onChange={e => setCodigo(e.target.value)} sx={{ marginBottom: 1, width: '60%' }} InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Icon path={mdiBarcode} size={1.1} />
                            </InputAdornment>)
                    }} />
                    <TextField size='small' placeholder='Valor' error={erro} value={Valor} onChange={e => setValor(e.target.value)} sx={{ marginBottom: 1, width: '50%' }} InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                R$
                            </InputAdornment>)
                    }} />
                    <TextField size='small' placeholder='Custo' error={erro} value={Custo} onChange={e => setCusto(e.target.value)} sx={{ marginBottom: 1, width: '40%' }} InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                R$
                            </InputAdornment>)
                    }} />
                    <div id='botaoAdicionar' style={{ marginTop: 20 }} onClick={() => Validate()}>
                        <p>Registrar</p>
                    </div>
                </div>
                <p id='closeButton' onClick={() => navigate(-1)}>
                    <KeyboardBackspaceRoundedIcon fontSize='large' />
                </p>
            </div>
        </Content>
    )

}