import React from 'react'
import Avatar from '@mui/material/Avatar';
import './ListaEstoque.css'
import { setInfo } from '../redux/searchSlice'

export default function ListaEstoque(item, dispatch, navigate) {

    const imgStyle = {
        height: 70,
        width: 70,
        marginLeft: 10
    }

    return (
        <div id='containerLista' onClick={() => {
            dispatch(setInfo({ 
                idEstoque: item.idEstoque,
                Img: item.Img, 
                Produto: item.Produto,
                Codigo: item.Codigo,
                Custo: item.Custo,
                Valor: item.Valor }))
            navigate('/InfoEstoque')
        }}>
            {item.Img ? <Avatar src={item.Img} style={imgStyle} /> :
                <Avatar style={imgStyle}>{item.Produto[0][0]}</Avatar>}
            <div id='nome'>
                <p style={{ width: 550 }}>{item.Produto}</p>
                <p style={{ color: 'green' }}>Produto</p>
            </div>
            <div id='dataValor'>
                <p id='valor'>{`R$ ${item.Valor}`}</p>
            </div>
        </div>
    )

}