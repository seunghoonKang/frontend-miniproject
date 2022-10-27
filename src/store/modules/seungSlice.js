import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  seung: [],
  isLoading: false,
  error: null,
};
// 홈 화면
export const __getSeung = createAsyncThunk(
  'seungSlice/get',
  async (payload, thunkAPI) => {
    // console.log('안녕 ', payload[0]);
    try {
      const data = await axios.get(
        `https://chamchimayo.shop/pharmacyList?Q0=${payload[0]}&Q1=${payload[1]}`
      );
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 로그인 삭제
export const __deleteSeung = createAsyncThunk(
  'seungSlice/delete',
  async (payload, thunkAPI) => {
    // console.log('안녕 ', payload);
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
    [__getSeung.pending]: (state) => {
      state.isLoading = true;
    },
    [__getSeung.fulfilled]: (state, action) => {
      // console.log(action.payload.items.item);
      state.isLoading = false;
      state.seung = action.payload.items.item;
    },
    [__getSeung.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
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
