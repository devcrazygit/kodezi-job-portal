import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import LocalStorage from "../../global/LocalStorage";
import commonApi from "../../modules/api/common";
import { addAsyncCases, AsyncState, reducerUtils } from "../../modules/lib/reducerUtils";
import { SessionData } from "../../types/models/session";

export type SessionState = AsyncState<SessionData>;

const initialState = reducerUtils.initial() as SessionState;

export const getSession = createAsyncThunk<SessionData, void>(
    'session/info',
    commonApi.getSession
);

export const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        signOut() {
            LocalStorage.removeToken();
            return { ...initialState, initial: false };
        },
        sessionInit() {
            return { ...initialState };
        },
        setSession(state, action) {
            const { payload } = action;
            return { ...state, data: payload };
        },
    },
    extraReducers: (builder) => {
        addAsyncCases(builder, getSession);
    }
});
const sessionReducer = sessionSlice.reducer;
export default sessionReducer;

export const { signOut, sessionInit, setSession } = sessionSlice.actions;