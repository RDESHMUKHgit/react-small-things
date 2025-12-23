import { NavLink } from 'react-router-dom';

const Header = ({ darkMode, setDarkMode }) => {
  return (
    <div>
      {/* ===== Navbar ===== */}
      <header className="sticky top-0 z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur border-b border-gray-200 dark:border-gray-800">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <h1 className="text-xl font-bold tracking-wide">
            RD<span className="text-blue-500">.</span>
          </h1>

          {/* Links */}
          <ul className="hidden md:flex gap-8 text-sm font-medium">
            {[
              { name: 'Home', path: '/' },
              { name: 'About', path: '/about' },
              { name: 'Contact', path: '/contact' },
              { name: 'Movies', path: '/movies' },
            ].map((link) => (
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

          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-2 rounded-full text-sm font-medium bg-gray-200 dark:bg-gray-800 hover:scale-105 transition cursor-pointer"
          >
            {darkMode ? '☀ Light' : '🌙 Dark'}
          </button>
        </nav>
      </header>
    </div>
  );
};

export default Header;
