'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    image: '',
  });

  useEffect(() => {
    if (status === 'loading') return; // wait for session
    if (!session) {
      router.push('/login');
      return;
    }

    async function fetchUser() {
      try {
        const res = await fetch(`http://localhost:5000/users?email=${session.user.email}`);

        if (!res.ok) {
          setError('User not found');
          setLoading(false);
          return;
        }

        const user = await res.json();

        setUserInfo(user);
        setForm({
          name: user.name || '',
          email: user.email || '',
          phone: user.phone || '',
          address: user.address || '',
          image: user.image || '',
        });
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch user info');
        setLoading(false);
      }
    }

    fetchUser();
  }, [session, status, router]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInfo?._id) {
      alert('User info not loaded');
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/users/${userInfo._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        alert('✅ Profile updated successfully');
      } else {
        alert('❌ Failed to update profile');
      }
    } catch (err) {
      console.error('Update error:', err);
      alert('❌ Something went wrong');
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Email</label>
          <input
            name="email"
            value={form.email}
            disabled
            className="w-full border p-2 rounded cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Phone</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Phone Number"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Address</label>
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Address"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Image URL</label>
          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Profile Image URL"
          />
        </div>

        <button
          type="submit"
          className="bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
