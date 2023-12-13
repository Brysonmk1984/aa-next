import { withPageAuthRequired } from '@auth0/nextjs-auth0';

export default async function Kingdom() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>Kingdom Page</div>
    </main>
  );
}
