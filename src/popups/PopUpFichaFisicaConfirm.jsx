import React from 'react'
import { useReactToPrint } from 'react-to-print';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import PrintRoundedIcon from '@mui/icons-material/PrintRounded';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Pattern from '../layout_print/pattern'
import { useNavigate } from 'react-router-dom';

export default function FichaFisicaConfirm(props) {

    const navigate = useNavigate()

    const componentRef = React.useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const handleClose = () => {
        props.setOpen(false);
        if(!props.info) navigate(-1)
    };

    return (
        <div>
            <Dialog
                open={props.open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                    <PrintRoundedIcon fontSize='large' />
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <div style={{ display: 'none' }}>
                            <Pattern nome={props.nome} telefone={props.telefone} equipamento={props.equipamento} problema={props.problema} fichaId={`${props.fichaId}`} ref={componentRef} />
                        </div>
                        <span style={{ fontSize: 20, fontWeight: 'bold' }} >Imprimir ficha de entrada ?</span>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button sx={{ marginLeft: 'auto' }} onClick={e => {
                        handlePrint()
                        handleClose()
                    }}>
                        Confirmar
                    </Button>
                    <Button sx={{ marginRight: 'auto' }} onClick={() => handleClose()}>Dispensar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}