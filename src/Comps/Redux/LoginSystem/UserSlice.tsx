import { createSlice , PayloadAction } from "@reduxjs/toolkit";

type User = {
    username: string,
    email: string,
    password: string,
}
type UserState = {
    users: User[];  
    currentUser: User;
    IsLogin: boolean
};

const initialState :UserState = {
    users:[],
    currentUser: {
        username: '',
        email: '',
        password: '',
    },
    IsLogin: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        createUser(state, action: PayloadAction<User>) {
            state.users.push(action.payload);
            state.IsLogin = true;
        },
        setCurrentUser(state, action: PayloadAction<User>) {
            state.currentUser = action.payload;
            state.IsLogin = true;
        },
        logout(state) {
            state.currentUser = {username:'', email: '', password:''} ;
            state.IsLogin = false;
        },
        changePassword(state, action: PayloadAction<{ email: string; password: string }>) {
            const user = state.users.find(user => user.email === action.payload.email);
            if (user) {
                user.password = action.payload.password;
            }
        },
    }
})

export const { createUser,setCurrentUser, logout , changePassword } = userSlice.actions;
export default userSlice.reducer;