import { createSlice } from '@reduxjs/toolkit';
import * as Notifications from 'expo-notifications';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null as Notifications.Notification | null,
  reducers: {
    setNotification: (state, action) => (state = action.payload),
  },
});

export const { setNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
