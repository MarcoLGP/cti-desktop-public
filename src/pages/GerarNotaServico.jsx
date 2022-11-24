import React from 'react'
import Content from '../components/Content'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import data from '../utils/data'
import HomeRepairServiceRoundedIcon from '@mui/icons-material/HomeRepairServiceRounded'
import FlatList from 'flatlist-react'
import { mdiPackageVariantClosed } from '@mdi/js'
import Icon from '@mdi/react'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import StoreMallDirectoryRoundedIcon from '@mui/icons-material/StoreMallDirectoryRounded'
import KeyboardTabRoundedIcon from '@mui/icons-material/KeyboardTabRounded';
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import BarraPesquisa from './BarraPesquisa'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CachedRoundedIcon from '@mui/icons-material/CachedRounded';
import AssignmentIndRoundedIcon from '@mui/icons-material/AssignmentIndRounded'
import LocalConvenienceStoreRoundedIcon from '@mui/icons-material/LocalConvenienceStoreRounded'
import Avatar from '@mui/material/Avatar'
import { addDocument, deleteDocument } from '../firebase/firebase'
import MoneyOffCsredRoundedIcon from '@mui/icons-material/MoneyOffCsredRounded';
import './GerarNotaServico.css'
import ListaNota from '../components/ListaNota'
import { setAtvRec, setOpenPopUpNota, setIdDone } from '../redux/searchSlice'
import consultaCnpj from 'consultar-cnpj'
import PrintNotaFiscal from '../popups/PopUpPrintNotaFiscal';
import tratamentoNome from '../utils/nomeTratamento';

export default function GerarNota() {

    const [erro, setErro] = React.useState()
    const [Nome, setNome] = React.useState()
    const [changeCpf, setChangeCpf] = React.useState(false)
    const [changeProduto, setChangeProduto] = React.useState(false)
    const [openPopUp, setOpenPopUp] = React.useState(false)
    const [Produto, setProduto] = React.useState()
    const [helper, setHelper] = React.useState('')
    const [FormPag, setFormPag] = React.useState('')
    const [Cpf, setCpf] = React.useState()
    const [total, setTotal] = React.useState(0)
    const [emp, setEmp] = React.useState()
    const [Cnpj, setCnpj] = React.useState()
    const [Servico, setServico] = React.useState()
    const [Valor, setValor] = React.useState()
    const [idDoc, setIdDoc] = React.useState()
    const [sucess, setSucess] = React.useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { listaNota, openPopUpNota } = useSelector(state => state.requestSearch)
    const { userInformation } = useSelector(state => state.login)

    React.useEffect(() => {
        let somaTotal = 0

        listaNota.forEach(venda => somaTotal += Number(venda.Valor.replace(',', '.')))

        setTotal(somaTotal)

    }, [listaNota])

    React.useEffect(() => {
        if (openPopUpNota) {
            ValidarNota()
            dispatch(setOpenPopUpNota(false))
        }
    },[openPopUpNota])

    async function consultarCnpj() {
        await consultaCnpj(Cnpj).then(emp => {
            setNome(emp.razao_social)
            setEmp(emp)
        })
    }

    function ValidarProdutoServ() {
        if (!Servico && !Produto || !Valor) {
            setErro(true)
            setHelper('Campo(s) vazio(s)')
        } else if (!Number(Valor.replace(',', '.'))) {
            setErro(true)
            setHelper('Valor inválido')
        } else {
            setErro(false)
            setHelper('')
            setSucess(true)
            const interval = setInterval(() => {
                setSucess(false)
                setProduto('')
                setValor('')
                setServico('')
                clearInterval(interval)
            }, 1000)
            Produto ? addDocument({ Produto, Valor }, `NotaAtiva-${userInformation.uid}`) : addDocument({ Servico, Valor }, `NotaAtiva-${userInformation.uid}`)
        }
    }

    function ValidarNota() {
        if (!Nome && !Cpf || !Nome && !Cnpj || !Cnpj && !Cpf || !FormPag) {
            setErro(true)
            setHelper('Campo(s) vazio(s)')
        } else {
            const newNota = []
            listaNota.forEach(doc => {
                doc.Produto ? newNota.unshift({ Produto: doc.Produto, Valor: doc.Valor }) : newNota.unshift({ Servico: doc.Servico, Valor: doc.Valor })
                deleteDocument('NotaAtiva', doc.idColl)
            })
            if (Cpf) {
                dispatch(setAtvRec({ tipo: 'Nota', Data: data(), Nome: tratamentoNome(Nome), Cpf, FormPag, Nota: newNota, total }))
                addDocument({ tipo: 'Nota', Nota: newNota, Nome: tratamentoNome(Nome), FormPag, Cpf, Data: data(), total }, 'Registros', setIdDoc)
            }
            else if (Cnpj) {
                dispatch(setAtvRec({ tipo: 'Nota', Data: data(), Nome: tratamentoNome(Nome), Cnpj, FormPag, Nota: newNota, total }))
                addDocument({ tipo: 'Nota', Nota: newNota, Nome: tratamentoNome(Nome), FormPag, Cnpj, Data: data(), total }, 'Registros', setIdDoc)
            }
            setOpenPopUp(true)
        }
    }

    return (
        <Content>
            <BarraPesquisa hidePesquisa titulo='Gerando nota fiscal' />
            {openPopUp ? <PrintNotaFiscal open={openPopUp} setOpen={setOpenPopUp} nota={true} lista={listaNota} FormPag={FormPag} Nome={Nome} emp={emp} Cpf={Cpf} Cnpj={Cnpj} idDoc={idDoc} total={total} /> : null}
            <div id='containerGerarNota'>
                <div id='left'>
                    <div id='formNotaServ' style={{ backgroundColor: sucess ? '#00962D' : null }}>
                        <Avatar style={styles.avatarStyle} />
                        <TextField size='small' error={erro} helperText={helper} value={Nome} onChange={e => setNome(e.target.value)} placeholder={changeCpf ? 'Empresa' : 'Nome Completo'} InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    {changeCpf ? <StoreMallDirectoryRoundedIcon fontSize='medium' /> : <PersonRoundedIcon fontSize='medium' />}
                                </InputAdornment>
                            ),
                        }} />
                        <div id='rowCpfCnpj'>
                            <TextField style={{ marginLeft: '10%' }} size='small' onKeyDown={e => changeCpf ? e.key == 'Enter' ? consultarCnpj() : null : null} placeholder={changeCpf ? 'CNPJ' : 'CPF'} error={erro} value={changeCpf ? Cnpj : Cpf} onChange={e => changeCpf ? setCnpj(e.target.value) : setCpf(e.target.value)} sx={{ maxWidth: '70%' }} InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        {changeCpf ? <LocalConvenienceStoreRoundedIcon /> : <AssignmentIndRoundedIcon />}
                                    </InputAdornment>
                                )
                            }} />
                            <p style={{ marginLeft: 5 }} onClick={() => {
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
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <TextField size='small' placeholder={changeProduto ? 'Produto' : 'Serviço'} error={erro} value={changeProduto ? Produto : Servico} onChange={e => changeProduto ? setProduto(e.target.value) : setServico(e.target.value)} sx={{ maxWidth: '65%', marginBottom: 1, marginLeft: 3.5 }} InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        {changeProduto ? <Icon path={mdiPackageVariantClosed} size={1.1} /> : <HomeRepairServiceRoundedIcon />}
                                    </InputAdornment>
                                )
                            }} />
                            <p style={{ marginLeft: 5 }} onClick={() => setChangeProduto(!changeProduto)}>
                                <CachedRoundedIcon />
                            </p>
                        </div>
                        <TextField size='small' placeholder='Valor' error={erro} value={Valor} onChange={e => setValor(e.target.value)} sx={{ maxWidth: '45%' }} InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">R$</InputAdornment>
                            )
                        }} />
                        <div id='botaoAdicionar' style={{ marginTop: 20 }} onClick={() => ValidarProdutoServ()}>
                            <p>Adicionar</p>
                        </div>
                    </div>
                    <p id='backButton' onClick={() => navigate(-1)}>
                        <KeyboardBackspaceRoundedIcon fontSize='large' />
                    </p>
                </div>
                <div id='right'>
                    <FlatList
                        list={listaNota}
                        wrapperHtmlTag="div"
                        renderItem={(item) => ListaNota(item, userInformation)}
                        renderWhenEmpty={() => <div id='listaVazia'>
                            <MoneyOffCsredRoundedIcon sx={styles.iconNota} />
                            <p>Nota vazia por enquanto!</p>
                        </div>}
                        id='ListaNota'
                    />
                    {listaNota.length > 0 ? <div id='contTotalVenda'>
                        <div id='totalVenda'>
                            <p>Total: </p>
                            <p id='valorVenda'>{`R$ ${total}`}</p>
                        </div>
                        <p onClick={() => ValidarNota()} style={{ cursor: 'pointer' }}>
                            <KeyboardTabRoundedIcon fontSize='large' />
                        </p>
                    </div> : null}
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
    iconNota: {
        color: '#342B49',
        fontSize: 80
    }
}
