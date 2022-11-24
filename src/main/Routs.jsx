import React from 'react'
import { Route, Routes} from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Ficha from '../pages/FichaDeEntrada'
import GerarNotaServico from '../pages/GerarNotaServico'
import Login from '../login_window/Login'
import Estoque from '../pages/Estoque'
import Registro from '../pages/Registro'
import Config from '../pages/Config'
import RegistrarVenda from '../pages/RegistrarVenda'
import InfoFicha from '../pages/infoFicha'
import InfoDashboard from '../pages/InfoDashboard'
import GerarFicha from '../pages/GerarFichaDeEntrada'
import RegistrarProduto from '../pages/RegistrarProduto'
import InfoEstoque from '../pages/InfoEstoque'

export default props =>

    <Routes>
        <Route path='/Dashboard' element={<Dashboard />} />
        <Route path='/InfoDashboard' element={<InfoDashboard />} />
        <Route path='/InfoEstoque' element={<InfoEstoque />} />
        <Route path='/RegistrarProduto' element={<RegistrarProduto />} />
        <Route path='/InfoFicha' element={<InfoFicha />} />
        <Route path='/GerarFicha' element={<GerarFicha />} />
        <Route path='/GerarNotaServico' element={<GerarNotaServico />} />
        <Route path='/RegistrarVenda' element={<RegistrarVenda />} />
        <Route path='/Ficha' element={<Ficha />} />
        <Route path='/' element={<Login />} />
        <Route path='/Estoque' element={ <Estoque /> } />
        <Route path='/Registro' element={ <Registro /> } />
        <Route path='/Config' element={ <Config /> } />
    </Routes>