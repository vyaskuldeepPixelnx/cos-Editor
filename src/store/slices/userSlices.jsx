import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';


export const loginUser = createAsyncThunk(
    "user/loginUser",
    async (loginData, thunkApi) => {
        try {
            const response = await axios.post('http://192.168.29.141:1000/auth/login', loginData,
                {
                    headers: {
                        "Content-type": 'application/json'
                    }
                }
            );
            return response.data
        } catch (e) {
            return thunkApi.rejectWithValue(e.response.data)
        }
    }
)

export const signupUser = createAsyncThunk(
    'user/signupUser',
    async (signupUserData, thunkApi) => {
        try {
            const response = await axios.post('http://192.168.29.141:1000/auth/register', signupUserData,
                {
                    headers: {
                        "Content-type": 'application/json'
                    }
                }
            );
            return response.data
        } catch (e) {
            return thunkApi.rejectWithValue(e.response.data)
        }
    }
)



const userSlice = createSlice({
    name: 'user',
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.userObj = null;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.userObj = action.payload
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
            .addCase(signupUser.pending, (state) => {
                state.userObj = null;
                state.error = null;
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.userObj = action.payload
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
    }
})
export default userSlice.reducer;