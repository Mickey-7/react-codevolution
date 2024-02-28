
const redux = require('redux')
const createStore = redux.createStore
// Immer - immutable updates
const produce = require('immer').produce



const initialState = {
    name: 'Vishwas',
    address:{
        street:'123 Main St',
        city:'Boston',
        state:'MA'
    }
}

const STREET_UPDATED = 'STREET_UPDATED'
function updateStreet(street) {
    return{
        type:STREET_UPDATED,
        payload:street
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case STREET_UPDATED:
            // return{
            //     ...state,
            //     address: {
            //         ...state.address,
            //         street: action.payload
            //     }
            // }
            // Immer - immutable updates
            return produce(state, (draft) => {
                draft.address.street = action.payload
            })
        default:
            return state;
    }
}

const store = createStore(reducer)
console.log('initial state ',store.getState())
const unsubscribe = store.subscribe(() => {
    console.log('update state ',store.getState())
});
store.dispatch(updateStreet('456 Main St')) 
unsubscribe()