'use client';

// Lib Imports
import { useReducer, createContext, Dispatch } from 'react';

// Local Imports.
import { reducer, initialState } from './store';
import { ActionT, StateT } from './types';

// Context.
export const ScrollContext = createContext<[StateT, Dispatch<ActionT>]>([initialState, () => {}]);

// Store.
export default function ProjectsContext({ children }: Props) {
  const context = useReducer(reducer, initialState);

  return <ScrollContext.Provider value={context}>{children}</ScrollContext.Provider>;
}
