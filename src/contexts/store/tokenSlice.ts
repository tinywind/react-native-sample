import { createSlice } from '@reduxjs/toolkit';

const tokenSlice = createSlice({
  name: 'token',
  initialState: null as string | null,
  reducers: {
    setToken: (state, action) => (state = action.payload),
  },
});

export const { setToken } = tokenSlice.actions;

export default tokenSlice.reducer;
