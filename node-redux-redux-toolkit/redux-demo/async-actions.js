//add the store
const redux = require('redux')
const createStore = redux.createStore
// Redux-Thunk Middleware
const axios = require('axios')
const thunkMiddleware = require('redux-thunk').thunk
const applyMiddleware = redux.applyMiddleware

// state
const initialState = {
    loading:false,
    data:[],
    error:""
}
// actions
const FETCH_USERS_REQUESTED = "FETCH_USERS_REQUESTED";
function fetchUsersRequest() {
    return{
        type:FETCH_USERS_REQUESTED,
    }
}

const FETCH_USERS_SUCCEEDED = "FETCH_USERS_SUCCEEDED"; 
function fetchUsersSuccess(users) {
    return{
        type:FETCH_USERS_SUCCEEDED,
        payload:users
    }
}

const FETCH_USERS_FAILED = "FETCH_USERS_FAILED";
function fetchUsersFailure(error) {
    return{
        type:FETCH_USERS_FAILED,
        payload:error
    }
}

// reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUESTED:
            return{
                ...state,
                loading:true
            }
        case FETCH_USERS_SUCCEEDED:
            return{
                loading:false,
                users: action.payload,
                error: ""
            }    
        case FETCH_USERS_FAILED:
            return{
                loading:false,
                users: [],
                error:action.payload
            }
        default:
            state;
    }
}

// Action Creator - Redux-Thunk Middleware - returns function and not object
const fetchUsers = () => {
    return function (dispatch) {
        dispatch(fetchUsersRequest())
        axios
            .get('https://jsonplaceholder.typicode.com/users')
            //for testing catch
            // .get('https://jsonplaceholder.typicode.com/usersasdf')
            .then(response => {
                //response.data is the users
                const users = response.data.map(user => user.id)
                dispatch(fetchUsersSuccess(users))
            })
            .catch(error => {
                //error.message is the error message
                dispatch(fetchUsersFailure(error.message))
            })
    }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware))
store.subscribe(() => {console.log(store.getState())})
store.dispatch(fetchUsers())


// terminal output
// success
// node async-actions
// { loading: true, data: [], error: '' }
// {
//   loading: false,
//   users: [
//     1, 2, 3, 4,  5,
//     6, 7, 8, 9, 10
//   ],
//   error: ''
// }
// error
// node async-actions
//{ loading: true, data: [], error: '' }
// {
//   loading: false,
//   users: [],
//   error: 'Request failed with status code 404'
// }