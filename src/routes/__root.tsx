import { Link, Outlet, createRootRoute } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className="flex flex-col w-full h-screen overflow-hidden">
      <Outlet />
      <footer className="w-full border-t p-4 flex justify-between items-center">
        <p className="text-muted-foreground font-medium text-sm">
          Copyright © 2026 <a href="https://toiladevb.com">DevB</a>. All rights
          reserved.
        </p>
        <div className="flex gap-4 text-sm font-semibold tracking-widest opacity-60">
          <Link to={'#'} className="hover:text-accent">
            Privacy Policy
          </Link>
          <Link to={'#'} className="hover:text-accent">
            Terms of Service
          </Link>
          <Link to={'#'} className="hover:text-accent">
            Cookie Settings
          </Link>
        </div>
      </footer>
    </div>
  );
}
