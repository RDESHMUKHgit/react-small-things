import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Portfolio = () => {
  return (
    <section className="dark">
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        {/* ===== Header ===== */}
        <Header />

        {/* ===== Main Content ===== */}
        <main className="max-w-7xl mx-auto px-6 py-20">
          {/* Page Title */}
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold">
              My <span className="text-blue-500">Portfolio</span>
            </h1>
            <p className="mt-6 text-gray-600 dark:text-gray-400 text-lg">
              A curated collection of projects, experiments, and ideas I’ve
              worked on while learning and building in public.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Card */}
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="group p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all"
              >
                <h3 className="text-xl font-semibold mb-3">Project {item}</h3>

                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Short description of the project goes here. What it does, what
                  tech you used, and why it’s cool.
                </p>

                <div className="mt-4 flex gap-3 text-xs">
                  <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400">
                    React
                  </span>
                  <span className="px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-700">
                    Tailwind
                  </span>
                </div>

                <button className="mt-6 text-sm font-medium text-blue-500 hover:underline">
                  View Project →
                </button>
              </div>
            ))}
          </div>
        </main>

        {/* ===== Footer ===== */}
        <Footer />
      </div>
    </section>
  );
};

export default Portfolio;
