import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/widgets/app-sidebar';
import { Topbar } from '@/components/widgets/topbar';
import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';
import { getAccessToken } from '@/lib/auth';

export const Route = createFileRoute('/app')({
  beforeLoad: () => {
    if (!getAccessToken()) {
      throw redirect({ to: '/login' });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <SidebarProvider>
      <div className="w-full h-full flex">
        <AppSidebar />
        <div className="flex-1">
          <Topbar />
          <Outlet />
        </div>
      </div>
    </SidebarProvider>
  );
}
