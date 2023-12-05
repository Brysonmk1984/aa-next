import ProfileClient from './ProfileClient';

export default function Header() {
  return (
    <header className="flex justify-between  p-6">
      <div>
        <h1 className="text-red">Armies of Avalore</h1>
        <p>An incremental strategy game set in a realm of medieval fantasy</p>
        <p>Battle for territory and control the Avalore! </p>
      </div>
      <nav className="flex gap-3 justify-end">
        <a href="/kingdom">Kingdom</a>
        <a href="/nations">Nations</a>
        <a href="/buy">Buy</a>
        <a href="/campaign">Campaign</a>
        <ProfileClient />
      </nav>
    </header>
  );
}
