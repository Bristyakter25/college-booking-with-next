// 'use client';

// import { useSearchParams } from 'next/navigation';
// import { useState } from 'react';

// export default function ResetPassword() {
//   const token = useSearchParams().get('token');
//   const [newPassword, setNewPassword] = useState('');
//   const [msg, setMsg] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const res = await fetch('https://college-booking-facilities-server-five.vercel.app/reset-password', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ token, newPassword }),
//     });
//     const data = await res.json();
//     setMsg(data.message);
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-semibold mb-4">Reset Your Password</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="password"
//           required
//           placeholder="Enter new password"
//           className="input input-bordered w-full max-w-sm mb-4"
//           value={newPassword}
//           onChange={(e) => setNewPassword(e.target.value)}
//         />
//         <br />
//         <button className="btn btn-success" type="submit">Reset Password</button>
//       </form>
//       {msg && <p className="mt-4 text-blue-500">{msg}</p>}
//     </div>
//   );
// }
