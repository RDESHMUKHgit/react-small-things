import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const Header = ({ darkMode, setDarkMode }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Movies', path: '/movies' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur border-b border-gray-200 dark:border-gray-800">
      <nav className="relative max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-xl font-bold tracking-wide">
          RD<span className="text-blue-500">.</span>
        </h1>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-8 text-sm font-medium">
          {links.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg transition-all duration-200
                  ${
                    isActive
                      ? 'text-blue-500 bg-blue-100 dark:bg-blue-500/20'
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Center Menu Badge (Mobile) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden absolute left-1/2 -translate-x-1/2 px-5 py-2 rounded-full text-sm font-semibold bg-blue-500 text-white shadow-lg active:scale-95 transition"
        >
          Menu
        </button>

        {/* Theme Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 rounded-full text-sm font-medium bg-gray-200 dark:bg-gray-800 hover:scale-105 transition"
        >
          {darkMode ? '☀ Light' : '🌙 Dark'}
        </button>
      </nav>

      {/* Mobile Overlay Menu (Animated, no layout shift) */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800
        transform transition-all duration-300 ease-out
        ${
          menuOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <ul className="flex flex-col p-4 space-y-2 text-sm font-medium">
          {links.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-lg transition
                  ${
                    isActive
                      ? 'text-blue-500 bg-blue-100 dark:bg-blue-500/20'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Header;
