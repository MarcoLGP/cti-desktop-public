import React from 'react'
import Nav from '../components/Nav'
import Content from '../components/Content'
import Routs from './Routs'
import './App.css'
import Titlebar from '../components/TitleBar'
import { onAuthStateChanged, auth } from '../firebase/firebase.js'
import { useDispatch } from 'react-redux'
import { setUserInfo } from '../redux/login.js'
import Listeners from '../pages/Listeners'

export default function App() {

        const [islogin, setIslogin] = React.useState(false)
        const dispatch = useDispatch()

        React.useEffect(() => {
                onAuthStateChanged(auth, (user) => {
                        if (user) {
                                dispatch(setUserInfo(user))
                                setIslogin(true)
                        }
                })
        }, [])

        return (
                <React.Fragment>
                        {islogin ? <div id="app">
                                <Nav islogin={islogin} />
                                <Routs />
                                <Content />
                                <Titlebar />
                                <Listeners />
                        </div> : null}
                </React.Fragment>
        )
}
