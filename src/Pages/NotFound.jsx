/* eslint-disable react-hooks/purity */
import { NavLink, useNavigate, useRouteError } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function NotFound() {
  const error = useRouteError();
  const navigate = useNavigate();
  const [glitch, setGlitch] = useState(false);

  // Random glitch effect
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 250);
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden transition bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* ===== BACKGROUND STARS ===== */}
      <div className="absolute inset-0 z-0 transition">
        {[...Array(120)].map((_, i) => (
          <span
            key={i}
            className="absolute block bg-white rounded-full opacity-70 animate-pulse transition"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 5 + 2}s`,
            }}
          />
        ))}
      </div>

      {/* ===== FLOATING PLANET ===== */}
      <div className="absolute right-[-120px] top-1/4 w-[300px] h-[300px] rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/10 blur-2xl animate-[float_8s_ease-in-out_infinite]" />

      {/* ===== MAIN CONTENT ===== */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="max-w-3xl w-full text-center space-y-10">
          {/* SIGNAL LOST */}
          <p className="tracking-widest text-xs text-blue-400 uppercase">
            🚨 Transmission Interrupted
          </p>

          {/* 404 GLITCH */}
          <h1
            className={`text-[10rem] font-extrabold leading-none relative ${
              glitch ? 'animate-pulse text-red-500' : 'text-blue-500'
            }`}
          >
            404
            <span className="absolute inset-0 text-white opacity-10 blur-sm">
              404
            </span>
          </h1>

          {/* TITLE */}
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            You’ve drifted off the mapped routes
          </h2>

          {/* DESCRIPTION */}
          <p className="text-gray-400 max-w-xl mx-auto text-lg leading-relaxed">
            The page you’re trying to reach does not exist in this dimension.
            Either the link is broken, the route was deleted, or you’ve unlocked
            a forbidden path in the matrix.
          </p>

          {/* ERROR DETAILS */}
          {error && (
            <div className="text-xs text-gray-500 mt-4">
              <span className="opacity-70">Error Code:</span> {error.status}{' '}
              {error.statusText}
            </div>
          )}

          {/* ACTIONS */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
            <NavLink
              onClick={() => navigate('/', { replace: true })}
              className="group relative px-8 py-4 rounded-xl bg-blue-500 text-black font-semibold overflow-hidden"
            >
              <span className="relative z-10">🧭 Recalibrate Navigation</span>
              <span className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </NavLink>
            <button
              onClick={() => navigate(-1)}
              className="px-8 py-4 rounded-xl border border-gray-700 text-gray-300 hover:bg-gray-800 transition"
            >
              ← Jump Back
            </button>
          </div>

          {/* FOOTNOTE */}
          <p className="text-xs text-gray-600 pt-10">
            RD Navigation System • Route Integrity Compromised
          </p>
        </div>
      </div>

      {/* ===== CUSTOM ANIMATIONS ===== */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-30px); }
          }
        `}
      </style>
    </div>
  );
}
