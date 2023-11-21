/* Если будут дополнительные состояния, которое не связано с используемым API, можно создать отдельный slice для этой feature. В этом случае пригодятся  actions, reducers и selectors.
Поскольку в TЗ это не указано, то оставляю пустым */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPost } from './types';

interface InitialState {
  postList: IPost[];
  loading: boolean;
}

const initialState: InitialState = {
  postList: [],
  loading: false,
};

export const postListSlice = createSlice({
  name: 'postList',
  initialState,
  reducers: {
    getPostState: (state, action: PayloadAction<IPost[]>) => {
      state.postList = action.payload;
    },
  },
});

export default postListSlice.reducer;
