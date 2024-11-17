import { auth0 } from '../../lib/auth0';

export default async function Home() {
  try {
    console.log(111);
    const session = await auth0.getSession();
    console.log({ session });

    if (!session) {
      return (
        <main>
          <a href="/auth/login?screen_hint=signup">Sign up</a>
          <a href="/auth/login">Log in</a>
        </main>
      );
    }

    return (
      <main>
        <h1>Welcome, {session.user.name}!</h1>
      </main>
    );
  } catch (e) {
    console.log(e);
  }
}
