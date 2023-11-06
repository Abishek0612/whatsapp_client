import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'


const initialState = {
    status: '',
    error: '',
    user: {
        id: "",
        name: "",
        email: "",
        picture: "",
        status: "",
        token: "",
    }
}

// User Action (Register)

export const registerUserAction = createAsyncThunk(
    'auth/register', async (values, { rejectWithValue }) => {
        try {
            const { data } = await axios.post('http://localhost:8000/api/v1/auth/register', {
                ...values,
            });
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.error.message)
        }
    })

    // Login Action
export const loginUserAction = createAsyncThunk(
    'auth/login', async (values, { rejectWithValue }) => {
        try {
            const { data } = await axios.post('http://localhost:8000/api/v1/auth/login', {
                ...values,
            });
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.error.message)
        }
    })



//Slice

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            state.status = "";
            state.error = "";
            state.user = {
                id: "",
                name: "",
                email: "",
                picture: "",
                status: "",
                token: "",
            }
        },
        changeStatus: (state, action) => {
            state.action = action.payload;
        }
    },

    extraReducers(builder) {
        //Register Slice  (pending)
        builder.addCase(registerUserAction.pending, (state, action) => {
            state.status = "loading";
        })
        //  (Fullfilled)     
        builder.addCase(registerUserAction.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.error = "";
            state.user = action.payload.user;
        })

        //  (Rejected)     
        builder.addCase(registerUserAction.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        });


        //Login Slice  (pending)
        builder.addCase(loginUserAction.pending, (state, action) => {
            state.status = "loading";
        })
        //  (Fullfilled)     
        builder.addCase(loginUserAction.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.error = "";
            state.user = action.payload.user;
        })

        //  (Rejected)     
        builder.addCase(loginUserAction.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        });
    },
})

export const { logout , changeStatus} = userSlice.actions

export default userSlice.reducer