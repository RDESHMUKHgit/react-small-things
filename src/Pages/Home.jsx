import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <section className={darkMode ? 'dark' : ''}>
      {/* Wrapper */}
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        {/* ===== Navbar ===== */}
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />

        {/* ===== Main Section ===== */}
        <main className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Build Modern <br />
                <span className="text-blue-500">Web Experiences</span>
              </h2>

              <p className="mt-6 text-gray-600 dark:text-gray-400 max-w-lg">
                Craft fast, responsive, and visually stunning web applications
                using React and Tailwind CSS. Clean code. Modern UI. Smooth UX.
              </p>

              <div className="mt-8 flex gap-4">
                <button className="px-6 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition cursor-pointer">
                  Get Started
                </button>
                <button className="px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-800 transition cursor-pointer">
                  Learn More
                </button>
              </div>
            </div>

            {/* Visual Card */}
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-20 rounded-full"></div>
              <div className="relative p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-xl">
                <h3 className="text-xl font-semibold mb-4">Why This Stack?</h3>
                <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                  <li>⚡ Lightning-fast UI</li>
                  <li>🎨 Modern & responsive design</li>
                  <li>🧠 Scalable architecture</li>
                  <li>🚀 Built for real-world apps</li>
                </ul>
              </div>
            </div>
          </div>
        </main>

        {/* ===== Footer ===== */}
        <Footer />
      </div>
    </section>
  );
}
