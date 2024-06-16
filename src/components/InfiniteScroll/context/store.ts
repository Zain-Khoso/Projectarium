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
  let { isLoading, isError, projects } = state;

  switch (action.type) {
    case 'Fetch':
      isLoading = true;
      break;

    case 'Error':
      isLoading = false;
      isError = true;
      console.log('LOL');
      break;

    case 'Update':
      isLoading = false;
      isError = false;
      projects.concat(action?.projects || []);
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
