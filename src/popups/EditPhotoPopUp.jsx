import PopUp from '../components/PopUp'
import ImageAvatar from '../components/imageAvatar'
import ImagePreviewPopUp from './MuiDialog2'
import './buttonPopUps.css'
import { useDispatch, useSelector } from 'react-redux'
import { atualizarFoto } from '../firebase/firebase.js'
import React from 'react'

export default function EditEmailPopUp(props) {

    const [img, setImg] = React.useState('')
    const dispatch = useDispatch()
    const [openImagePreview, setOpenImagePreview] = React.useState(false)
    const { userInformation } = useSelector(state => state.login)

    React.useEffect(() => {
        if(userInformation.foto) setImg(userInformation.foto)
    },[])

    return (
        <PopUp setOpen={props.setOpen} height={'330px'} marginTop={'5%'} >
            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '5%', alignItems: 'center'}}>
                <ImageAvatar preview={img} setImg={setImg} open={openImagePreview} setOpen={setOpenImagePreview} />
                <div onClick={e => atualizarFoto(img, props.setOpen, dispatch)} style={{ marginTop: '20%' }} id='buttonPopUp'>
                    <p>Confirmar</p>
                </div>
            </div>
        </PopUp>
    )

}