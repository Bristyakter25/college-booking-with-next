'use client';
import React from 'react';

const galleryImages = [
  "https://i.ibb.co/kg4SsvBG/pexels-pavel-danilyuk-7944130.jpg",
  "https://i.ibb.co/B5GWmwF3/edd-cloud-Bi4i-Nqo-VKmc-unsplash-1.jpg",
  "https://i.ibb.co/XrFV48W2/sahil-prajapati-5ne-FWJA0a-NA-unsplash.jpg",
  "https://i.ibb.co/B59gKzbv/oktavia-ningrum-YMVu-Uog-Yhvs-unsplash.jpg",
  "https://i.ibb.co/3mqQkLQB/pexels-pavel-danilyuk-7942473.jpg",
  "https://i.ibb.co/MDXskffy/pexels-pavel-danilyuk-7942434.jpg",
  "https://i.ibb.co/rfd3SrtQ/pexels-pavel-danilyuk-7944138.jpg",
  "https://i.ibb.co/yFhSzBpZ/pexels-george-pak-7973120.jpg"
];

export default function CollegeImageGallery() {
  return (
    <section className="bg-white dark:bg-blue-950 py-10 px-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6 text-teal-700">🎓 College Graduates Gallery</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {galleryImages.map((img, i) => (
          <div key={i} className="overflow-hidden rounded-lg shadow hover:scale-105 transition duration-300">
            <img src={img} alt={`Graduate ${i + 1}`} className="w-full h-48 object-cover" loading="lazy" />
          </div>
        ))}
      </div>
    </section>
  );
}
