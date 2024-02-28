const createSlice = require('@reduxjs/toolkit').createSlice

const initialState = {
    numberOfIcecreams : 20
}
const icecreamSlice = createSlice({
    name:'icecream',
    initialState,
    reducers:{
        ordered: (state, action) => {
            state.numberOfIcecreams--
        },
        restocked : (state, action) => {
            state.numberOfIcecreams += action.payload
        }
    },
    // added for extra reducers
    extraReducers : (builder) => {
        // the cake/ordered if from name and reducers key identifier inside the createSlice
        builder.addCase("cake/ordered", (state, action) => {
            state.numberOfIcecreams-- 
        }) 
    }
})

module.exports = icecreamSlice.reducer
module.exports.icecreamActions = icecreamSlice.actions