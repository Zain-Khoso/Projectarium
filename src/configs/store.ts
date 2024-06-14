// Lib Imports.
import { useDispatch, useSelector, useStore } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

// Local Imports.
import ProjectsReducer from '@/utils/redux/projects';

// Store Configuration Function.
export const makeStore = () => {
  return configureStore({
    reducer: { projects: ProjectsReducer },
  });
};

// Types
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

// Hooks
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
