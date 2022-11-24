import React from 'react'
import Content from '../components/Content'
import TextField from '@mui/material/TextField'
import Icon from '@mdi/react'
import { mdiCardAccountDetails } from '@mdi/js'
import InputAdornment from '@mui/material/InputAdornment'
import FlatList from 'flatlist-react'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import StoreMallDirectoryRoundedIcon from '@mui/icons-material/StoreMallDirectoryRounded'
import KeyboardTabRoundedIcon from '@mui/icons-material/KeyboardTabRounded';
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import BarraPesquisa from './BarraPesquisa'
import { useNavigate } from 'react-router-dom'
import CachedRoundedIcon from '@mui/icons-material/CachedRounded';
import { mdiPackageVariantClosed } from '@mdi/js';
import LocalConvenienceStoreRoundedIcon from '@mui/icons-material/LocalConvenienceStoreRounded'
import FormControl from '@mui/material/FormControl';
import Avatar from '@mui/material/Avatar'
import MenuItem from '@mui/material/MenuItem';
import './RegistrarVenda.css'
import { setOpenPopUpVenda } from '../redux/searchSlice'
import ListaVenda from '../components/ListaVenda'
import InputLabel from '@mui/material/InputLabel';
import { addDocument } from '../firebase/firebase'
import { useSelector, useDispatch } from 'react-redux';
import { setAtvRec } from '../redux/searchSlice'
import RemoveShoppingCartRoundedIcon from '@mui/icons-material/RemoveShoppingCartRounded';
import Select from '@mui/material/Select';
import cnpjTratamento from '../utils/cnpjTratamento';
import cpfTratamento from '../utils/cpfTratamento';
import data from '../utils/data'
import consultaCnpj from 'consultar-cnpj'
import PrintNotaFiscal from '../popups/PopUpPrintNotaFiscal'
import tratamentoNome from '../utils/nomeTratamento'

export default function RegistrarVenda() {

    const [erro, setErro] = React.useState()
    const [Nome, setNome] = React.useState('')
    const [changeCpf, setChangeCpf] = React.useState(false)
    const [idDoc, setIdDoc] = React.useState()
    const [openPopUp, setOpenPopUp] = React.useState(false)
    const [FormPag, setFormPag] = React.useState()
    const [sucess, setSucess] = React.useState(false)
    const [emp, setEmp] = React.useState()
    const [Cpf, setCpf] = React.useState()
    const [Cnpj, setCnpj] = React.useState()
    const [Produto, setProduto] = React.useState()
    const [Valor, setValor] = React.useState()
    const [total, setTotal] = React.useState(0)
    const [helper, setHelper] = React.useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { vendaAtiva, openPopUpVenda } = useSelector(state => state.requestSearch)
    const { userInformation } = useSelector(state => state.login)

    React.useEffect(() => {
        let somaTotal = 0

        vendaAtiva.forEach(venda => somaTotal += Number(venda.Valor))

        setTotal(somaTotal)

    }, [vendaAtiva])

    async function consultarCnpj() {
        await consultaCnpj(Cnpj).then(emp => {
            setNome(emp.razao_social)
            setEmp(emp)
        })
    }

    function ValidarProduto() {
        if (!Produto || !Valor) {
            setErro(true)
            setHelper('Campo(s) vazio(s)')
        } else if (!Number(Valor.replace(',', '.'))) {
            setErro(true)
            setHelper('Valor inválido')
        }
        else {
            setErro(false)
            setHelper('')
            setSucess(true)
            addDocument({ Produto, Valor }, `VendaAtiva-${userInformation.uid}`)
            const interval = setInterval(() => {
                setSucess(false)
                setProduto('')
                setValor('')
                clearInterval(interval)
            }, 1000)
        }
    }

    React.useEffect(() => {
        if (openPopUpVenda) {
            ValidarVenda()
            dispatch(setOpenPopUpVenda(false))
        }
    }, [openPopUpVenda])

    function ValidarVenda() {
        if (!Nome || !Cnpj && !Cpf || !FormPag) {
            setErro(true)
            setHelper('Campo(s) vazio')
        } else if (!Nome.includes(' ')) {
            setErro(true)
            setHelper('Sobrenome Obrigatório')
        } else if (!cnpjTratamento(Cnpj, true) && Cnpj) {
            setErro(true)
            setHelper('CNPJ inválido')
        } else if (!cpfTratamento(Cpf, true) && Cpf) {
            setErro(true)
            setHelper('CPF inválido')
        } else {
            Cnpj ? setCnpj(cnpjTratamento(Cnpj)) : setCpf(cpfTratamento(Cpf))
            const newVenda = []
            vendaAtiva.forEach(doc => newVenda.unshift({ Produto: doc.Produto, Valor: doc.Valor }))
            if (Cnpj) {
                addDocument({ tipo: 'Venda', Produtos: newVenda, Nome: tratamentoNome(Nome), FormPag, Cnpj, total }, 'Registros', setIdDoc)
                dispatch(setAtvRec({ tipo: 'Venda', Produtos: newVenda, Nome: tratamentoNome(Nome), FormPag, Cnpj, Data: data(), total }))
            } else if (Cpf) {
                addDocument({ tipo: 'Venda', Produtos: newVenda, Nome: tratamentoNome(Nome), FormPag, Cpf, total }, 'Registros', setIdDoc)
                dispatch(setAtvRec({ tipo: 'Venda', Produtos: newVenda, Nome: tratamentoNome(Nome), FormPag, Cpf, Data: data(), total }))
            }
            setOpenPopUp(true)
        }
    }

    return (
        <Content>
            <BarraPesquisa hidePesquisa titulo='Registrando Venda' />
            {openPopUp ? <PrintNotaFiscal open={openPopUp} setOpen={setOpenPopUp} lista={vendaAtiva} FormPag={FormPag} Nome={Nome} emp={emp} Cpf={Cpf} Cnpj={Cnpj} idDoc={idDoc} total={total} /> : null}
            <div id='containerGerarNota'>
                <div id='left'>
                    <div id='formNotaServ' style={{ backgroundColor: sucess ? '#00962D' : null }}>
                        <Avatar style={styles.avatarStyle} />
                        <TextField size='small' error={erro} value={Nome} helperText={helper} onChange={e => setNome(e.target.value)} placeholder={changeCpf ? 'Empresa' : 'Nome Completo'} InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    {changeCpf ? <StoreMallDirectoryRoundedIcon fontSize='medium' /> : <PersonRoundedIcon fontSize='medium' />}
                                </InputAdornment>
                            ),
                        }} />
                        <div id='rowCpfCnpj'>
                            <TextField size='small' placeholder={changeCpf ? 'CNPJ' : 'CPF'} onKeyDown={e => changeCpf ? e.key == 'Enter' ? consultarCnpj() : null : null} error={erro} value={changeCpf ? Cnpj : Cpf} onChange={e => changeCpf ? setCnpj(e.target.value) : setCpf(e.target.value)} sx={{ maxWidth: '70%', marginLeft: '10%' }} InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        {changeCpf ? <LocalConvenienceStoreRoundedIcon /> : <Icon size={1} path={mdiCardAccountDetails} />}
                                    </InputAdornment>
                                )
                            }} />
                            <p style={{ marginLeft: 5, cursor: 'pointer' }} onClick={() => {
                                setChangeCpf(!changeCpf)
                                setCpf('')
                                setCnpj('')
                            }}>
                                <CachedRoundedIcon />
                            </p>
                        </div>
                        <FormControl error={erro} size='small' sx={{ minWidth: '72%', maxWidth: '72%', marginBottom: 1 }}>
                            {FormPag ? null : <InputLabel id='selectFormPag'>Forma de Pagamento</InputLabel>}
                            <Select labelId='selectFormPag' value={FormPag} onChange={e => setFormPag(e.target.value)}>
                                <MenuItem value='Cartão débito'>Cartão débito</MenuItem>
                                <MenuItem value='Cartão crédito'>Cartão crédito</MenuItem>
                                <MenuItem value='Dinheiro'>Dinheiro</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField size='small' placeholder='Produto' error={erro} value={Produto} onChange={e => setProduto(e.target.value)} sx={{ maxWidth: '65%', marginBottom: 1 }} InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Icon size={1} path={mdiPackageVariantClosed} />
                                </InputAdornment>
                            )
                        }} />
                        <TextField size='small' placeholder='Valor' error={erro} value={Valor} onChange={e => setValor(e.target.value)} sx={{ maxWidth: '45%' }} InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">R$</InputAdornment>
                            )
                        }} />
                        <div id='botaoAdicionar' style={{ marginTop: 15 }} onClick={() => ValidarProduto()}>
                            <p>Adicionar</p>
                        </div>
                    </div>
                    <p id='backButton' onClick={() => navigate(-1)}>
                        <KeyboardBackspaceRoundedIcon fontSize='large' />
                    </p>
                </div>
                <div id='right'>
                    <FlatList
                        list={vendaAtiva}
                        wrapperHtmlTag="div"
                        renderWhenEmpty={() => <div id='listaVazia'>
                            <RemoveShoppingCartRoundedIcon sx={styles.iconCart} />
                            <p>Sem produtos por enquanto!</p>
                        </div>}
                        renderItem={(item) => ListaVenda(item, userInformation)}
                        id='ListaVenda'
                    />
                    {vendaAtiva.length > 0 ? <div id='contTotalVenda'>
                        <div id='totalVenda'>
                            <p>Total: </p>
                            <p id='valorVenda'>{`R$ ${total}`}</p>
                        </div>
                        <p style={{ cursor: 'pointer' }} onClick={() => ValidarVenda()}>
                            <KeyboardTabRoundedIcon fontSize='large' />
                        </p>
                    </div> :
                        null}
                </div>
            </div>
        </Content>
    )

}

const styles = {
    avatarStyle: {
        marginBottom: 20,
        height: 150,
        width: 150
    },
    iconCart: {
        color: '#342B49',
        fontSize: 80
    }
} 