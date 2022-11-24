import React from 'react'
import './Dashboard.css'
import Content from '../components/Content'
import BackupIcon from '@mui/icons-material/Backup';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import ResetPasswordPopUp from '../popups/PasswordResetPopUp'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import SyncLockRoundedIcon from '@mui/icons-material/SyncLockRounded';
import EditPhotoPopUp from '../popups/EditPhotoPopUp'
import UnsubscribeIcon from '@mui/icons-material/Unsubscribe';
import AddColabPopUp from '../popups/AddColabPopUp'
import EditEmailPopUp from '../popups/EditEmailPopUp'
import KeyIcon from '@mui/icons-material/Key';
import CreatePassPopUp from '../popups/ConfigAdminPass'
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import { passEdit } from '../firebase/firebase.js'
import LockIcon from '@mui/icons-material/Lock';
import EditAdminPasswordPopUp from '../popups/EditAdminPasswordPopUp'
import './Config.css'
import { useSelector } from 'react-redux'
import ComingSoon from '../popups/popUpComingSoon';
import BarraPesquisa from './BarraPesquisa';

export default function Config() {

    const [dadosChange, setDadosChange] = React.useState(1)
    const [openComingSoonPopUp, setOpenComingSoonPopUp] = React.useState(false)
    const [auth, setAuth] = React.useState(false)
    const [openCreatePassPopUp, setOpenCreatePassPopUp] = React.useState(false)
    const [openEditEmailPopUp, setOpenEditEmailPopUp] = React.useState(false)
    const [openEditPhotoPopUp, setOpenEditPhoto] = React.useState(false)
    const [openEditAdminPasswordPopUp, setOpenEditAdminPasswordPopUp] = React.useState(false)
    const [openAddColabPopUp, setOpenAddColabPopUp] = React.useState(false)
    const [openResetPassword, setOpenResetPassword] = React.useState(false)
    const [erroResetPass, setErroResetPass] = React.useState(false)
    const { userInformation } = useSelector(state => state.login)

    const popUpDados = () => {
        switch (dadosChange) {
            case 1:
                passEdit(userInformation.email, setErroResetPass)
                setOpenResetPassword(true)
                break
            case 2:
                setOpenEditAdminPasswordPopUp(true)
                break
        }
    }

    function OnDadosChange() {
        switch (dadosChange) {
            case 1:
                return <React.Fragment>
                    <KeyIcon sx={{ fontSize: 110 }} />
                    <p>Alterar Senha</p>
                </React.Fragment>
            case 2:
                return <React.Fragment>
                    <SyncLockRoundedIcon sx={{ fontSize: 110 }} />
                    <p style={{ fontSize: '1.1em' }} >Senha Administrador</p>
                </React.Fragment>
        }
    }

    return (
        <Content>
            {openComingSoonPopUp ? <ComingSoon setOpen={setOpenComingSoonPopUp} /> : null}
            {openAddColabPopUp ? <AddColabPopUp setOpen={setOpenAddColabPopUp} /> : null}
            {openEditPhotoPopUp ? <EditPhotoPopUp setOpen={setOpenEditPhoto} /> : null}
            {openEditEmailPopUp ? <EditEmailPopUp setOpen={setOpenEditEmailPopUp} /> : null}
            {openCreatePassPopUp ? <CreatePassPopUp setAuth={setAuth} setOpen={setOpenCreatePassPopUp} /> : null}
            {openEditAdminPasswordPopUp ? <EditAdminPasswordPopUp setOpen={setOpenEditAdminPasswordPopUp} /> : null}
            {openResetPassword ? <ResetPasswordPopUp setOpen={setOpenResetPassword} error={erroResetPass} email={userInformation.email} /> : null}
            <BarraPesquisa hidePesquisa titulo='Configurações' />
            <div id='cards'>
                {auth ?
                    <div id='linha1' >
                        <div onClick={e => setOpenComingSoonPopUp(true)} >
                            <BackupIcon sx={{ fontSize: 110 }} />
                            <p>Backup</p>
                        </div>
                        <div onClick={e => setOpenComingSoonPopUp(true)} >
                            <CloudOffIcon sx={{ fontSize: 110 }} />
                            <p>Formatar Registro</p>
                        </div>
                        <div onClick={e => setOpenAddColabPopUp(true)} >
                            <PersonAddAlt1Icon sx={{ fontSize: 110 }} />
                            <p style={{ fontSize: '1.1em' }} >Registrar Colaborador </p>
                        </div>
                    </div>
                    :
                    <div id='linha1'>
                        <div onClick={e => setOpenCreatePassPopUp(true)} >
                            <LockIcon sx={{ fontSize: 110 }} />
                            <p style={{ fontSize: '1.1em' }} >Administrador</p>
                        </div>
                    </div>
                }

                <div id='linha2'>
                    <div onClick={e => setOpenEditPhoto(true)}>
                        {!userInformation.foto ? <AddPhotoAlternateIcon sx={{ fontSize: 110 }} /> : <InsertPhotoIcon sx={{ fontSize: 110 }} />}
                        <p style={{ fontSize: '1.2em' }} >{!userInformation.foto ? 'Adicionar Foto' : 'Alterar Foto'}</p>
                    </div>
                    <div onClick={e => popUpDados()} onAuxClick={e => {
                        if (auth) {
                            if (dadosChange === 2) setDadosChange(1)
                            else setDadosChange(dadosChange + 1)
                        } else setDadosChange(1)
                    }} >
                        <OnDadosChange />
                    </div>

                </div>

                <div id='linha3'>
                    <div onClick={e => setOpenEditEmailPopUp(true)} >
                        <UnsubscribeIcon sx={{ fontSize: 110 }} />
                        <p>Alterar Email</p>
                    </div>
                </div>
            </div>
        </Content>
    )
}