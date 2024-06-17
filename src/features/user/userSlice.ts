import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  token: string | null;
}

const initialState: UserState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  token: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    registerUser:(state, action: PayloadAction<UserState>) => {
        state.name = action.payload.name
        state.email = action.payload.email
        state.password = action.payload.password
        state.confirmPassword = action.payload.confirmPassword
        state.token = action.payload.token;
    },
    unRegisterUser:(state) => {
      state.name = ''
      state.email = ''
      state.password = ''
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setConfirmPassword: (state, action: PayloadAction<string>) => {
      state.confirmPassword = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },

   
  },
});

export const { registerUser, setName, setEmail, setPassword, setConfirmPassword, setToken } = userSlice.actions;

export default userSlice.reducer;
