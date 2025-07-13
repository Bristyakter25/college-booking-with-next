"use client";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function MyCollege() {
  const { data: session } = useSession();
  const email = session?.user?.email;
  const router = useRouter();

  const [myCollege, setMyCollege] = useState([]);
  const [review, setReview] = useState({ comment: '', rating: 0 });

  useEffect(() => {
    if (!email) return;

    fetch(`http://localhost:5000/admissions/${email}`)
      .then(res => res.json())
      .then(data => {
        const admissions = Array.isArray(data) ? data : [data];
        const matchedAdmissions = admissions.filter(admission => admission.email === email);
        setMyCollege(matchedAdmissions);
      })
      .catch(err => console.error("Failed to fetch admissions:", err));
  }, [email]);

  const handleReviewSubmit = async () => {
    if (!email) {
      alert("⚠️ You must be logged in to submit a review. Redirecting to login page...");
      router.push('/login');  // adjust this path to your login route
      return;
    }

    if (!review.comment || review.rating < 1 || review.rating > 5) {
      alert("Please enter a valid review and rating (1-5).");
      return;
    }

    try {
      await fetch("http://localhost:5000/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...review, email }),
      });
      alert("✅ Review submitted!");
      setReview({ comment: '', rating: 0 });
    } catch (error) {
      console.error("Review submission failed:", error);
      alert("❌ Failed to submit review.");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center dark:text-white">🎓 My College Information</h1>

      {myCollege.length === 0 ? (
        <p className="text-center text-gray-500">No admission records found.</p>
      ) : (
        myCollege.map((college, i) => (
          <div key={i} className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6 mb-6 border border-gray-200 dark:border-gray-700">
            <p className="text-lg font-semibold mb-2 dark:text-white">{college.collegeName || "College Name Not Available"}</p>
            <div className="flex justify-between text-gray-700 dark:text-gray-300">
              <div>
                <p><strong>Candidate Name:</strong> {college.candidateName}</p>
                <p><strong>Subject:</strong> {college.subject}</p>
                <p><strong>Email:</strong> {college.email}</p>
                <p><strong>Phone:</strong> {college.phone}</p>
                <p><strong>Address:</strong> {college.address}</p>
                <p><strong>Date of Birth:</strong> {college.dob}</p>
              </div>
              <div>
                <img src={college.image} alt="Candidate" className="rounded w-40 h-44 object-cover border" />
              </div>
            </div>
          </div>
        ))
      )}

      {/* Review Form */}
      {!email ? (
        <p className="text-center text-red-500 mt-6 cursor-pointer" onClick={() => router.push('/login')}>
          ⚠️ You must <span className="underline">log in</span> to add a review. Click here to login.
        </p>
      ) : (
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 mt-8">
          <h2 className="text-2xl font-semibold mb-4 dark:text-white">📝 Add a Review</h2>

          <textarea
            className="w-full border rounded p-3 mb-4 dark:bg-gray-900 dark:text-white dark:border-gray-700"
            rows="4"
            placeholder="Write your review..."
            value={review.comment}
            onChange={(e) => setReview({ ...review, comment: e.target.value })}
            required
          />

          <input
            type="number"
            min="1"
            max="5"
            className="w-full border rounded p-3 mb-4 dark:bg-gray-900 dark:text-white dark:border-gray-700"
            placeholder="Rating (1-5)"
            value={review.rating || ""}
            onChange={(e) => setReview({ ...review, rating: parseInt(e.target.value) })}
            required
          />

          <button
            onClick={handleReviewSubmit}
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded shadow"
          >
            Submit Review
          </button>
        </div>
      )}
    </div>
  );
}
