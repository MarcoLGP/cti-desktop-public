import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
    name: 'login',
    initialState: {
        userInformation: null,
        image: null,
        fichaId: null
    },
    reducers: {
        setUserInfo: (state, {payload}) => {
            state.userInformation = {
               nome: payload.displayName,
               email: payload.email,
               foto: payload.photoURL,
               uid: payload.uid
           }},
        setPhotoPreview: (state, {payload}) => {
            state.userInformation.foto = payload
        },
        setImage: (state, {payload}) => {
            state.image = payload
        },
        setFichaId: (state, {payload}) => {
            state.fichaId = payload
        }
    }
})

export const { setUserInfo, setPhotoPreview, setImage, setFichaId } = slice.actions

export default slice.reducer