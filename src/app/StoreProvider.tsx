'use client';

// Lib Imports.
import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from '@/configs/store';

// Types.
type Props = { children: React.ReactNode };

export default function StoreProvider({ children }: Props) {
  const storeRef = useRef<AppStore>();

  if (!storeRef.current) storeRef.current = makeStore();

  return <Provider store={storeRef.current}>{children}</Provider>;
}
