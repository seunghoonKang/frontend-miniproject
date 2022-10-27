import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: [{}],
  isLoading: false,
  error: null,
};

export const __getUserInfo = createAsyncThunk(
  'hoonSlice/getUserInfo',
  async (payload, thunkAPI) => {
    const token = localStorage.getItem('token');
    try {
      const getUser = await axios.get(`https://chamchimayo.shop/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return thunkAPI.fulfillWithValue(getUser.data.getUser);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const __modifyUserInfo = createAsyncThunk(
  'hoonSlice/modifyUserInfo',
  async (payload, thunkAPI) => {
    const token = localStorage.getItem('token');
    const ninckName = { nickname: payload.nickname };
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const { data } = await axios.put(
        `https://chamchimayo.shop/users/${payload.userId}`,
        ninckName,
        { headers }
      );
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const hoonSlice = createSlice({
  name: 'hoon',
  initialState,
  reducers: {},
  extraReducers: {
    [__getUserInfo.pending]: (state) => {
      state.isLoading = true;
    },
    [__getUserInfo.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    [__getUserInfo.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [__modifyUserInfo.pending]: (state) => {
      state.isLoading = true;
    },
    [__modifyUserInfo.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = { ...state.user, nickname: action.meta.arg.nickname };
    },
    [__modifyUserInfo.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
  },
});

export const {} = hoonSlice.actions;
export default hoonSlice.reducer;
