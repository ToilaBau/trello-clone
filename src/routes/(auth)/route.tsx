import { isAuthenticated } from '@/lib/auth';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/(auth)')({
  beforeLoad: () => {
    if (isAuthenticated()) {
      throw redirect({ to: '/app' });
    }
  },
  component: AuthLayout,
});

function AuthLayout() {
  return <Outlet />;
}
