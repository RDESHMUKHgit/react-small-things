import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <div>
      <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <h2 className="text-xl font-bold">
              RD<span className="text-blue-500">.</span>
            </h2>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 max-w-xs">
              Building modern web experiences with clean UI, scalable
              architecture, and performance-first thinking.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="hover:text-blue-500 cursor-pointer">
                <NavLink to="/">Home </NavLink>
              </li>
              <li className="hover:text-blue-500 cursor-pointer">
                <NavLink to="/about">About </NavLink>
              </li>
              <li className="hover:text-blue-500 cursor-pointer">
                <NavLink to="/contact">Contact </NavLink>
              </li>
              <li className="hover:text-blue-500 cursor-pointer">
                <NavLink to="/movies">Movies </NavLink>
              </li>
            </ul>
          </div>

          {/* Contact / CTA */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Let’s Connect
            </h3>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Wanna know more about me?
            </p>
            <button className="mt-4 px-5 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition">
              <span>
                <NavLink to="/about/portfolio">Portfolio 🚀</NavLink>
              </span>
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <p>© {new Date().getFullYear()} RD. All rights reserved.</p>
            <p className="mt-2 md:mt-0">
              Crafted with ❤️ using React & Tailwind
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
