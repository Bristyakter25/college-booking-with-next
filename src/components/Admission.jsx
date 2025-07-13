// pages/admission/page.jsx
'use client';
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Admission() {
  const [colleges, setColleges] = useState([]);

  useEffect(() => {
    fetch("https://college-booking-facilities-server-five.vercel.app/collegeInfo")
      .then(res => res.json())
      .then(data => setColleges(data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Select a College to Apply</h1>
      <ul className="space-y-3 px-28">
        {colleges.map(college => (
          <li key={college._id}>
            <Link href={`/Admission/${college._id}`}>
              <span className="text-blue-600 text-center hover:underline cursor-pointer">
                {college.collegeName}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
