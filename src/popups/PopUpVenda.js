import React from 'react'
import PopUp from '../components/PopUp'
import Avatar from '@mui/material/Avatar';
import FlatList from 'flatlist-react'
import { useSelector } from 'react-redux';
import PrintNotaFiscal from './PopUpPrintNotaFiscal'
import DadosClienteNota from './PopUpDadosClienteNota'

export default function PopUpVenda(props) {

    const { vendaAtiva } = useSelector(state => state.requestSearch)

    const rowVenda = (item) => {
        return (
            item ?
                <div style={styles.listaRow}>
                    {item.Img ? <Avatar style={styles.imgProduto} src={item.Img} /> : <Avatar style={styles.imgProduto}>
                        <span style={{ fontSize: '2em' }}>{item.Produto[0][0]}</span>
                    </Avatar>}
                    <p style={styles.fontNome}>{item.Produto}</p>
                    <p style={styles.fontValor}>{`R$ ${item.Valor}`}</p>
                </div>
                : null
        )
    }

    return (
        <PopUp setOpen={props.setOpen} width={'80%'} marginLeft={'75%'}>
            <div style={styles.container}>
                <div style={styles.left}>
                    {vendaAtiva[0].Img ? <Avatar src={vendaAtiva[0].Img} sx={styles.img} /> : <Avatar sx={styles.img}>
                        <span style={{ fontSize: '5.0em' }}>{vendaAtiva[0].Produto[0][0]}</span>
                    </Avatar>}
                    <p style={{ marginTop: '2%' }}>{vendaAtiva[0].Produto}</p>
                    <div style={styles.totalCont}>
                        <p style={{ fontSize: '1.7em' }}>Total:</p>
                        <p style={styles.fontTotal}>{`R$ ${props.total}`}</p>
                    </div>
                </div>
                <div style={styles.right}>
                    <FlatList
                        list={vendaAtiva}
                        wrapperHtmlTag="div"
                        style={{ overflowY: 'hidden', maxHeight: '480px', marginTop: '12%' }}
                        srollToTop
                        renderItem={rowVenda}
                    />
                </div>
            </div>
        </PopUp>
    )

}

const styles = {
    container: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
    },
    imgProduto: {
        height: 70,
        width: 70
    },
    left: {
        height: '100%',
        width: '50%'
    },
    right: {
        height: '100%',
        width: '50%'
    },
    img: {
        height: 280,
        width: 280,
        marginTop: '15%',
        marginLeft: 'auto',
        marginRight: 'auto',
        bgcolor: 'purple'
    },
    listaRow: {
        display: 'flex',
        marginBottom: '2%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    fontValor: {
        color: 'green',
        marginLeft: '3%',
        fontWeight: 'bold'
    },
    fontNome: {
        marginLeft: '3%',
        maxHeight: '20px',
        minWidth: '60%',
        textAlign: 'left',
        maxWidth: '60%',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        fontWeight: 'bold',
    },
    totalCont: {
        marginTop: '15%',
        width: '100%',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'row',
        fontWeight: 'bold'
    },
    fontTotal: {
        marginLeft: '1%',
        marginTop: '3px',
        color: 'green',
        fontSize: '1.5em',
        alignSelf: 'center'
    }
}
