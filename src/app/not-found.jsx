'use client';

import { useRouter } from 'next/navigation';

export default function ErrorPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white px-6">
      <h1 className="text-9xl font-extrabold drop-shadow-lg animate-pulse">404</h1>
      <p className="text-2xl md:text-3xl mt-4 mb-8 max-w-lg text-center">
        Oops! The page you’re looking for doesn’t exist.
      </p>

      <button
        onClick={() => router.push('/')}
        className="bg-white text-purple-700 font-bold px-8 py-3 rounded-md shadow-lg hover:bg-purple-100 transition"
      >
        Go Back Home
      </button>

      <svg
        className="mt-12 w-64 h-64 opacity-30 animate-bounce"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v6l4 2"
        />
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </div>
  );
}
