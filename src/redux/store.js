import { configureStore } from '@reduxjs/toolkit'
import loginSlice from './login'
import searchSlice from './searchSlice'

export default configureStore({
    reducer: {
        requestSearch: searchSlice,
        login: loginSlice
    }
})