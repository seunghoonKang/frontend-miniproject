import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  number: [],
  isLoading: false,
  error: null,
};

export const __patchSeung = createAsyncThunk(
  'seungSlice/patchCounter',
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

const seungSlice = createSlice({
  name: 'seung',
  initialState,
  reducers: {},
  extraReducers: {
    [__patchSeung.pending]: (state) => {
      state.isLoading = true;
    },
    [__patchSeung.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.number = action.payload;
    },
    [__patchSeung.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
  },
});

export const {} = seungSlice.actions;
export default seungSlice.reducer;
