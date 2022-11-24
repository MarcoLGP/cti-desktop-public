import React from 'react'
import BarraPesquisa from './BarraPesquisa'
import Content from '../components/Content'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Icon from '@mdi/react'
import { mdiPackageVariantClosed, mdiPackageVariantClosedPlus, mdiPackageVariant } from '@mdi/js';
import Grid from '../components/grid_inicio';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import SearchOffRoundedIcon from '@mui/icons-material/SearchOffRounded';
import FlatList from 'flatlist-react'
import './Dashboard.css'
import ListaEstoque from '../components/ListaEstoque';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { setEstoquePesquisa, setTodosEstoque } from '../redux/searchSlice';
import { consultaDb } from '../firebase/firebase';
import tratamentoNome from '../utils/nomeTratamento';

export default function Estoque() {

        const navigate = useNavigate()
        const dispatch = useDispatch()
        const [filtro, setFiltro] = React.useState('Produto')
        const [search, setSearch] = React.useState('')
        const { estoque, estoquePesquisa, todosEstoque } = useSelector(state => state.requestSearch)
        const [submit, setSubmit] = React.useState(false)
        const [muda, setMuda] = React.useState(1)

        function mudarFiltroBusca() {
                setMuda(muda + 1)
                if (muda == 1) setFiltro('Unidades')
                else if (muda == 2) setFiltro('Valor')
                else if (muda == 3) {
                        setMuda(1)
                        setFiltro('Produto')
                }
        }

        function filterEstoque() {
                if (filtro == 'Unidades') return estoque.filter(prod => prod.Unidades == search)
                else if (filtro == 'Valor') return estoque.filter(prod => prod.Valor == search)
                else return estoque.filter(prod => prod.Produto.toLowerCase().includes(search.toLowerCase()))
        }

        return (
                <Content>
                        <BarraPesquisa search={search} setSearch={setSearch} onSubmit={() => {
                                if (estoquePesquisa.length > 0) dispatch(setEstoquePesquisa('limpar'))
                                consultaDb('Estoque', filtro, filtro == 'Produto' ? tratamentoNome(search) : search, dispatch, setEstoquePesquisa)
                                setSubmit(true)
                        }} />
                        <div id='container'>
                                <div>
                                        <Grid text='Filtrar busca:' text2={filtro} onClick={() => mudarFiltroBusca()}>
                                                <Icon path={mdiPackageVariant} size={3.5} />
                                        </Grid>
                                        <Grid text='Todos' text2='Produtos' onClick={() => dispatch(setTodosEstoque(true))}>
                                                <Icon path={mdiPackageVariantClosed} size={3.5} />
                                        </Grid>
                                        <Grid text='Registrar' text2='Produto' onClick={() => navigate('/RegistrarProduto')}>
                                                <Icon path={mdiPackageVariantClosedPlus} size={3.5} />
                                        </Grid>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <FlatList
                                                list={todosEstoque ? filterEstoque() : estoquePesquisa.length > 0 ? estoquePesquisa : estoque}
                                                wrapperHtmlTag="div"
                                                renderWhenEmpty={() =>
                                                        submit || todosEstoque ?
                                                                <div style={styles.containerPesquisa}>
                                                                        <SearchOffRoundedIcon sx={{ fontSize: 90, color: '#342B49' }} />
                                                                        <p style={styles.font}>Nenhum produto encontrado!</p>
                                                                </div> :
                                                                <div style={styles.containerPesquisa}>
                                                                        <SearchRoundedIcon sx={{ fontSize: 90, color: '#342B49' }} />
                                                                        <p style={styles.font}>Consultar produtos no estoque.</p>
                                                                </div>
                                                }
                                                id='ListaPesquisa'
                                                renderItem={list => ListaEstoque(list, dispatch, navigate)}
                                        />
                                        {submit ? estoquePesquisa.length > 0 ?
                                                <p style={styles.deleteSearch} onClick={() => {
                                                        dispatch(setEstoquePesquisa('limpar'))
                                                        setSubmit(false)
                                                }}>
                                                        <CloseRoundedIcon fontSize='large' />
                                                </p>
                                                : null : null
                                        }
                                </div>
                        </div>
                </Content >
        )

}

const styles = {
        containerPesquisa: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                alignSelf: 'center',
                marginRight: '3%',
                marginTop: '15%'
        },
        font: {
                fontWeight: 'bolder',
                marginTop: 8
        },
        deleteSearch: {
                marginTop: '1%',
                marginRight: '1%',
                cursor: 'pointer'
        }
}