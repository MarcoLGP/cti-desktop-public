import React from 'react'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button';
import TextSnippetRoundedIcon from '@mui/icons-material/TextSnippetRounded';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { addDocument, deleteDocument } from '../firebase/firebase';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

export default function PopUpRemove(props) {

    const { info } = useSelector(state => state.requestSearch)
    const navigate = useNavigate()

    function handleConfirm() {
        if (info.registro) {
            deleteDocument('Registros', info.idFicha)
            props.setOpen(false)
            navigate(-1)
        } else {
            addDocument({ tipo: 'Ficha', ...info }, 'Registros')
            deleteDocument('Ficha', info.idFicha)
            props.setOpen(false)
            navigate(-1)
        }
    }

    function handleRemove() {
        if (info.registro) props.setOpen(false)
        else {
            deleteDocument('Ficha', info.idFicha)
            props.setOpen(false)
            navigate(-1)
        }

    }

    return (
        <Dialog
            open={props.open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                <TextSnippetRoundedIcon fontSize='large' />
            </DialogTitle>
            <DialogContent>
                <p style={{ fontWeight: 'bold' }}>{info.registro ? 'Deseja realmente excluir a ficha dos registros ?' : 'Salvar ficha nos registros ?'}</p>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleConfirm()}>Confirmar</Button>
                <Button onClick={() => handleRemove()}>Dispensar</Button>
                {!info.registro ? <Button onClick={() => props.setOpen(false)}>Cancelar</Button> : null}
            </DialogActions>
        </Dialog>
    )

}