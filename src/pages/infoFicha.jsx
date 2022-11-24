import { Avatar } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import LocalPrintshopRoundedIcon from '@mui/icons-material/LocalPrintshopRounded';
import RowFicha from '../components/rowDados'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { mdiAccountArrowRight, mdiBriefcaseVariant, mdiWrench, mdiAt, mdiPhone, mdiClipboardTextClock, mdiCityVariant, mdiKeyVariant, mdiHomeGroup, mdiCity, mdiRoad, mdiNumeric } from '@mdi/js'
import Content from '../components/Content'
import BarraPesquisa from './BarraPesquisa'
import './infoFicha.css'
import PopUpRemove from '../popups/popUpRemove';
import { useSelector } from 'react-redux';
import { addDocument, deleteDocument } from '../firebase/firebase';
import FichaFisicaConfirm from '../popups/PopUpFichaFisicaConfirm';

export default function InfoFicha() {

    const [mostEnd, setMostEnd] = React.useState(false)
    const [sucess, setSucess] = React.useState(false)
    const [openPopUpPrint, setOpenPopUpPrint] = React.useState(false)
    const [remove, setRemove] = React.useState(false)
    const [openPopUpRemove, setOpenPopUpRemove] = React.useState(false)
    const navigate = useNavigate()

    const { info } = useSelector(state => state.requestSearch)

    const styles = {
        imgStyle: {
            height: 250,
            width: 250,
            fontSize: 90
        },
        dadosCont: {
            height: mostEnd ? 220 : null,
            backgroundColor: sucess ? '#00962D' : remove ? '#AA242C' : null,
            color: sucess || remove ? '#fff' : null
        },
        h1Style: {
            backgroundColor: sucess ? '#00962D' : remove ? '#AA242C' : null,
            color: sucess || remove ? '#fff' : null
        },
        iconStyle: {
            backgroundColor: sucess ? '#00962D' : remove ? '#AA242C' : null,
            color: sucess || remove ? '#fff' : null,
            fontSize: 30
        }
    }

    function handleConfirm() {
        setSucess(true)
        const interval = setInterval(() => {
            addDocument({ tipo: 'Ficha', ...info }, 'Registros')
            deleteDocument('Ficha', info.idFicha)
            setSucess(false)
            navigate(-1)
            clearInterval(interval)
        }, 1000)
    }

    function handleRemove() {
        setRemove(true)
        const interval = setInterval(() => {
            setRemove(false)
            setOpenPopUpRemove(true)
            clearInterval(interval)
        }, 1000)
    }

    return (
        <Content>
            <BarraPesquisa hidePesquisa titulo={'Ficha de Entrada'} />
            <PopUpRemove open={openPopUpRemove} setOpen={setOpenPopUpRemove} />
            {openPopUpPrint ? <FichaFisicaConfirm info open={openPopUpPrint} setOpen={setOpenPopUpPrint} nome={info.Nome} telefone={info.Telefone} equipamento={info.Equipamento} problema={info.Problema} fichaId={`${info.idFicha}`} /> : null}
            <div id='containerInfoFicha'>
                <div id='leftFicha'>
                    <div>
                        <Avatar sx={styles.imgStyle}>{info.Nome[0][0]}</Avatar>
                        <p>{info.Nome}</p>
                    </div>
                    <p id='backButtonFicha' onClick={() => navigate(-1)}>
                        <KeyboardBackspaceRoundedIcon fontSize='large' />
                    </p>
                </div>
                <div id='rightFicha'>
                    <div id='dadosCont' style={styles.dadosCont}>
                        <div>
                            <h1 style={styles.h1Style}>Informações</h1>
                            <p onClick={() => setOpenPopUpPrint(true)}><LocalPrintshopRoundedIcon style={styles.iconStyle} /></p>
                        </div>

                        {mostEnd ?
                            <React.Fragment>
                                <RowFicha first marginTop info={info.Bairro} path={mdiHomeGroup} />
                                <RowFicha marginTop info={info.Cidade} path={mdiCity} />
                                <RowFicha info={info.Rua} path={mdiRoad} />
                                <RowFicha last info={info.Numero} path={mdiNumeric} path2={mdiCityVariant} onIconClick={() => setMostEnd(!mostEnd)} />
                            </React.Fragment>
                            :
                            <React.Fragment>
                                <RowFicha first marginTop info={info.Nome} path={mdiAccountArrowRight} />
                                <RowFicha info={info.Equipamento} path={mdiBriefcaseVariant} />
                                <RowFicha info={info.Problema} path={mdiWrench} />
                                <RowFicha info={info.Email} path={mdiAt} />
                                <RowFicha info={info.Telefone} path={mdiPhone} />
                                <RowFicha info={info.Senha} path={mdiKeyVariant} />
                                <RowFicha last info={info.Data} path={mdiClipboardTextClock} path2={mdiCityVariant} onIconClick={() => setMostEnd(!mostEnd)} />
                            </React.Fragment>
                        }
                    </div>
                    <div id='buttonsInfoFicha'>
                        {!info.registro ? <p onClick={() => handleConfirm()}>
                            <CheckRoundedIcon fontSize='large' />
                        </p> : null }
                        <p onClick={() => handleRemove()}>
                            <CloseRoundedIcon fontSize='large' />
                        </p>
                    </div>
                </div>
            </div>
        </Content>
    )

}