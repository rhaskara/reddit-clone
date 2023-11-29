import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import listingReducer from '@/redux/features/listingSlice';
import viewReducer from '@/redux/features/viewTypeSlice';
import articleReducer from '@/redux/features/articleSlice';

const store = configureStore({
  reducer: {
    listing: listingReducer,
    view: viewReducer,
    article: articleReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;