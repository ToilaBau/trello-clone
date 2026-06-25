import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return (
    <>
      <div>Hello Home!</div>
      <Link to={'/about'}>Go to About</Link>
    </>
  );
}
