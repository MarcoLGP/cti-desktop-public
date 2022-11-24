import React from 'react'
import Avatar from '@mui/material/Avatar';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import './ListaVenda.css'
import { deleteDocument } from '../firebase/firebase';

export default function ListaVenda(item, userInformation) {

    return (
        <div style={{ display: 'flex' }}>
            <div id='containerLista' style={styles.containerLista}>
                {item.Img ? <Avatar src={item.Img} style={styles.img} /> :
                    <Avatar style={styles.img}>{item.Produto[0][0]}</Avatar>}
                <div id='nome'>
                    <p style={styles.produto}>{item.Produto}</p>
                    <p style={{ color: 'green' }}>Venda</p>
                </div>
                <p id='valor' style={styles.valor}>{`R$ ${item.Valor}`}</p>
            </div>
            <p style={styles.button} onClick={() => deleteDocument(`VendaAtiva-${userInformation.uid}`, item.idProduto)}>
                <CloseRoundedIcon />
            </p>
        </div>
    )

}

const styles = {
    button: {
        display: 'flex',
        cursor: 'pointer',
        height: 20,
        alignSelf: 'center',
        paddingRight: 20
    },
    containerLista: {
        margin: 10, 
        marginLeft: 15, 
        marginTop: 12
    },
    produto: { 
        minWidth: 300, 
        maxWidth: 300, 
        overflow: 'hidden' 
    },
    img: {
        height: 70,
        width: 70,
        marginLeft: 10,
        marginTop: 2
    },
    valor: {
        minWidth: 105,
        textAlign: 'left',
        marginLeft: 10, 
        maxWidth: 105,
        marginRight: 10
    }
}