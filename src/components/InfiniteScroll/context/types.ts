// Context State.
export type StateT = {
  isLoading: boolean;
  isError: boolean;
  projects: Dictionary[];
};

// Context Action.
export type ActionT = {
  type: 'Fetch' | 'Update' | 'Error';
  projects?: Dictionary[];
};
