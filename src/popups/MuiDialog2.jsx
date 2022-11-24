import React from 'react'
import Dialog from '@mui/material/Dialog';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


export default function MuiDialog2(props) {

    const [url, setURL] = React.useState(true)
    const [textInput, setTextInput] = React.useState('')
    const [erro, setErro] = React.useState(false)

    function handlePress() {
        if (textInput) {
            props.setPreview(textInput)
            setURL(false)
            props.setOpen(false)
            if (props.setLocal) props.setLocal(false)
            setTextInput('')
        } else {
            setErro(true)
        }
    }

    return (
        <React.Fragment>
            <Dialog
                open={props.open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Carregar imagem"}
                </DialogTitle>
                <DialogContent>
                    {url ?
                        <TextField onKeyDown={e => e.key == 'Enter' ? handlePress() : null} error={erro ? true : false} helperText={erro ? 'Digite alguma URL' : null} sx={{ marginTop: '3%' }} value={textInput} onChange={e => setTextInput(e.target.value)} label={'URL'} size='small' InputProps={{
                            endAdornment: (
                                <InputAdornment>
                                    <IconButton onClick={() => handlePress()} >
                                        <AddPhotoAlternateIcon />
                                    </IconButton>
                                </InputAdornment>
                            )
                        }} />
                        : null}
                </DialogContent>
                <DialogActions >
                    <Button onClick={e => setURL(true)}>
                        URL
                    </Button>
                    <Button onClick={e => {
                        props.setOpen(false)
                        setURL(false)
                        setTextInput('')
                    }}>Sair</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}