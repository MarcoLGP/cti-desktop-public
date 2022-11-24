import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import PrintRoundedIcon from '@mui/icons-material/PrintRounded';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom'
import NotaFiscalVenda from '../layout_print/nota_fiscal_venda';
import { useReactToPrint } from 'react-to-print';
import tratamentoNome from '../utils/nomeTratamento'
import { deleteDocument } from '../firebase/firebase'
import { format } from 'telefone';
import { useSelector, useDispatch } from 'react-redux';

export default function PrintNotaFiscal(props) {

    const navigate = useNavigate()
    const notaFiscalRef = React.useRef()

    const { userInformation } = useSelector(state => state.login)
    const { idDone } = useSelector(state => state.requestSearch)

    const handlePrint = useReactToPrint({
        content: () => notaFiscalRef.current,
    });

    function handleExit() {
        navigate(-1)
        if (props.nota) {
            props.lista.forEach(item => deleteDocument(`NotaAtiva-${userInformation.uid}`, item.idColl))
            if (idDone) deleteDocument(`NotaAtiva-${userInformation.uid}`, `${idDone}`)
        } else {
            props.lista.forEach(item => deleteDocument(`VendaAtiva-${userInformation.uid}`, item.idProduto))
            if (idDone) deleteDocument(`VendaAtiva-${userInformation.uid}`, `${idDone}`)
        }
        props.setOpen(false)
    }

    function HandleNotaFiscal() {
        if (props.emp) {
            const { telefone1, telefone2, ddd1, ddd2, cep, cidade, bairro, logradouro, numero, estado } = props.emp.estabelecimento
            return <NotaFiscalVenda lista={props.lista} emp={true} formPag={props.FormPag} sigla={estado.sigla ? estado.sigla : ''} cidade={cidade.Nome ? cidade.Nome : ''} cep={cep ? cep : ''} bairro={bairro ? bairro : ''} numero={numero ? numero : ''} rua={logradouro ? `${tratamentoNome(logradouro)}` : ''} telefone={telefone1 ? `${format(ddd1 + telefone1)}` : telefone2 ? `${format(ddd2 + telefone2)}` : ''} id={props.idDoc} nome={props.Nome} cnpj={props.Cnpj} total={props.total} ref={notaFiscalRef} />
        } else return <NotaFiscalVenda lista={props.lista} emp={false} formPag={props.FormPag} id={props.idDoc} nome={props.Nome} cpf={props.Cpf} cnpj={props.Cnpj} total={props.total} ref={notaFiscalRef} />
    }

    return (
        <div>
            <div style={{ display: 'none' }}>
                <HandleNotaFiscal />
            </div>
            <Dialog
                open={props.open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    <PrintRoundedIcon fontSize='large' />
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <span style={{ fontSize: 20, fontWeight: 'bold' }} >Imprimir nota fiscal ?</span>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button sx={{ marginLeft: 'auto' }} onClick={() => {
                        handlePrint()
                        handleExit()
                    }}>
                        Confirmar
                    </Button>
                    <Button sx={{ marginRight: 'auto' }} onClick={() => handleExit()}>Dispensar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}