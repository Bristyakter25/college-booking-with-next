import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-200 dark:bg-gray-800 dark:text-white text-black py-8 mt-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
        {/* Logo & About */}
        <div className="md:w-1/3">
          <h2 className="text-2xl font-bold mb-3">EduReserve</h2>
          <p className="text-gray-700 dark:text-gray-200  max-w-sm">
            Empowering learners with quality education and community-driven
            experiences. Join us and grow your skills every day.
          </p>
        </div>

        {/* Quick Links */}
        <div className="md:w-1/3 flex justify-center space-x-8">
          <div>
            <h3 className="font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-white transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-white transition">
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white transition">
                  Contact
                </a>
              </li>
              <li>
                <a href="/profile" className="hover:text-white transition">
                  Profile
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media */}
        <div className="md:w-1/3 flex flex-col items-center md:items-end">
          <h3 className="font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-5 text-lg">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-white transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:text-white transition"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-white transition"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-white transition"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-white transition"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-teal-700  mt-8 pt-4 text-center text-sm text-gray-700 dark:text-gray-300">
        &copy; {new Date().getFullYear()} EduReserve. All rights reserved.
      </div>
    </footer>
  );
}
