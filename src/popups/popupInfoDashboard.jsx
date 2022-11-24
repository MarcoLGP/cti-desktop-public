import React from 'react';
import PopUp from '../components/PopUp';
import Avatar from '@mui/material/Avatar';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import HourglassBottomRoundedIcon from '@mui/icons-material/HourglassBottomRounded';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { stringAvatar } from '../components/imageDefault';
import './popupsinfo.css'
import { deleteDocument, deletePermanentDocument } from '../firebase/firebase.js'
import { useDispatch } from 'react-redux'

export default function PopUpsInfo(props) {

    return (
        <PopUp setOpen={props.setOpen} height={'470px'} >
            <div id='content'>
                {props.dados.Img ? <Avatar src={props.dados.Img} sx={{ marginTop: '5%', marginLeft: 'auto', marginRight: 'auto', height: 200, width: 200 }} /> : <Avatar {...stringAvatar(props.dados.Nome.toUpperCase(), '5%')} />}
                <div id='descricao'>
                    <div><AssignmentIndIcon fontSize='large' /> <span>{props.dados.Nome}</span></div> <br />
                    <div style={{ color: props.dados.Conta == 'Pagar' ? 'red' : 'green' }} ><LocalAtmIcon fontSize='large' /> <span>Conta à {props.dados.Conta}</span></div>  <br />
                    <div style={{ color: props.dados.Conta == 'Pagar' ? 'red' : 'green' }} ><MonetizationOnIcon fontSize='large' /><span>R$ {props.dados.Valor.toString().replace('.', ',')}</span></div> <br />
                    <div><HourglassBottomRoundedIcon fontSize='large' /> <span>{props.dados.Vencimento}</span></div> <br />
                </div>
                <IconButton onClick={e => props.registro ? deletePermanentDocument('Registros', props.dados.id, props.setOpen, props.setDelRefresh, props.delRefresh) : deleteDocument(props.dados.id, 'Contas', props.setOpen, props.dados, props.setDelRefresh, props.delRefresh)
                } sx={{ position: 'absolute', marginTop: '392px', marginLeft: '25%' }} >
                    <DeleteIcon fontSize='large' />
                </IconButton>
            </div>
        </PopUp>
    )
}