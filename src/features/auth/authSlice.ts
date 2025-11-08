import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { LoginPayload, User } from 'src/models'; 

export interface AuthState {
    isLoggedIn: boolean;
    isLogging: boolean;
    currentUser?: User;
}

const initialState: AuthState = {
    isLoggedIn: false,
    isLogging: false,
    currentUser: undefined,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<LoginPayload>) {
            state.isLogging = true;
        },
        loginSuccess(state, action: PayloadAction<User>) {
            state.isLoggedIn = true;
            state.isLogging = false;
            state.currentUser = action.payload;
        },
        loginFailed(state, action: PayloadAction<string>) {
            state.isLoggedIn = false;
            state.isLogging = false;
        },
        logout(state) {
            state.isLoggedIn = false;
            state.currentUser = undefined;
        },
    },
});

// Actions
export const authActions = authSlice.actions;

// Selectors
export const selectIsLoggedIn = (state: any) => state.auth.isLoggedIn;
export const selectIsLogging = (state: any) => state.auth.isLogging;
export const selectCurrentUser = (state: any) => state.auth.currentUser;

// Reducers
const authReducer = authSlice.reducer;
export default authReducer;
