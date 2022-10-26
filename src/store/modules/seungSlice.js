import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  seung: [],
  isLoading: false,
  error: null,
};

export const __deleteSeung = createAsyncThunk(
  'seungSlice/delete',
  async (payload, thunkAPI) => {
    console.log('안녕 ', payload);
    try {
      const data = await axios.delete(
        `https://chamchimayo.shop/users/${payload.userNum}`,
        {
          headers: {
            Authorization: `Bearrer ${payload.userNum}`,
          },
          headers: {
            Authorization: `Bearrer ${payload.userId}, ${payload.password}`,
          },
        }
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
    [__deleteSeung.pending]: (state) => {
      state.isLoading = true;
    },
    [__deleteSeung.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.seung = state.seung.filter((a) => {
        return a.num !== action.payload;
      });
    },
    [__deleteSeung.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
  },
});

export const {} = seungSlice.actions;
export default seungSlice.reducer;
