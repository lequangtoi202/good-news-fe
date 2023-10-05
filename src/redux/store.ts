import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './userReducer';
import errorReducer from './errorReducer';
import successReducer from './successReducer';
import commentReducer from './commentReducer';
import bookmarkReducer from './bookmarkReducer';
import adminReducer from './adminReducer';

const rootReducer = combineReducers({
  user: userReducer,
  error: errorReducer,
  success: successReducer,
  comment: commentReducer,
  bookmarks: bookmarkReducer,
  admin: adminReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
