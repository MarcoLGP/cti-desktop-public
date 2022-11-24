import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { useNavigate } from 'react-router-dom';
import { deleteDocument } from '../firebase/firebase';

export default function DeleteEstoque(props) {

    const navigate = useNavigate()

    const handleClose = (remove) => {
        if (remove) {
            deleteDocument('Estoque', props.idEstoque)
            navigate(-1)
        } else props.setOpen(false)
    };

    return (
        <div>
            <Dialog
                open={props.open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <span style={{ fontSize: 20, fontWeight: 'bold' }} >Deseja realmente remover o produto ?</span>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button sx={{ marginLeft: 'auto' }} onClick={e => handleClose(true)}>
                        Confirmar
                    </Button>
                    <Button sx={{ marginRight: 'auto' }} onClick={() => handleClose()}>
                        Dispensar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}