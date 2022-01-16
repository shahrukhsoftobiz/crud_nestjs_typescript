import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../../app/store';
import axios from 'axios';

interface IUser {
  id?: string;
  name?: string;
  age?: number;
  position?: string;
  gender?: string;
}

export interface UserState {
  user: [IUser]
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UserState = {
  user: [{}],
  status: 'idle',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUser: (state: any, action: PayloadAction<string>) => {
      state.user = action.payload;
    },
  },
   
});

export const { getUser } = userSlice.actions;

export const getUserAsync = (): AppThunk => async (
  dispatch,
) => {
  const {data} = await axios.get ('http://localhost:3000/users');
    dispatch(getUser(data));
  };

  export const AddUserAsync = (user: any): AppThunk => async (
    dispatch
  ) => {
    const data =  await axios.post('http://localhost:3000/users', user)
    console.log(data)
    dispatch(getUserAsync());
  };

  export const RemoveUserAsync = (userId: any,): AppThunk => async (dispatch) => {
    await axios.delete(`http://localhost:3000/users/${userId}`);

};

export default userSlice.reducer;
