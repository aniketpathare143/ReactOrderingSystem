import { configureStore } from "@reduxjs/toolkit";
import DataReducer from './Slice';

const store =
    configureStore({
        reducer: {
            Data: DataReducer
        }
    })

export default store;