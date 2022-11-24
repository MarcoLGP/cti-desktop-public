import React from 'react'
import Avatar from '@mui/material/Avatar'
import {setInfo} from '../redux/searchSlice'

export default function ListaServ(item, dispatch, navigate) {

    function handleClick() {
        if (item.tipo == 'Venda') {
            dispatch(setInfo({Nome: item.Nome, Data: item.Data, Produtos: item.Produtos, Cpf: item.Cpf, Cnpj: item.Cnpj, FormPag: item.FormPag}))
            navigate('/InfoVendaNota')
        } else if (item.tipo == 'Nota') {
            item.Nota ? dispatch(setInfo({Nome: item.Nome, Data: item.Data, Nota: item.Nota, Cpf: item.Cpf, Cnpj: item.Cnpj, FormPag: item.FormPag, total: item.total})) : dispatch(setInfo({Nome: item.Nome, Data: item.Data, Produtos: item.Produtos, Cpf: item.Cpf, Cnpj: item.Cnpj, FormPag: item.FormPag, total: item.total}))
            navigate('/InfoDashboard')
        } else if (item.tipo == 'Ficha') {
            dispatch(setInfo({Nome: item.Nome, Data: item.Data, Equipamento: item.Equipamento, Problema: item.Problema, Email: item.Email, Telefone: item.Telefone, Bairro: item.Bairro, Cidade: item.Cidade, Rua: item.Rua, Numero: item.Numero, registro: true }))
            navigate('/InfoFicha')
        }
    }

    return (
        <div style={styles.row} onClick={() => handleClick()}>
            <div id='containerLista' style={{margin: 10}}>
                <Avatar style={styles.imgStyle}>{item.Nome[0][0]}</Avatar>
                <div id='nome'>
                    <p style={styles.produto}>{item.Nome}</p>
                    <p style={{ color: 'green' }}>{item.tipo}</p>
                </div>
                <p id='data'>{item.Data}</p>
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
    data: {
        fontWeight: 'bolder', 
        color: '#342B49',
        marginLeft: 10
    },
    produto: { 
        minWidth: 500, 
        maxWidth: 500, 
        overflow: 'hidden'
    }
}