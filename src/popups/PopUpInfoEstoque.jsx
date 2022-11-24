import React from 'react';
import PopUp from '../components/PopUp';
import Avatar from '@mui/material/Avatar';
import SettingsIcon from '@mui/icons-material/Settings';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Icon from '@mdi/react'
import { mdiBarcode } from '@mdi/js';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import InventoryIcon from '@mui/icons-material/Inventory';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import GroupWorkRoundedIcon from '@mui/icons-material/GroupWorkRounded';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { stringAvatar } from '../components/imageDefault';
import { updateUnidades } from '../firebase/firebase.js'
import Dialog2 from './MuiDialog2'
import './popupsinfo.css'
import { deleteDocument, deletePermanentDocument } from '../firebase/firebase.js'

export default function PopUpsInfo(props) {

    const [prev, setPrev] = React.useState(Number(props.dados.Unidades))
    const [preview, setPreview] = React.useState(props.dados.Img ? props.dados.Img : null)
    const [openPreview, setOpenPreview] = React.useState(false)
    const [settClick, setSettClick] = React.useState(false)

    return (
        <PopUp setOpen={props.setOpen} height={'460px'} >
            {openPreview ? <Dialog2 preview={preview}  setPreview={setPreview} open={openPreview} setOpen={setOpenPreview} /> : null}
            {!props.registro ? <p onClick={e => setSettClick(!settClick)}
                style={{ marginTop: '0.8%', marginLeft: '2%', position: 'absolute' }} >
                <SettingsIcon sx={{ fontSize: 26 }} /></p>
                :
                null}
            <div id='content'>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    {preview ? <Avatar src={preview} sx={{ marginTop: '5%', marginLeft: 'auto', marginRight: 'auto', height: 200, width: 200 }} /> : <Avatar {...stringAvatar(props.dados.Produto.toUpperCase(), '5%')} />}
                    {settClick ? <div onClick={() => settClick ? setOpenPreview(true) : setPreview(null)} id='photoButton' style={{ border: props.dados.Img ? '1px solid #fff' : null }}>{props.dados.Img ? <DeleteRoundedIcon fontSize='large' /> : <AddAPhotoIcon fontSize='large' />}</div> : null }
                </div>
                <div id='descricao'>
                    <div><InventoryIcon fontSize='large' /> <span>{props.dados.Produto}</span></div> <br />
                    <div><Icon size={1.4} path={mdiBarcode} /> <span>{props.dados.Codigo}</span></div>  <br />
                    <div style={{ fontSize: '1.15em' }} >
                        <div style={{ color: 'green' }} ><MonetizationOnIcon fontSize='large' /><span>R$ {props.dados.Valor.toString().replace('.', ',')}</span></div>
                        <div style={{ color: 'red', marginLeft: '5%' }} ><MonetizationOnIcon fontSize='large' /><span>R$ {props.dados.Custo.toString().replace('.', ',')}</span></div>
                    </div> <br />
                    <div><GroupWorkRoundedIcon fontSize='large' />
                        <span>{prev} </span> <AddRoundedIcon sx={{ marginLeft: '4%', display: settClick ? 'block' : 'none' }} onClick={e => setPrev(prev + 1)} /> <RemoveRoundedIcon sx={{ marginLeft: '2%', display: settClick ? 'block' : 'none' }} onClick={e => setPrev(prev - 1)} />
                    </div> <br />
                </div>
                {props.registro ? <IconButton onClick={e => props.registro ? deletePermanentDocument('Registros', props.dados.id, props.setOpen, props.setDelRefresh, props.delRefresh) : deleteDocument(props.dados.id, 'Estoque', props.setOpen, props.dados, props.setDelRefresh, props.delRefresh)}
                    sx={{ position: 'absolute', marginTop: '390px', marginLeft: '25%' }} >
                    <DeleteIcon fontSize='large' />
                </IconButton> : settClick ? <p style={{ position: 'absolute', marginTop: '400px', marginLeft: '26%' }} onClick={e => {
                    updateUnidades(props.dados.id, prev)
                    setSettClick(false)
                }}> <CheckRoundedIcon sx={{ fontSize: 30 }} /> </p> : <IconButton onClick={e => props.registro ? deletePermanentDocument('Registros', props.dados.id, props.setOpen, props.setDelRefresh, props.delRefresh) : deleteDocument(props.dados.id, 'Estoque', props.setOpen, props.dados, props.setDelRefresh, props.delRefresh)}
                    sx={{ position: 'absolute', marginTop: '392px', marginLeft: '25%' }} >
                    <DeleteIcon fontSize='large' />
                </IconButton>}
            </div>
        </PopUp>
    )
}