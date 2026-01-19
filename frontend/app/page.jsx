import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">Welcome to Primetrade</h1>
        <div className="space-x-4">
          <Link href="/login" className="bg-blue-500 text-white px-4 py-2 rounded">Login</Link>
          <Link href="/register" className="bg-green-500 text-white px-4 py-2 rounded">Register</Link>
        </div>
      </div>
    </div>
  );
}