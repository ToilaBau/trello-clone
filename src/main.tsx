import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/index.css';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { routeTree } from '@/routeTree.gen';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from './lib/queryClient';
import { ThemeProvider } from './providers/theme-provider';
import { TooltipProvider } from './components/ui/tooltip';

const router = createRouter({ routeTree: routeTree });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
);
