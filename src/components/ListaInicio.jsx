import React from 'react'
import Avatar from '@mui/material/Avatar';
import './ListaInicio.css'
import { useDispatch } from 'react-redux';
import { setInfo } from '../redux/searchSlice';

export default function ListaInicio({Nome, Data, total, Img, tipo, Cpf, Cnpj, FormPag, Nota, Produtos}, navigate) {

    const dispatch = useDispatch()
    const [mouseEnter, setMouseEnter] = React.useState(false)

    return (
        <div id='containerLista' onMouseLeave={() => setMouseEnter(false)} onMouseEnter={() => setMouseEnter(true)} onClick={() => {
            navigate('/InfoDashboard')
            dispatch(setInfo({ Nome, Img, total, Data, tipo, Cpf, Cnpj, FormPag, Nota, Produtos}))
        }}>
            <Avatar style={imgStyle}>{Nome[0][0]}</Avatar>
            <div id='nome'>
                <p id='nomeFont'>{Nome}</p>
                <p style={{ color: tipo == 'Venda' ? 'green' : 'orange' }}>{tipo}</p>
            </div>
            <div id='data'>
                {mouseEnter ? <p style={{color: 'green'}}>{`R$ ${total}`}</p> : <p >{Data}</p>}
            </div>
        </div>
    )

}

const imgStyle = {
    height: 70,
    width: 70,
    marginLeft: 10,
    marginTop: 2
}