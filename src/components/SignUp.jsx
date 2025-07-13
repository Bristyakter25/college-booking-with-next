'use client';

import Link from "next/link";
import { signIn } from "next-auth/react";

export default function SignUp() {
  const handleRegister = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const image = form.image.value;
    const password = form.password.value;

    try {
      const res = await fetch("https://college-booking-facilities-server-five.vercel.app/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, image, password }),
      });

      const result = await res.json();

      if (result.success) {
        alert("✅ Registration successful! Logging you in...");

        // Now immediately sign them in using NextAuth credentials
        const signInResult = await signIn("credentials", {
          redirect: false,
          email,
          password,
          callbackUrl: "/",
        });

        if (signInResult?.error) {
          alert("Sign-in failed: " + signInResult.error);
        } else {
          window.location.href = signInResult.url || "/";
        }
      } else {
        alert(result.message || "Registration failed");
      }
    } catch (error) {
      console.error("Register error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <form onSubmit={handleRegister} className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="mt-1 w-full dark:text-black px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
          placeholder="John Doe"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="mt-1 w-full dark:text-black px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
          Image URL (optional)
        </label>
        <input
          type="url"
          id="image"
          name="image"
          className="mt-1 w-full dark:text-black px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
          placeholder="Insert Image URL (or leave blank)"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          className="mt-1 w-full dark:text-black px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
          placeholder="••••••••"
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition"
      >
        Register
      </button>

      <p className="dark:text-black text-center">
        Already registered?{" "}
        <Link href="/login" className="text-red-500">
          Sign In
        </Link>{" "}
        Here!
      </p>
    </form>
  );
}
