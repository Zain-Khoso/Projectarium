// Local Imports.
import { StateT, ActionT } from './types';

// Initial State For The Context.
export const initialState: StateT = {
  isLoading: false,
  isError: false,
  projects: [],
};

// Reducer Function To Determine The Next State Of The Context.
export function reducer(state: StateT, action: ActionT): StateT {
  let { isLoading, isError, projects } = state;

  switch (action.type) {
    case 'Fetching':
      isLoading = true;
      break;

    case 'Error':
      isLoading = false;
      isError = true;
      break;

    case 'Update':
      isLoading = false;
      isError = false;
      projects = projects.concat(action?.projects || []);
      break;

    default:
      isLoading = false;
      isError = false;
      break;
  }

  return {
    isLoading,
    isError,
    projects,
  };
}
