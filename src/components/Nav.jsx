import React from 'react'
import { Link } from "react-router-dom";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import LogoImg from '../assets/logo-cti.png'
import FeedIcon from '@mui/icons-material/Feed';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import InventoryIcon from '@mui/icons-material/Inventory';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from '../firebase/firebase.js'
import { stringAvatar } from '../components/imageDefault'
import Avatar from '@mui/material/Avatar';
import { useSelector } from 'react-redux'
import './Nav.css'

export default function Nav(props) {

        const { userInformation } = useSelector(state => state.login)

        return (
                <nav>
                        <div id='title'>
                                <img src={LogoImg} />
                                <h1>CTI informática</h1>
                        </div>
                        <div id='boxNavigation'>
                                <ul>
                                        <li>
                                                <Link to='/Dashboard'>
                                                        <HomeRoundedIcon fontSize='large' />
                                                        <span id='menu'> Dashboard</span>
                                                </Link>
                                        </li>
                                        <li>
                                                <Link to='/Ficha'>
                                                        <FeedIcon fontSize='large' />
                                                        <span id='menu'>Ficha de entrada</span>
                                                </Link>
                                        </li>
                                        <li>
                                                <Link to='/Estoque'>
                                                        <span><InventoryIcon fontSize='large' /></span>
                                                        <span id='menu'>Estoque</span>
                                                </Link>
                                        </li>

                                        <li>
                                                <Link to='/Registro'>
                                                        <DnsRoundedIcon fontSize='large' />
                                                        <span id='menu'>Registros</span>
                                                </Link>
                                        </li>

                                        <li>
                                                <Link to='/Config'>
                                                        <SettingsIcon fontSize='large' />
                                                        <span id='menu'>Configurações</span>
                                                </Link>
                                        </li>

                                        <li onClick={e => logout(props.islogin)} style={{ marginLeft: '3.5%' }}>
                                                <Link to='#'>
                                                        <LogoutIcon fontSize='large' />
                                                        <span id='menu'>Sair</span>
                                                </Link>
                                        </li>
                                </ul>
                                <div>
                                        {userInformation.foto ? <Avatar src={userInformation.foto} sx={{ height: 230, width: 230, marginLeft: 'auto', marginRight: 'auto'}} /> : userInformation.nome ? <Avatar {...stringAvatar(userInformation.nome.toUpperCase(), 0, 230, 230)} /> : null}
                                </div>
                        </div>
                </nav>
        )
} 
