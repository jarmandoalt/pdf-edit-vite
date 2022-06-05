import { configureStore } from '@reduxjs/toolkit'
import crudReducer from '../reducer/crudReducer';

export const store = configureStore({
    reducer: {
        crud: crudReducer
    }
})