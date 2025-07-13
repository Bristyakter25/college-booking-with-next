'use client';

import Link from 'next/link';
import React from 'react';
import { signOut, useSession } from 'next-auth/react';

export default function Navbar() {
  const { data: session } = useSession();
 console.log("Navbar session:", session);

  const links = (
    <>
      <li className='text-[17px]'><Link href="/">Home</Link></li>
      <li className='text-[17px]'><Link href="/allColleges">Colleges</Link></li>
      <li className='text-[17px]'><Link href="/admissionRoute">Admission</Link></li>
      <li className='text-[17px]'><Link href="/my-college">My College</Link></li>
    </>
  );

  return (
    <div>
      <div className="navbar px-5 bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> 
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              {links}
            </ul>
          </div>
          <a className="btn btn-ghost font-bold text-2xl">EduReserve</a>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-x-4">
            {links}
          </ul>
        </div>

        <div className="navbar-end gap-x-2 px-2">
          {session?.user ? (
            <>
              <div className="flex items-center gap-2">
                <Link href="/profile" className="hover:underline">
            {session.user.name || session.user.email}
          </Link>
                <button
                  onClick={() => signOut()}
                  className="rounded-md bg-red-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-md bg-teal-600 px-5 py-2.5 text-[18px] font-medium text-white shadow-sm hover:bg-teal-700"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-md bg-blue-600 px-5 py-2.5 text-[18px] font-medium text-white shadow-sm hover:bg-blue-700"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
