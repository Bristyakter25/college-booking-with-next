'use client';
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AllColleges() {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/collegeInfo")
      .then(res => res.json())
      .then(data => {
        setColleges(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-10">Loading colleges...</p>;

  const filteredColleges = colleges.filter(college =>
    college.collegeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">College List</h1>

      <input
        type="text"
        placeholder="Search by college name..."
        className="border border-gray-300 rounded px-4 py-2 mb-8 w-full max-w-md mx-auto block focus:outline-teal-500"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredColleges.length === 0 && (
        <p className="text-center text-gray-500">No colleges found</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredColleges.map(college => (
          <div
            key={college._id || college.collegeId}
            className="border rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow dark:bg-blue-950 bg-white"
          >
            <img
              src={college.collegeImage}
              alt={college.collegeName}
              className="w-full h-48 object-cover"
              loading="lazy"
            />

            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{college.collegeName}</h2>

              <p className="text-sm dark:text-white text-gray-600 mb-2">
                <span className="font-semibold">Admission Dates:</span>{" "}
                {new Date(college.admissionDates?.start).toLocaleDateString()} -{" "}
                {new Date(college.admissionDates?.end).toLocaleDateString()}
              </p>

              {/* Admission Process */}
              {/* <details className="mb-3">
                <summary className="cursor-pointer font-semibold text-teal-600">Admission Process</summary>
                <div className="mt-2 text-sm dark:text-white text-gray-700">
                  <p><strong>Steps:</strong></p>
                  <ul className="list-disc ml-5 mb-2">
                    {college.admissionProcess?.steps.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ul>
                  <p><strong>Requirements:</strong></p>
                  <ul className="list-disc ml-5">
                    {college.admissionProcess?.requirements.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                  <p className="mt-2"><strong>Contact:</strong></p>
                  <p>Email: <a href={`mailto:${college.admissionProcess?.contact.email}`} className="text-teal-600">{college.admissionProcess?.contact.email}</a></p>
                  <p>Phone: {college.admissionProcess?.contact.phone}</p>
                  <p>Website: <a href={college.admissionProcess?.contact.website} target="_blank" rel="noreferrer" className="text-teal-600">{college.admissionProcess?.contact.website}</a></p>
                </div>
              </details> */}

              {/* Events */}
              {/* <details className="mb-3">
                <summary className="cursor-pointer font-semibold text-teal-600">Events</summary>
                <div className="mt-2 dark:text-white text-sm text-gray-700">
                  {college.events?.map((event, i) => (
                    <div key={i} className="mb-3 border rounded p-2 dark:bg-black bg-gray-50">
                      <p><strong>{event.name}</strong> — {new Date(event.date).toLocaleDateString()}</p>
                      <p><em>{event.location}</em></p>
                      <p>{event.details}</p>
                    </div>
                  ))}
                </div>
              </details> */}

              {/* Research History */}
              <div className="mb-3">
  <h3 className="font-semibold text-teal-600 mb-2">Research History</h3>
  <div className="mt-2 space-y-2 dark:text-white text-sm text-gray-700">
    <div className="lg:h-[90px]">
        <p><strong>Total Published Papers:</strong> {college.researchHistory?.totalPublishedPapers}</p>
    <p><strong>Top Departments:</strong> {college.researchHistory?.topDepartments.join(", ")}</p>
    </div>

    <div className="mt-2 ">
      <p className="mb-3"><strong>Recent Research Works:</strong></p>
      {college.researchHistory?.recentResearchWorks.map((work, i) => (
        <div key={i} className="mb-2 p-2  rounded bg-gray-50 dark:bg-black">
          <p><strong>{work.title}</strong> ({work.year})</p>
          <p>{work.description}</p>
          <p><em>Lead Researcher: {work.leadResearcher}</em></p>
        </div>
      ))}
    </div>
  </div>
</div>


              {/* Sports */}
              {/* <details>
                <summary className="cursor-pointer font-semibold text-teal-600">Sports</summary>
                <div className="mt-2 dark:text-white text-sm text-gray-700">
                  <p><strong>Available Sports:</strong> {college.sports?.availableSports.join(", ")}</p>
                  <p><strong>Facilities:</strong></p>
                  <ul className="list-disc ml-5 mb-2">
                    <li>Stadium: {college.sports?.facilities.stadium}</li>
                    <li>Indoor Court: {college.sports?.facilities.indoorCourt}</li>
                    <li>Gym: {college.sports?.facilities.gym ? "Yes" : "No"}</li>
                    <li>Swimming Pool: {college.sports?.facilities.swimmingPool ? "Yes" : "No"}</li>
                  </ul>
                  <p><strong>Annual Events:</strong></p>
                  {college.sports?.annualEvents.map((event, i) => (
                    <div key={i} className="mb-2 p-2 border rounded dark:bg-black bg-gray-50">
                      <p><strong>{event.eventName}</strong> ({event.month})</p>
                      <p>{event.description}</p>
                    </div>
                  ))}
                </div>
              </details> */}

              <Link href={`/college/${college.collegeId}`}>
                <button className="mt-3 inline-block px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
