import { configureStore } from '@reduxjs/toolkit';
import seung from './modules/seungSlice';
import hoon from './modules/hoonSlice';

const store = configureStore({
  reducer: { seung, hoon },
});

export default store;
