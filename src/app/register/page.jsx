import SignUp from '@/components/SignUp'
import React from 'react'

export default function page() {
  return (
    <div>
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Register</h2>

       <SignUp></SignUp>
      </div>
    </div>
    </div>
  )
}
