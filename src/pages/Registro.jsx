import React from 'react'
import './Dashboard.css'
import Content from '../components/Content'
import BarraPesquisa from './BarraPesquisa'
import { useNavigate } from 'react-router-dom'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import FlatList from 'flatlist-react'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ListaRegistro from '../components/ListaRegistros'
import Icon from '@mdi/react';
import { mdiDatabaseSearch, mdiDatabaseEye, mdiDatabaseArrowUp } from '@mdi/js';
import Grid from '../components/grid_inicio'
import { useDispatch, useSelector } from 'react-redux'
import { setRegistroPesquisa, setTodosRegistros } from '../redux/searchSlice'
import SearchOffRoundedIcon from '@mui/icons-material/SearchOffRounded';
import { consultaDbRegistro } from '../firebase/firebase'
import tratamentoNome from '../utils/nomeTratamento'

export default function Registro() {

        const [muda, setMuda] = React.useState(1)
        const [filtro, setFiltro] = React.useState('Todas')
        const [submit, setSubmit] = React.useState(false)
        const [search, setSearch] = React.useState('')
        const dispatch = useDispatch()
        const navigate = useNavigate()
        const { registro, registroPesquisa, todosRegistros } = useSelector(state => state.requestSearch)

        function mudarFiltroBusca() {
                setMuda(muda + 1)
                if (muda == 1) setFiltro('Venda')
                else if (muda == 2) setFiltro('Ficha')
                else if (muda == 3) setFiltro('Nota')
                else if (muda == 4) {
                        setMuda(1)
                        setFiltro('Todas')
                }
        }

        function filtroRegister() {
                if (filtro !== 'Todas') return registro.filter(reg => reg.tipo == filtro && reg.Nome.toLowerCase().includes(search.toLowerCase()))
                else return registro.filter(reg => reg.Nome.toLowerCase().includes(search.toLowerCase()))
        }

        return (
                <Content>
                        <BarraPesquisa submit search={search} setSearch={setSearch} onSubmit={() => {
                                if (registroPesquisa.length > 0) dispatch(setRegistroPesquisa('limpar'))
                                consultaDbRegistro(filtro, tratamentoNome(search), dispatch, setRegistroPesquisa)
                                setSubmit(true)
                        }} />
                        <div id='container'>
                                <div>
                                        <Grid text={'Filtar busca:'} text2={filtro} onClick={() => mudarFiltroBusca()}>
                                                <Icon path={mdiDatabaseSearch} size={3.5} />
                                        </Grid>
                                        <Grid text='Todos' text2={'Registros'} onClick={() => {
                                                dispatch(setTodosRegistros(true))
                                                setSubmit(false)
                                        }}>
                                                <Icon path={mdiDatabaseEye} size={3.5} />
                                        </Grid>
                                        <Grid text='Exportar' text2={'Registros'}>
                                                <Icon path={mdiDatabaseArrowUp} size={3.5} />
                                        </Grid>
                                </div>
                                <div style={containerLista}>
                                        <FlatList
                                                list={submit ? registroPesquisa : todosRegistros ? filtroRegister() : registro}
                                                renderWhenEmpty={() =>
                                                        submit || todosRegistros ?
                                                                <div id='buscaStatus'>
                                                                        <SearchOffRoundedIcon style={{ fontSize: 90, color: '#342B49' }} />
                                                                        <p>Nenhum registro encontrado!</p>
                                                                </div>
                                                                :
                                                                <div id='buscaStatus'>
                                                                        <SearchRoundedIcon style={{ fontSize: 90, color: '#342B49' }} />
                                                                        <p>Busca nos registros</p>
                                                                </div>
                                                }
                                                wrapperHtmlTag="div"
                                                id='ListaPesquisaRegistro'
                                                renderItem={item => ListaRegistro(item, dispatch, navigate)}
                                        />
                                        {submit ?
                                                registroPesquisa.length > 0 ?
                                                        <p style={{cursor: 'pointer'}} onClick={() => {
                                                                setSubmit(false)
                                                                dispatch(setRegistroPesquisa('limpar'))
                                                        }}>
                                                                <CloseRoundedIcon fontSize='large' />
                                                        </p>
                                                : null : null}
                                </div>
                        </div>
                </Content >
        )
}

const containerLista = {
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center'
        }