import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  number: [],
  isLoading: false,
  error: null,
};

export const __getSeung = createAsyncThunk(
  'seungSlice/getCounter',
  async (payload, thunkAPI) => {
    console.log('안녕 ', payload);
    const token = localStorage.getItem('token');
    try {
      const data = await axios.get('https://chamchimayo.shop/users', payload, {
        heders: {
          'Content-Type': `application/json`,
          Authorization: `Bearer ${token}`,
        },
      });
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __postSeung = createAsyncThunk(
  'seungSlice/postCounter',
  async (payload, thunkAPI) => {
    console.log('안녕 ', payload);
    try {
      const data = await axios.post(
        'https://chamchimayo.shop/users/login',
        payload
      );
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const seungSlice = createSlice({
  name: 'seung',
  initialState,
  reducers: {},
  extraReducers: {
    [__getSeung.pending]: (state) => {
      state.isLoading = true;
    },
    [__getSeung.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.number = action.payload;
    },
    [__getSeung.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [__postSeung.pending]: (state) => {
      state.isLoading = true;
    },
    [__postSeung.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.number.push(action.payload);
    },
    [__postSeung.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
  },
});

export const {} = seungSlice.actions;
export default seungSlice.reducer;
