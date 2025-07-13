'use client';

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Pagination, Navigation } from 'swiper/modules';

function renderStars(rating) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span key={i} className={i <= rating ? 'text-yellow-400' : 'text-gray-300'}>
        ★
      </span>
    );
  }
  return stars;
}

export default function ReviewSlider() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch('https://college-booking-facilities-server-five.vercel.app/reviews');
        if (!res.ok) throw new Error('Failed to fetch reviews');
        const data = await res.json();
        setReviews(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading reviews...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Error: {error}</p>;
  if (reviews.length === 0) return <p className="text-center mt-10">No reviews available.</p>;

  return (
    <div className="w-full mt-10 mx-auto p-6 dark:bg-gray-800 bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Student Reviews</h2>
      <Swiper
        pagination={{ type: 'fraction' }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
        spaceBetween={30}
        slidesPerView={1}
      >
        {reviews.map(({ _id, comment, rating, email }) => (
          <SwiperSlide key={_id}>
            <div className=" py-10 text-center gap-y-4 p-6 rounded-lg shadow-md">
              <p className="mb-4 text-xl text-gray-700 dark:text-gray-200 italic">"{comment}"</p>
              <div className="mb-2">{renderStars(rating)}</div>
              <p className="text-md text-gray-500 dark:text-gray-400">- {email}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
