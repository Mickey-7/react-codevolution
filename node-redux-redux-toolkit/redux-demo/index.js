console.log("from index.js")
// Redux Store
const  redux = require('redux')
const createStore = redux.createStore
// Bind Action Creators
const bindActionCreators = redux.bindActionCreators
// Combine Reducers
const combineReducers =redux.combineReducers
// Redux Logger - Middleware
const applyMiddleware = redux.applyMiddleware
const reduxLogger = require('redux-logger')
const logger = reduxLogger.createLogger()

// Actions
const CAKE_ORDERED = "CAKE_ORDERED"

function orderCake() {
    return {
        type:CAKE_ORDERED,
        payload:1
    }
}

// Cake Restocked
const CAKE_RESTOCKED = "CAKE_RESTOCKED";
function restockCake(qty = 1) {
    return{
        type:CAKE_RESTOCKED,
        payload:qty 
    }
}

// action - is an object with type property
    // {
    //     type:CAKE_ORDERED,
    //     quantity:1
    // }
// action creator - is a function that returns an object
    // function orderCake() {
    //     return {
    //         type:CAKE_ORDERED,
    //         quantity:1
    //     }
    // }

// Multiple Reducers
const ICECREAM_ORDERED = "ICECREAM_ORDERED";
const ICECREAM_RESTOCKED = "ICECREAM_RESTOCKED";

function orderIceCream(qty = 1) {
    return {
        type:ICECREAM_ORDERED,
        payload:qty
    }
}

function restockIceCream(qty = 1) {
    return{
        type : ICECREAM_RESTOCKED,
        payload : qty
    }
}


// Reducers
// (previousState, action) => newState

// const initialState = {
//     numberOfCakes:10,
//     // Multiple Reducers
//     numberOfIceCreams:20
// }

// another approach multiple reducers
const initialCakeState = {
    numberOfCakes:10
}
const initialIceCreamState = {
    numberOfIceCreams:20
}

// const reducer = (state = initialState, action) => {
//     switch (action.type) {
//         case CAKE_ORDERED:
//             return{
//                 ...state,
//                 numberOfCakes: state.numberOfCakes - 1
//             }
//         // added for restock
//         case CAKE_RESTOCKED:
//             return{
//                 ...state,
//                 numberOfCakes: state.numberOfCakes + action.payload
//             }
//             // Multiple Reducers
//         case ICECREAM_ORDERED:
//             return{
//                 ...state,
//                 numberOfIceCreams: state.numberOfIceCreams - 1 
//             }
//         case ICECREAM_RESTOCKED:
//             return{
//                 ...state,
//                 numberOfIceCreams: state.numberOfIceCreams + action.payload
//             }
//         default:
//             return state;
//     }
// }

// another approach multiple reducers
const cakeReducer = (state = initialCakeState, action) => {
    switch (action.type) {
        case CAKE_ORDERED:
            return{
                ...state,
                numberOfCakes: state.numberOfCakes - 1
            }
        // added for restock
        case CAKE_RESTOCKED:
            return{
                ...state,
                numberOfCakes: state.numberOfCakes + action.payload
            }
        default:
            return state;
    }
}

const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch (action.type) {
            // Multiple Reducers
        case ICECREAM_ORDERED:
            return{
                ...state,
                numberOfIceCreams: state.numberOfIceCreams - 1 
            }
        case ICECREAM_RESTOCKED:
            return{
                ...state,
                numberOfIceCreams: state.numberOfIceCreams + action.payload
            }
        default:
            return state;
    }
}

// Combined Reducers
const rootReducer = combineReducers({
    cake:cakeReducer,
    iceCream:iceCreamReducer
})

const store = createStore(rootReducer,
    // Redux Logger - Middleware
    applyMiddleware(logger)
    )
// Redux Store
// const store = createStore(reducer);
console.log('initial state', store.getState())

const unsubscribe = store.subscribe(() => 
    {
        // commented out as the middleware logger will do the logging
        // console.log('update state', store.getState())
    }
)
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// //added for restock
// store.dispatch(restockCake(3))
// Bind Action Creators
const actions = bindActionCreators({orderCake, restockCake,
    // Multiple Reducers
        orderIceCream, restockIceCream
    }, store.dispatch)

actions.orderCake()
actions.orderCake()
actions.orderCake()
actions.restockCake(3)
//Multiple Reducers
actions.orderIceCream()
actions.orderIceCream()
actions.restockIceCream(2)
unsubscribe();
 

