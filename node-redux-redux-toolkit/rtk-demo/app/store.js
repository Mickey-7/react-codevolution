// import cakeSlice
const cakeReducer = require("../features/cake/cakeSlice")
// import icecreamSlicw
const icecreamReducer = require('../features/icecream/icecreamSlice')
// for redux-logger
// commented out for extraReducers
// const reduxLogger = require('redux-logger')
const configureStore = require('@reduxjs/toolkit').configureStore
// for redux-logger
// commented out for extraReducers
// const logger = reduxLogger.createLogger()

// for async thunk
const userReducer = require('../features/user/userSlice')

const store = configureStore({
    reducer:{
        cake:cakeReducer,
        icecream:icecreamReducer,
        // for async thunk
        user:userReducer
    }
    // ,
    // for redux-logger
    // commented out for extraReducers
    // middleware : (getDefaultMiddleware) => {
    //     return getDefaultMiddleware().concat(logger)
    // }
})

module.exports = store