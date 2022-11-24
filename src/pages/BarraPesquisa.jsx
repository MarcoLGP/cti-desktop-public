import React from 'react'
import './BarraPesquisa.css'
import TextField from '@mui/material/TextField'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search'
import { useSelector } from 'react-redux'
import { linkImage } from '../firebase/firebase'

export default function BarraPesquisa(props) {

    const { userInformation } = useSelector(state => state.login)
    const [hora, setHora] = React.useState(new Date().getHours())
    const [imageSrc, setImageSrc] = React.useState()

    setInterval(() => setHora(new Date().getHours()), 60000)

    const saudacao = () => {
        if (hora >= 0 && hora <= 11) {
            linkImage('sun-color.svg', setImageSrc)
            return 'Bom dia'
        } else if (hora >= 12 && hora <= 17) {
            linkImage('morning.svg', setImageSrc)
            return 'Boa tarde'
        } else {
            linkImage('moon.svg', setImageSrc)
            return 'Boa noite'
        }
    }

    return (
        <div id='barraPesquisa'>
            <div id='iconSaudacao'>
                <img src={imageSrc} height={50} />
                <p>{`${saudacao()}, ${userInformation.nome.split(' ')[0]} !`}</p>
            </div>
            <div style={{ marginTop: '1.5%' }}>
                {props.hidePesquisa ?
                    <div id='tituloPesquisa'>{props.titulo}</div>
                    :
                    <TextField onKeyDown={e => e.key == 'Enter' ? props.onSubmit() : null} onChange={e => props.setSearch(e.target.value)} 
                    value={props.search} size='small' sx={{
                        width: 400,
                        [`& fieldset`]: {
                            borderRadius: 30,
                        }
                    }} placeholder='Pesquisar' InputProps={{
                        sx: {
                            height: 30,
                            marginLeft: '15%'
                        },
                        [`& fieldset`]: {
                            borderColor: '#342B49'
                        },
                        startAdornment: (
                            <InputAdornment position='start'>
                                <SearchIcon fontSize='small' />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            props.search ?
                                <InputAdornment>
                                    <IconButton onClick={() => props.setSearch('')}>
                                        <CloseRoundedIcon fontSize='small' />
                                    </IconButton>
                                </InputAdornment> : null
                        )
                    }} />
                }
            </div>
        </div>
    )
}