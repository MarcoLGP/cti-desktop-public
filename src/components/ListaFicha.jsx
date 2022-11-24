import React from 'react'
import Avatar from '@mui/material/Avatar';
import './ListaFicha.css'
import { useDispatch } from 'react-redux';
import { setInfo } from '../redux/searchSlice';

export default function ListaFicha(item, navigate) {

    const dispatch = useDispatch()

    function handleClick() {
        dispatch(setInfo({Nome: item.Nome, Data: item.Data, Equipamento: item.Equipamento, Problema: item.Problema, Email: item.Email ? item.Email : '', Telefone: item.Telefone ? item.Telefone : '', Bairro: item.Bairro ? item.Bairro : '', Cidade: item.Cidade ? item.Cidade : '', Rua: item.Rua ? item.Rua : '', Numero: item.Numero ? item.Numero : '', idFicha: item.idFicha}))
        navigate('/InfoFicha')
    }

    return (
        <div id='containerLista' onClick={() => handleClick()}>
            <Avatar sx={imgStyle}>{item.Nome[0][0]}</Avatar>
                <div id='nome'>
                    <p style={{ width: 450 }}>{item.Nome}</p>
                    <p style={{ color: 'green' }}>Em aberto</p>
                </div>
                <div id='dataEquip'>
                    <p>{item.Data}</p>
                    <p id='equip'>{item.Equipamento.split(' ')[0] ? item.Equipamento.split(' ')[0] : item.Equipamento}</p>
                </div>
        </div>
    )

}

const imgStyle = {
    height: 70,
    width: 70,
    marginLeft: 1.1
}