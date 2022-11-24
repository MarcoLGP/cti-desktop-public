import React from 'react'
import Avatar from '@mui/material/Avatar';
import './ListaInfoDash.css'

export default function ListaInfoDash(item) {

    return (
        <div style={styles.row}>
            <div id='containerListaInfoDash'>
                <Avatar style={styles.imgStyle}>{item.Produto ? item.Produto[0][0] : item.Servico[0][0]}</Avatar>
                <div id='nome'>
                    <p id='fontNomeDash'>{item.Produto ? item.Produto : item.Servico}</p>
                    <p style={{ color: 'green' }}>{item.Produto ? 'Venda' : 'Serviço'}</p>
                </div>
                <p id='valor' style={styles.valor}>{`R$ ${item.Valor}`}</p>
            </div>
        </div>
    )

}

const styles = {
    imgStyle: {
        height: 70,
        width: 70,
        marginLeft: 10,
        marginTop: 2
    },
    row: {
        display: 'flex', 
        flexDirection: 'row'
    },
    valor: {
        minWidth: 105, 
        marginLeft: 10, 
        maxWidth: 105, 
        marginRight: 10
    }

}