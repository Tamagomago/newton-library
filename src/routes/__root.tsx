import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import Navbar from '@/components/layouts/Navbar';
import Footer from '@/components/layouts/Footer.tsx';

export const Route = createRootRoute({
  component: () => (
    <>
      <div className={'flex flex-col'}>
        <Navbar />
        <Outlet />
        <Footer />
      </div>

      <TanStackRouterDevtools />
    </>
  ),
});
