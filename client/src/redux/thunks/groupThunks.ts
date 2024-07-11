import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../CustomApi/axiosInstance';
import { Group } from '../slices/groupSlice';
import { CreateGroupDto } from '../../Components/GroupsCenter/GroupsCenter';

// Fetch groups
export const fetchGroups = createAsyncThunk(
  'groups/fetchGroups',
  async (userEmail: string | null, { rejectWithValue }) => {
    if (!userEmail) {
      return rejectWithValue('User email is required to fetch groups');
    }
    try {
      const response = await axiosInstance.get(`/group/user/${userEmail}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          'Failed to fetch groups'
      );
    }
  }
);

// Add group
export const addGroup = createAsyncThunk(
  'groups/addGroup',
  async (
    newGroup: Omit<
      CreateGroupDto,
      'id' | 'createdAt' | 'updatedAt' | 'children'
    >,
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post<Group>('/group', newGroup);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to add group'
      );
    }
  }
);

// Delete group
export const deleteGroup = createAsyncThunk(
  'groups/deleteGroup',
  async (groupId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/group/${groupId}`);
      return response.data; // Return the updated list of groups
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          'Failed to delete group'
      );
    }
  }
);

export const moveGroups = createAsyncThunk(
  'groups/moveGroups',
  async (
    {
      groupIdSource,
      groupIdTarget,
    }: { groupIdSource: string; groupIdTarget: string | null },
    { rejectWithValue }
  ) => {
    try {
      const url =
        groupIdTarget !== null
          ? `/group/move/${groupIdSource}/${groupIdTarget}`
          : `/group/move-to-root/${groupIdSource}`;
      const response = await axiosInstance.put<Group[]>(url);
      return response.data;
    } catch (error: any) {
      console.error('Error during group move:', error);
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          'Failed to update groups'
      );
    }
  }
);
