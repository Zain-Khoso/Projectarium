// Local Imports.
import { StateT, ActionT } from './types';

// Initial State For The Context.
export const initialState: StateT = {
  isLoading: true,
  isError: false,
  projects: [],
};

// Reducer Function To Determine The Next State Of The Context.
export function reducer(state: StateT, action: ActionT): StateT {
  const results = state;

  switch (action.type) {
    case 'Fetch':
      results.isLoading = true;
      break;

    case 'Error':
      results.isLoading = false;
      results.isError = true;
      break;

    case 'Update':
      results.isLoading = false;
      results.isError = false;
      results.projects.concat(action?.projects || []);
      break;

    default:
      results.isLoading = false;
      results.isError = false;
      break;
  }

  return results;
}
