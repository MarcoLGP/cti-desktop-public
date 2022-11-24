import React from 'react'
import BarraPesquisa from './BarraPesquisa'
import Content from '../components/Content'
import PointOfSaleRoundedIcon from '@mui/icons-material/PointOfSaleRounded';
import ReceiptIcon from '@mui/icons-material/Receipt';
import './Dashboard.css'
import FlatList from 'flatlist-react'
import UpdateRoundedIcon from '@mui/icons-material/UpdateRounded';
import Grid from '../components/grid_inicio';
import ListaInicio from '../components/ListaInicio';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import SearchOffRoundedIcon from '@mui/icons-material/SearchOffRounded';

export default function Dashboard(props) {

        const navigate = useNavigate()
        const { atvRec } = useSelector(state => state.requestSearch)
        const [search, setSearch] = React.useState('')

        return (
                <Content>
                        <BarraPesquisa search={search} setSearch={setSearch} />
                        <div id='container'>
                                <div>
                                        <Grid text='Registrar' text2='Venda' onClick={() => navigate('/RegistrarVenda')}>
                                                <PointOfSaleRoundedIcon sx={{ fontSize: 55 }} />
                                        </Grid>
                                        <Grid text='Gerar nota' text2='Fiscal' onClick={() => navigate('/GerarNotaServico')}>
                                                <ReceiptIcon sx={{ fontSize: 55 }} />
                                        </Grid>
                                </div>
                                <div>
                                        <FlatList
                                                list={atvRec.filter(atv => search ? atv.Nome.toLowerCase().includes(search.toLowerCase()) : atv)}
                                                wrapperHtmlTag="div"
                                                id='Lista'
                                                renderWhenEmpty={() => search ? <div id='containerListaVazia'>
                                                        <SearchOffRoundedIcon style={{ fontSize: 90, color: '#342B49' }} />
                                                        <p>Nenhuma atividade encontrada!</p>
                                                </div> :
                                                        <div id='containerListaVazia'>
                                                                <UpdateRoundedIcon style={{ fontSize: 90, color: '#342B49' }} />
                                                                <p>Sem atividades recentes por enquanto!</p>
                                                        </div>
                                                }
                                        renderItem={item => ListaInicio(item, navigate)} />
                                </div>
                        </div>
                </Content >
        )
}




