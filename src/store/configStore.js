import { configureStore } from '@reduxjs/toolkit';
import seung from './modules/seungSlice';

const store = configureStore({
  reducer: { seung },
});

export default store;
