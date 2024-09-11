'use client';

// Lib Imports.
import { useState } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

// Component.
export default function ReactQueryProvider({ children }: ChildrenProps) {
  const [queryClient] = useState(() => new QueryClient());

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
