import { createSlice } from "@reduxjs/toolkit";
const slice =
    createSlice({
        name: 'sliceData',
        initialState: {
            ordersData: []
        },
        reducers: {
            AddOrderData: (state, action) => {
                //console.log(action.payload);
                state.ordersData.push(action.payload);
                //state.ordersData = action.payload;
                //console.log(state.ordersData);
            },
            DeleteOrderData: (state, action) => {
                console.log("Id recieved is :=" + action.payload);
                const { id } = action.payload;
                state.ordersData = state.ordersData.filter(item => item.id !== id)
                console.log(state.ordersData);
            }
        }
    })

export default slice.reducer;
export const { AddOrderData, DeleteOrderData } = slice.actions;