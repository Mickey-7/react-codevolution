// for dispatching actions from cake
const cakeActions = require("./features/cake/cakeSlice").cakeActions
// for disptaching actions from icecream
const icecreamActions = require('./features/icecream/icecreamSlice').icecreamActions
// for async thunk
const  fetchUsers = require('./features/user/userSlice').fetchUsers
// Include the abortcontroller-polyfill
require('abortcontroller-polyfill/dist/abortcontroller-polyfill-only');


// import store
const store = require('./app/store')

console.log('Initial state ',store.getState())

const unsubscribe = store.subscribe(() => {
    // commented out for redux-logger
    // console.log('updated state ',store.getState())
    
    // added back for extraReducers
    console.log('updated state ',store.getState())
})



// store.dispatch(cakeActions.ordered())
// store.dispatch(cakeActions.ordered())
// store.dispatch(cakeActions.ordered())
// store.dispatch(cakeActions.restocked(3))

// store.dispatch(icecreamActions.ordered())
// store.dispatch(icecreamActions.ordered())
// store.dispatch(icecreamActions.restocked(2))

// for async thunk
store.dispatch(fetchUsers())

// unsubscribe()