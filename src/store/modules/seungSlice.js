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
    // console.log('안녕 ', payload[0], payload[1]);
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
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const { data } = await axios.delete(
        `https://chamchimayo.shop/users/${payload.userId}`,
        { headers }
      );
      return thunkAPI.fulfillWithValue(data);
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
      console.log(action.payload);
      state.isLoading = false;
      state.seung = action.payload.items.item;
      console.log(state.seung);
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
      window.location.href = '/';
    },
    [__deleteSeung.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
  },
});

export const {} = seungSlice.actions;
export default seungSlice.reducer;
