import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
    name: 'requestSearch',
    initialState: {
        request: '',
        estoque: [],
        servicos: [],
        ficha: [],
        idDone: '',
        todosEstoque: false,
        registro: [],
        atvRec: [],
        codigoProd: null,
        estoquePesquisa: [],
        registroPesquisa: [],
        openPopUpVenda: false,
        openPopUpNota: false,
        todosRegistros: false,
        qrCodeData: '',
        sendEmail: false,
        vendaAtiva: [],
        listaNota: [],
        listaNotaTrated: [],
        info: {}
    },
    reducers: {
        setSearch: (state, { payload }) => {
            state.request = payload
        },
        setTodosEstoque: (state, { payload }) => {
            state.todosEstoque = payload
        },
        setAtvRec: (state, {payload}) => {
            state.atvRec.unshift(payload)
        },
        setIdDone: (state, {payload}) => {
            state.idDone = payload
        },
        setOpenPopUpNota: (state, { payload }) => {
            state.openPopUpNota = payload
        },
        setCodProduto: (state, {payload}) => {
            payload == 'limpar' ? state.codigoProd = '' : state.codigoProd = payload
        },
        setOpenPopUpVenda: (state, { payload }) => {
            state.openPopUpVenda = payload
        },
        setTodosRegistros: (state, {payload}) => {
            state.todosRegistros =  payload
        },
        setQrCodeData: (state, { payload }) => {
            state.qrCodeData = payload
        },
        setSendEmail: (state) => {
            state.sendEmail = !state.sendEmail
        },
        setVendaAtiva: (state, { payload }) => {
            state.vendaAtiva.unshift(payload)
        },
        setEstoque: (state, { payload }) => {
            state.estoque.unshift(payload)
        },
        setFicha: (state, { payload }) => {
            state.ficha.unshift(payload)
        },
        setRegistro: (state, { payload }) => {
            state.registro.unshift(payload)
        },
        setEstoquePesquisa: (state, {payload}) => {
           payload == 'limpar' ? state.estoquePesquisa = [] : state.estoquePesquisa.unshift(payload)
        },
        setRegistroPesquisa: (state, {payload}) => {
            payload == 'limpar' ? state.registroPesquisa = [] : state.registroPesquisa.unshift(payload)
        },
        setRemoveFicha: (state, { payload }) => {
            const newFicha = state.ficha.filter(docs => docs.idFicha !== payload)
            state.ficha = newFicha
        },
        setRemoveListaNota: (state, {payload}) => {
            const newListaNota = state.listaNota.filter(docs => docs.idColl !== payload)
            state.listaNota = newListaNota
        },
        setRemoveEstoque: (state, { payload }) => {
            const newEstoque = state.estoque.filter(docs => docs.idEstoque !== payload)
            state.estoque = newEstoque
        },
        setRemoveRegistro: (state, { payload }) => {
            const newRegistro = state.registro.filter(docs => docs.idRegistro !== payload)
            state.registro = newRegistro
        },
        setListaNota: (state, { payload }) => {
           state.listaNota.unshift(payload)
        },
        setRemoveVendaAtiva: (state, { payload }) => {
            const newVenda = state.vendaAtiva.filter(docs => docs.idProduto !== payload)
            state.vendaAtiva = newVenda
        },
        setInfo: (state, { payload }) => {
            state.info = payload
        }
    }
})

export const { setSearch, setIdDone, setOpenPopUpNota, setRegistroPesquisa, setEstoquePesquisa, setAtvRec, setTodosRegistros, setCodProduto, setTodosEstoque, setRemoveListaNota, setOpenPopUpVenda, setInfo, setRemoveEstoque, setRemoveFicha, setRemoveRegistro, setFicha, setRegistro, setEstoque, setListaNota, setQrCodeData, setSendEmail, setVendaAtiva, setRemoveVendaAtiva } = slice.actions

export default slice.reducer