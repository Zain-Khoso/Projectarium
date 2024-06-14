// Lib Imports.
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Local Imports.
import type { ProjectT } from './types';

// Types.
type StateT = {
  isLoading: boolean;
  isError: boolean;
  isEmpty: boolean;
  projects: ProjectT[];
};

// Initial State.
const initialState = {
  isLoading: true,
  isError: false,
  isEmpty: false,
  projects: [],
} satisfies StateT;

// Reducer.
const projectsReducer = createSlice({
  name: 'projects',
  initialState: { value: initialState },
  reducers: {},
});

// Exports.
export const {} = projectsReducer.actions;
export default projectsReducer.reducer;
