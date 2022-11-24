import React from 'react'
import BarraPesquisa from '../pages/BarraPesquisa'
import { mdiPackageVariantClosed, mdiBarcode, mdiCurrencyBrl } from '@mdi/js';
import Avatar from '@mui/material/Avatar';
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import Content from '../components/Content'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import './InfoEstoque.css'
import RowEstoque from '../components/rowDados';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import DeleteEstoque from '../popups/PopUpDeleteEstoque';

export default function InfoEstoque() {

    const navigate = useNavigate()
    const { info } = useSelector(state => state.requestSearch)
    const [openPopUpConfirm, setOpenPopUpConfirm] = React.useState(false)

    return (
        <Content>
            <BarraPesquisa hidePesquisa titulo={info.Produto} />
            {openPopUpConfirm ? <DeleteEstoque open={openPopUpConfirm} setOpen={setOpenPopUpConfirm} idEstoque={info.idEstoque} /> : null }
            <div id='containerEstoque'>
                <div id='leftEstoque'>
                    {info.Img ? <Avatar src={info.Img} sx={styles.imgStyle} /> : <Avatar sx={styles.imgStyle}>{info.Produto[0][0]}</Avatar>}
                    <p style={{ fontWeight: 'bolder', marginTop: '3%' }}>{info.Produto}</p>
                    <p style={styles.backButton} onClick={() => navigate(-1)}>
                        <KeyboardBackspaceRoundedIcon fontSize='large' />
                    </p>
                </div>
                <div id='rightEstoque'>
                    <div id='dadosProd'>
                        <h1>Informações</h1>
                        <RowEstoque first info={info.Produto} path={mdiPackageVariantClosed} />
                        <RowEstoque info={info.Codigo} path={mdiBarcode} />
                        <RowEstoque info={info.Valor} path={mdiCurrencyBrl} color='green' />
                        <RowEstoque info={info.Custo} path={mdiCurrencyBrl} color='red' />
                    </div>
                    <p style={styles.closeButton} onClick={() => setOpenPopUpConfirm(true)}>
                        <CloseRoundedIcon fontSize='large' />
                    </p>
                </div>
            </div>
        </Content>
    )

}

const styles = {
    imgStyle: {
        height: 250,
        width: 250,
        marginTop: '23%',
        fontSize: 90
    },
    backButton: {
        marginTop: '15%',
        cursor: 'pointer'
    },
    closeButton: {
        marginTop: '2%',
        cursor: 'pointer'
    }
}