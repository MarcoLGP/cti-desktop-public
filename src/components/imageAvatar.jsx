import React from 'react'
import AddAPhotoRoundedIcon from '@mui/icons-material/AddAPhotoRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import Avatar from '@mui/material/Avatar';
import './imageAvatar.css'
import MuiDialog2 from '../popups/MuiDialog2';


export default function ImageAvatar(props) {

    const [open, setOpen] = React.useState(false)

    const deleteImage = e => {
        e.preventDefault()
        props.setImg('')
    }

    return (
        <React.Fragment>
            <MuiDialog2 open={open} setOpen={setOpen} setPreview={props.setImg} />
            <Avatar src={props.preview} sx={{ height: 170, width: 170 }} />
            {props.preview ?
                <div id='deleteButton' style={{ display: props.hideIcon ? 'none' : null }} onClick={e => deleteImage(e)}>
                    <DeleteIcon fontSize='large' />
                </div> :
                <div id='addButton' style={{ display: props.hideIcon ? 'none' : null }} onClick={e => {
                    e.preventDefault()
                    setOpen(true)
                }}>
                    <AddAPhotoRoundedIcon fontSize='large' />
                </div>}
        </React.Fragment >
    )
}