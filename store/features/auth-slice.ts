import { createSlice, PayloadAction } from '@reduxjs/toolkit'


type initialStateType = {
    value: {
        isAuth: boolean,
        user: userType | {}
    }
}

const initialState: initialStateType = {
    value: {
        isAuth: false,
        user: {}
    }
}

export const auth = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logOut: () => {
            return initialState
        },

        setUser: (state, action: PayloadAction<string>) => {
            return {
                value: {
                    isAuth: true,
                    user: action.payload
                }
            }
        }
    }
})


export const { logOut, setUser } = auth.actions;
export default auth.reducer