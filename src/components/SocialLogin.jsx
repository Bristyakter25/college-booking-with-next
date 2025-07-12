'use client';

import React from 'react';
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { signIn } from "next-auth/react";

export default function SocialLogin() {
  const handleSocialLogin = async (providerName) => {
    // Redirects to provider login page
    await signIn(providerName, { callbackUrl: "/" });
  };

  return (
    <div className='flex dark:text-black items-center justify-center space-x-10'>
      <p onClick={() => handleSocialLogin('google')} className='text-3xl cursor-pointer'><FaGoogle /></p>
      <p onClick={() => handleSocialLogin('github')} className='text-3xl cursor-pointer'><FaGithub /></p>
    </div>
  );
}
