'use client';
import { useEffect, useState } from "react";
import { useParams, useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";

export default function CollegeDetails() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(true);

  // Redirect if not logged in
  useEffect(() => {
    if (status === 'loading') return; // wait for session check
    if (!session) {
      router.push('/login');
    }
  }, [session, status, router]);

  useEffect(() => {
    if (!id || !session) return;

    fetch(`https://college-booking-facilities-server-five.vercel.app/collegeInfo`)
      .then(res => res.json())
      .then(data => {
        const found = data.find(item => item.collegeId === id);
        setCollege(found);
        setLoading(false);
      });
  }, [id, session]);

  if (status === 'loading' || loading) return <p className="text-center mt-10">Loading...</p>;
  if (!college) return <p className="text-center mt-10 text-red-500">College not found</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <img
        src={college.collegeImage}
        alt={college.collegeName}
        className="w-full h-72 object-cover rounded mb-6"
      />
      <h1 className="text-3xl font-bold mb-4">{college.collegeName}</h1>

      <p className="mb-4">
        <strong>Admission Dates:</strong>{" "}
        {new Date(college.admissionDates?.start).toLocaleDateString()} -{" "}
        {new Date(college.admissionDates?.end).toLocaleDateString()}
      </p>

      <details className="mb-3">
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
              </details>

              {/* Events */}
              <details className="mb-3">
                <summary className="cursor-pointer font-semibold text-teal-600">Events</summary>
                <div className="mt-2 text-sm dark:text-white text-gray-700">
                  {college.events?.map((event, i) => (
                    <div key={i} className="mb-3 border rounded p-2 dark:bg-black bg-gray-50">
                      <p><strong>{event.name}</strong> — {new Date(event.date).toLocaleDateString()}</p>
                      <p><em>{event.location}</em></p>
                      <p>{event.details}</p>
                    </div>
                  ))}
                </div>
              </details>

              {/* Research History */}
              <details className="mb-3">
                <summary className="cursor-pointer font-semibold text-teal-600">Research History</summary>
                <div className="mt-2 dark:text-white text-sm text-gray-700">
                  <p><strong>Total Published Papers:</strong> {college.researchHistory?.totalPublishedPapers}</p>
                  <p><strong>Top Departments:</strong> {college.researchHistory?.topDepartments.join(", ")}</p>
                  <div className="mt-2">
                    <p><strong>Recent Research Works:</strong></p>
                    {college.researchHistory?.recentResearchWorks.map((work, i) => (
                      <div key={i} className="mb-2 p-2 border rounded bg-gray-50 dark:bg-black">
                        <p><strong>{work.title}</strong> ({work.year})</p>
                        <p>{work.description}</p>
                        <p><em>Lead Researcher: {work.leadResearcher}</em></p>
                      </div>
                    ))}
                  </div>
                </div>
              </details>

              {/* Sports */}
              <details>
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
              </details>
    </div>
  );
}
