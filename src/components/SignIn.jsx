'use client';

import Link from "next/link";
import SocialLogin from "./SocialLogin";
import { signIn } from "next-auth/react";



export default function SignIn() {
  // const router = useRouter();

  const handleLogin = async (e) => {
  e.preventDefault();

  const form = e.target;
  const email = form.email.value;
  const password = form.password.value;

  const result = await signIn("credentials", {
    redirect: false,
    email,
    password,
    callbackUrl: "/",
  });

  if (result?.error) {
    alert("Login failed: " + result.error);
  } else {
    alert("Login successful!");
    window.location.href = result.url || "/"; // or use router.push(result.url)
  }
};


  return (
   <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block  text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="mt-1 dark:text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition"
          >
            Login
          </button>
          <SocialLogin></SocialLogin>
          <p className="mt-2 dark:text-black text-center ">
  Forgot your password?{" "}
  <Link href="/forgot-password" className="text-blue-600 underline">
    Reset here
  </Link>
</p>
          <p className="dark:text-black text-center">New User? <Link href="/register" className="text-red-500">Sign Up </Link> Here!</p>
        </form>
  );
}
