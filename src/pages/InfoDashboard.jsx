import React from 'react'
import Content from '../components/Content'
import BarraPesquisa from './BarraPesquisa'
import { useSelector } from 'react-redux'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SwitchAccessShortcutRoundedIcon from '@mui/icons-material/SwitchAccessShortcutRounded';
import RowDash from '../components/rowDados';
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import { mdiAccount, mdiCardAccountDetails, mdiStore, mdiStoreSearch, mdiCash, mdiCreditCard, mdiCalendarRange, mdiCurrencyBrl, mdiFileEye } from '@mdi/js';
import Avatar from '@mui/material/Avatar'
import FlatList from 'flatlist-react'
import './InfoDashboard.css'
import { useNavigate } from 'react-router-dom'
import ListaInfoDash from '../components/ListaInfoDash';

export default function InfoDashboard() {

    const navigate = useNavigate()
    const [showNota, setShowNota] = React.useState(false)

    const {info} = useSelector(state => state.requestSearch)

    return (
        <Content>
            <BarraPesquisa hidePesquisa titulo={info.tipo == 'Nota' ? 'Nota Fiscal' : 'Venda'} />
            <div id='containerInfoDash'>
                <div id='leftDash'>
                    <div id='nomeDash'>
                        <Avatar sx={styles.imgStyle}>{info.Nome[0][0]}</Avatar>
                        <p>{info.Nome}</p>
                    </div>
                    <p onClick={() => navigate(-1)} id='backButtonDash'>
                        <KeyboardBackspaceRoundedIcon fontSize='large' />
                    </p>
                </div>
                <div id='rightDash'>
                    {
                        !showNota ? <React.Fragment>
                            <div id='dadosDash'>
                                <h1>Informações</h1>
                                <RowDash first info={info.Nome} path={info.Cpf ? mdiAccount : mdiStore} />
                                <RowDash info={info.Cpf ? info.Cpf : info.Cnpj} path={info.Cpf ? mdiCardAccountDetails : mdiStoreSearch} />
                                <RowDash info={info.FormPag} path={info.FormPag == 'Dinheiro' ? mdiCash : mdiCreditCard} />
                                <RowDash info={info.Data} path={mdiCalendarRange} />
                                <RowDash last info={info.total} path={mdiCurrencyBrl} path2={mdiFileEye} onIconClick={() => setShowNota(true)} />
                            </div>
                            <p id='deleteButtonDash'>
                                <CloseRoundedIcon fontSize='large' />
                            </p>
                        </React.Fragment> :
                            <React.Fragment>
                                <FlatList
                                    list={info.Nota ? info.Nota : info.Produtos}
                                    renderItem={ListaInfoDash}
                                    wrapperHtmlTag="div"
                                    id='ListaInfoDash'
                                />
                                <div id='totalDash'>
                                    <p onClick={() => setShowNota(false)}>
                                        <SwitchAccessShortcutRoundedIcon fontSize='large' />
                                    </p>
                                    <p style={{marginLeft: '20%'}}>Total: </p>
                                    <p>{`R$ ${info.total}`}</p>
                                </div>
                            </React.Fragment>
                    }
                </div>
            </div>
        </Content>
    )
}

const styles = {
    imgStyle: {
        height: 250,
        width: 250,
        fontSize: 90
    },
}