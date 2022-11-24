import React from 'react'
import { setRemoveVendaAtiva, setIdDone, setVendaAtiva, setOpenPopUpVenda, setListaNota, setOpenPopUpNota, setRemoveListaNota, setFicha, setRemoveFicha, setCodProduto, setEstoque, setRemoveEstoque, setRegistro, setRemoveRegistro } from '../redux/searchSlice';
import { useDispatch, useSelector } from 'react-redux'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase/firebase.js'

export default function Listeners() {

    const { userInformation } = useSelector(state => state.login)

    const vendaAtivaRef = collection(db, `VendaAtiva-${userInformation.uid}`)
    const registrosRef = collection(db, 'Registros')
    const notaAtivaRef = collection(db, `NotaAtiva-${userInformation.uid}`)
    const doneVendaRef = collection(db, `DoneVenda-${userInformation.uid}`)
    const doneNotaRef = collection(db, `DoneNota-${userInformation.uid}`)
    const codProdutoRef = collection(db, `CodProduto-${userInformation.uid}`)
    const estoqueRef = collection(db, 'Estoque')
    const fichaRef = collection(db, 'Ficha')
    const dispatch = useDispatch()
    const { todosRegistros, todosEstoque } = useSelector(state => state.requestSearch)

    React.useEffect(() => {
        if (todosRegistros) onSnapshot(registrosRef, (snapshot) => snapshot.docChanges().forEach(change => {
            if (change.type == 'added') dispatch(setRegistro({ idRegistro: change.doc.id, ...change.doc.data() }))
            else if (change.type == 'removed') dispatch(setRemoveRegistro(change.doc.id))
        }))
    }, [todosRegistros])

    React.useEffect(() => {
        if (todosEstoque) onSnapshot(estoqueRef, (snapshot) => snapshot.docChanges().forEach(change => {
            if (change.type == 'added') dispatch(setEstoque({ idEstoque: change.doc.id, ...change.doc.data() }))
            else if (change.type == 'removed') dispatch(setRemoveEstoque(change.doc.id))
        }))
    }, [todosEstoque])

    React.useEffect(() => {
        onSnapshot(notaAtivaRef, (snapshot) => snapshot.docChanges().forEach(change => {
            if (change.type == 'added') {
                if (change.doc.data().Servico) dispatch(setListaNota({ tipo: 'Serviço', idColl: change.doc.id, ...change.doc.data() }))
                else dispatch(setListaNota({ tipo: 'Venda', idColl: change.doc.id, ...change.doc.data() }))
            }
            else if (change.type == 'removed') dispatch(setRemoveListaNota(change.doc.id))
        }))

        onSnapshot(doneVendaRef, snapshot => snapshot.docChanges().forEach(change => {
            if (change.type == 'added') dispatch(setOpenPopUpVenda(true))
        }))

        onSnapshot(doneNotaRef, snapshot => snapshot.docChanges().forEach(change => {
            if (change.type == 'added') dispatch(setOpenPopUpNota(true))
        }))

        onSnapshot(fichaRef, (snapshot) => snapshot.docChanges().forEach(change => {
            if (change.type == 'added') dispatch(setFicha({ idFicha: change.doc.id, ...change.doc.data() }))
            else if (change.type == 'removed') dispatch(setRemoveFicha(change.doc.id))
        }))

        onSnapshot(codProdutoRef, (snapshot) => snapshot.docChanges().forEach(change => {
            if (change.type == 'added') dispatch(setCodProduto({ ...change.doc.data(), idCodigo: change.doc.id }))
            else if (change.type == 'removed') dispatch(setCodProduto('limpar'))
        }))

        onSnapshot(vendaAtivaRef, (snapshot) => snapshot.docChanges().forEach(change => {
            if (change.type == 'added') dispatch(setVendaAtiva({ idProduto: change.doc.id, ...change.doc.data() }))
            else if (change.type == 'removed') dispatch(setRemoveVendaAtiva(change.doc.id))
        }))
    }, [])

    return (
        <React.Fragment />
    )

}