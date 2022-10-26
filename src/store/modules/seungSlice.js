import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  number: [],
  isLoading: false,
  error: null,
};

export const __getCounter = createAsyncThunk(
  'seungSlice/getCounter',
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get('http://localhost:3001/matjip');
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
    [__getCounter.pending]: (state) => {
      state.isLoading = true;
    },
    [__getCounter.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.number = action.payload;
    },
    [__getCounter.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
  },
});

export const {} = seungSlice.actions;
export default seungSlice.reducer;
