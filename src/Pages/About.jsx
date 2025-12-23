import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { useNavigation } from 'react-router-dom';

const About = () => {
  const [darkMode, setDarkMode] = useState(true);
  const navigation = useNavigation();

  return (
    <section className={darkMode ? 'dark' : ''}>
      {navigation.state !== 'idle' && <Loader />}
      <section className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        {/* ===== Navbar ===== */}
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />

        {/* ===== ABOUT ===== */}
        <div className="max-w-7xl mx-auto px-6 py-20">
          {/* Header */}
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold">
              About <span className="text-blue-500">Me</span>
            </h1>
            <p className="mt-6 text-gray-600 dark:text-gray-400">
              I’m a developer focused on building modern, scalable, and
              performance-driven web applications using cutting-edge tools.
            </p>
          </div>

          {/* Content Cards */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg">
              <h3 className="text-lg font-semibold mb-3">💡 Mindset</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                I believe in clean architecture, readable code, and learning
                deeply instead of rushing blindly.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg">
              <h3 className="text-lg font-semibold mb-3">⚙ Tech Stack</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                React, Tailwind CSS, JavaScript, APIs, UI/UX, and performance
                optimization.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg">
              <h3 className="text-lg font-semibold mb-3">🚀 Goals</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Build meaningful products, master full-stack development, and
                ship ideas that actually matter.
              </p>
            </div>
          </div>
        </div>

        {/* ===== Footer ===== */}
        <Footer />
      </section>
    </section>
  );
};

export default About;
