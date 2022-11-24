import React from 'react'
import Avatar from '@mui/material/Avatar';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {deleteDocument} from '../firebase/firebase'
import './ListaNota.css'

export default function ListaServ(item, userInformation) {

    return (
        <div style={styles.row}>
            <div id='containerLista' style={{ margin: 10, marginLeft: 15, marginTop: 12 }}>
                <Avatar style={styles.imgStyle}>{item.Produto ? item.Produto[0][0] : item.Servico[0][0]}</Avatar>
                <div id='nome'>
                    <p style={{ minWidth: 320, maxWidth: 320, overflow: 'hidden', textOverflow: 'ellipsis'}}>{item.Produto ? item.Produto : item.Servico}</p>
                    <p style={{ color: 'green' }}>{item.tipo}</p>
                </div>
                <p id='valor' style={styles.valor}>{`R$ ${item.Valor}`}</p>
            </div>
            <p id='closeButtonNota' onClick={() => deleteDocument(`NotaAtiva-${userInformation.uid}`, item.idColl)}>
                <CloseRoundedIcon />
            </p>
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