
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-950 to-black">
      <div className="text-center glass-effect p-10 rounded-lg">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-plugin-accent/20 flex items-center justify-center">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2A80B9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold mb-4 text-white">404</h1>
        <p className="text-xl text-gray-400 mb-6">Oops! This page is out of tune</p>
        <a 
          href="/" 
          className="inline-flex items-center justify-center bg-plugin-accent hover:bg-plugin-accent2 text-white px-6 py-3 rounded-md font-medium transition-colors duration-200"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
