import { ThemeButton } from '@/features/theme-button';
import { Outlet, createRootRoute } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <div>Hello "__Root"!</div>
      <ThemeButton />
      <Outlet />
    </>
  );
}
