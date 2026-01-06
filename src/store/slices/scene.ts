import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum JoinStatus {
  NotJoined = 'notJoined',
  Joinning = 'joinning',
  Joined = 'joined',
}

export interface SceneState {
  joinStatus: JoinStatus;
}

/**
 * 当前用户信息
 */
export const sceneSlice = createSlice({
  name: 'scene',
  initialState: {
    joinStatus: JoinStatus.NotJoined,
  } as SceneState,
  reducers: {
    setJoining: (state, action: PayloadAction<JoinStatus>) => {
      state.joinStatus = action.payload;
    },
  },
});

export const { setJoining } = sceneSlice.actions;

export default sceneSlice.reducer;
