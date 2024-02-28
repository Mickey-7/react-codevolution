// import createSlice
const createSlice = require('@reduxjs/toolkit').createSlice
// import async thunk
const createAsyncThunk = require('@reduxjs/toolkit').createAsyncThunk
// import axios
const axios = require('axios')


const initialState = {
    loading:false,
    users:[],
    error:""
}

// createAsyncThunk - generates pending, fulfilled and rejected action types
const fetchUsers = createAsyncThunk('user/fetchUsers',
        () => {
            return axios
                // .get('https://jsonplaceholder.typicode.com/users')
                // for testing error scenario
                .get('https://jsonplaceholder.typicode.com/usersfasdfa')
                .then((response) => {
                    // return id only
                    return response.data.map((user) => user.id)
                })
                // catch block is not needed as error are handled
        })


const userSlice = createSlice({
    name:'user',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false
            state.users = action.payload
            state.error = ""
        })
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false
            state.users = []
            state.error = action.error.message
        })
    }
})

// export the userSlice
module.exports = userSlice.reducer
module.exports.fetchUsers = fetchUsers