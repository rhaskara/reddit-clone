import { createSlice } from '@reduxjs/toolkit';
import { ViewMode } from '@/utils';

const initialState = {
  mode: ViewMode.CLASSIC,
};

const viewSlice = createSlice({
  name: 'view',
  initialState,
  reducers: {
    setViewMode: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const setView = (mode) => (dispatch) => {
  dispatch(setViewMode(mode));
};

export const { setViewMode } = viewSlice.actions;

export default viewSlice.reducer;