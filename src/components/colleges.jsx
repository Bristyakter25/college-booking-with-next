'use client';
import { useEffect, useState } from "react";

export default function Colleges() {
  const [colleges, setColleges] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const res = await fetch("/api/colleges");
        const data = await res.json();
        setColleges(Array.isArray(data) ? data : [data]);
      } catch (err) {
        console.error("Failed to fetch colleges", err);
      }
    };
    fetchColleges();
  }, []);

  const filteredColleges = colleges.filter((college) =>
    college.collegeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedColleges = searchTerm
    ? filteredColleges
    : colleges.slice(0, 3); 

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">College List</h1>

      <input
        type="text"
        placeholder="Search by college name..."
        className="border border-gray-300 rounded px-4 py-2 mb-6 w-full md:w-1/2"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <ul>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedColleges.length > 0 ? (
            displayedColleges.map((college) => (
              <li
                key={college._id || college.collegeId}
                className="border p-4 rounded shadow-sm hover:shadow-md transition"
              >
                <img
                  src={college.collegeImage}
                  alt={college.collegeName}
                  className="w-full h-40 object-cover mb-2 rounded"
                />
                <h2 className="text-lg font-bold">{college.collegeName}</h2>
                <p className="text-sm text-gray-600">
                  Admission: {college.admissionDates?.start} to {college.admissionDates?.end}
                </p>
              </li>
            ))
          ) : (
            <p className="text-gray-500 col-span-full">No colleges found</p>
          )}
        </div>
      </ul>
    </div>
  );
}
