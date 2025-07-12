'use client';
import React from 'react';

const researchPapers = [
  {
    title: "The Impact of AI on Modern Education",
    author: "Samiul Haque (CSE, BHBS)",
    year: 2024,
    link: "https://www.researchgate.net/publication/386018934_The_impact_of_AI_on_education_and_careers_What_do_students_think",
    abstract:
      "This paper explores how artificial intelligence is transforming teaching, learning, and evaluation systems in higher education institutions.",
  },
  {
    title: "Entrepreneurship Trends Among Business Graduates",
    author: "Nafisa Chowdhury (BBA, BHBS)",
    year: 2023,
    link: "https://www.researchgate.net/publication/305397544_Entrepreneurship_among_graduates_Reality_and_prospects_in_tertiary_education",
    abstract:
      "This research investigates motivations and challenges faced by recent graduates in launching startups across urban Bangladesh.",
  },
  {
    title: "Green Finance and Sustainability Metrics",
    author: "Tanvir Rahman (MBA, BHBS)",
    year: 2022,
    link: "https://www.greenfinanceplatform.org/themes/indicators-and-measurement",
    abstract:
      "An analytical study on sustainable investment tools used in Bangladeshi banking sectors post-2020.",
  },
  {
  title: "Digital Entrepreneurship in Emerging Markets",
  author: "Shamima Akter (BBA, BHBS)",
  year: 2023,
  link: "https://www.irejournals.com/paper-details/1707325",
  abstract:
    "A comprehensive study of how digital platforms are transforming startup ecosystems in Bangladesh, with a focus on post-pandemic acceleration.",
}
];

export default function ResearchPapers() {
  return (
    <section className="bg-gray-50 dark:bg-blue-950 py-10 px-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6 text-teal-700">📚 Recommended Research Papers</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {researchPapers.map((paper, i) => (
          <div key={i} className="bg-white dark:bg-slate-800 border rounded-lg shadow p-5">
            <h3 className="text-xl font-semibold text-teal-600 mb-1">{paper.title}</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
              <strong>Author:</strong> {paper.author} • <strong>Year:</strong> {paper.year}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{paper.abstract}</p>
            <a
              href={paper.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm font-medium text-white bg-teal-600 px-4 py-2 rounded hover:bg-teal-700 transition"
            >
              Read Paper →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
