import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  addGroup,
  deleteGroup,
  fetchGroups,
  moveGroups,
} from '../thunks/groupThunks';

export type Group = {
  id: string;
  name: string;
  userEmail: string;
  totalCards: number;
  new: number;
  inProgress: number;
  studied: number;
  parent: string | null;
  children: Group[];
  cards: string[];
  createdAt: string;
  updatedAt: string;
};

export type GroupState = {
  groups: Group[];
  loading: boolean;
  error: string | null;
};

const initialState: GroupState = {
  groups: [],
  loading: false,
  error: null,
};

const groupSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroups.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchGroups.fulfilled,
        (state, action: PayloadAction<Group[]>) => {
          state.loading = false;
          state.groups = action.payload;
        }
      )
      .addCase(fetchGroups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch groups';
      })
      .addCase(addGroup.fulfilled, (state, action: PayloadAction<Group>) => {
        state.groups.push(action.payload);
      })
      .addCase(addGroup.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to add group';
      })
      .addCase(deleteGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteGroup.fulfilled,
        (state, action: PayloadAction<Group[]>) => {
          state.loading = false;
          state.groups = action.payload;
        }
      )
      .addCase(deleteGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete group';
      })
      .addCase(moveGroups.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(moveGroups.fulfilled, (state, action) => {
        state.loading = false;
        state.groups = action.payload;
      })
      .addCase(moveGroups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default groupSlice.reducer;
