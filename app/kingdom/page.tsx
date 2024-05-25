import { withPageAuthRequired } from '@auth0/nextjs-auth0';

export default async function Kingdom() {
  return (
    <main className="flex min-h-[800px] flex-col items-center justify-between p-24">
      <section className="page-content w-full  mx-auto "></section>
    </main>
  );
}
