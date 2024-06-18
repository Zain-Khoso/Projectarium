'use client';

// Lib Imports.
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Component.
export default function ReactQueryProvider({ children }: Props) {
  const [client] = useState(() => new QueryClient());

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
