import React from 'react'
import BarraPesquisa from './BarraPesquisa'
import Content from '../components/Content'
import UpdateRoundedIcon from '@mui/icons-material/UpdateRounded';
import SearchOffRoundedIcon from '@mui/icons-material/SearchOffRounded';
import { mdiClipboardText } from '@mdi/js';
import Grid from '../components/grid_inicio'
import FlatList from 'flatlist-react'
import Icon from '@mdi/react'
import './Dashboard.css'
import ListaFicha from '../components/ListaFicha'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function FichaDeEntrada(props) {

        const navigate = useNavigate()
        const { ficha } = useSelector(state => state.requestSearch)
        const [search, setSearch] = React.useState()

        return (
                <Content>
                        <BarraPesquisa search={search} setSearch={setSearch} />
                        <div id='container'>
                                <div>
                                        <Grid text='Gerar' text2='Ficha de Entrada' fontSize={'1.2em'} onClick={() => navigate('/GerarFicha')}>
                                                <Icon path={mdiClipboardText} size={3} />
                                        </Grid>
                                </div>
                                <div style={{ justifyContent: 'center' }}>
                                        <FlatList
                                                list={ficha.filter(ficha => search ? ficha.Nome.toLowerCase().includes(search.toLowerCase()) : ficha)}
                                                renderWhenEmpty={() =>
                                                        search ?
                                                                <div id='containerListaVazia'>
                                                                        <SearchOffRoundedIcon style={{ fontSize: 90, color: '#342B49' }} />
                                                                        <p>Nenhuma ficha de entrada em aberto encontrada!</p>
                                                                </div> :
                                                                <div id='containerListaVazia'>
                                                                        <UpdateRoundedIcon style={{ fontSize: 90, color: '#342B49' }} />
                                                                        <p>Sem fichas de entrada abertas no momento!</p>
                                                                </div>}
                                                wrapperHtmlTag="div"
                                                id='ListaPesquisa'
                                                renderItem={item => ListaFicha(item, navigate)}
                                        />
                                </div>
                        </div>
                </Content >
        )
}