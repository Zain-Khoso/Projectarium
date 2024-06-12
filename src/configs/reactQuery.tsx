'use client';

// Lib Imports.
import { useState } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

// Types.
type Props = {
  children: React.ReactNode;
};

export default function ReactQueryProvider({ children }: Props) {
  const [client] = useState(() => new QueryClient());

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
