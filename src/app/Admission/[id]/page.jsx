'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdmissionForm() {
  const {id} = useParams();
  const router = useRouter();

  const [collegeName, setCollegeName] = useState('');
  const [formData, setFormData] = useState({
    candidateName: '',
    subject: '',
    email: '',
    phone: '',
    address: '',
    dob: '',
    image: ''
  });

  // ✅ Fetch specific college by ID
  useEffect(() => {
    const fetchCollege = async () => {
      try {
        const res = await fetch(`https://college-booking-facilities-server-five.vercel.app/collegeInfo/${id}`);
        const data = await res.json();
        if (data?.collegeName) {
          setCollegeName(data.collegeName);
        }
      } catch (error) {
        console.error(" Failed to fetch college info:", error);
      }
    };

    if (id) fetchCollege();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formData, collegeName };

    try {
      const res = await fetch("https://college-booking-facilities-server-five.vercel.app/admissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert("✅ Admission submitted successfully!");
        router.push('/my-college');
      } else {
        alert("❌ Failed to submit admission");
      }
    } catch (err) {
      console.error("Submit error:", err);
      alert("❌ Something went wrong");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-900 shadow-lg rounded-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
        Admission Form
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">

        {/* ✅ College Name - Shown, Not Editable */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
            College Name
          </label>
          <input
            type="text"
            value={collegeName}
            disabled
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white bg-gray-100 focus:outline-none cursor-not-allowed"
          />
        </div>

        {/* 📝 Rest of Form */}
        {[
          { name: "candidateName", label: "Candidate Name" },
          { name: "subject", label: "Subject" },
          { name: "email", label: "Email", type: "email" },
          { name: "phone", label: "Phone Number" },
          { name: "address", label: "Address" },
          { name: "dob", label: "Date of Birth", type: "date" },
          { name: "image", label: "Image URL" }
        ].map((field) => (
          <div key={field.name}>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
              {field.label}
            </label>
            <input
              type={field.type || "text"}
              value={formData[field.name]}
              onChange={(e) =>
                setFormData({ ...formData, [field.name]: e.target.value })
              }
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
              placeholder={field.label}
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2.5 rounded-md transition"
        >
          Submit Admission
        </button>
      </form>
    </div>
  );
}
