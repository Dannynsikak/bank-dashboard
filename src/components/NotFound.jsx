import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-[3.5rem] font-bold text-gray-700">404</h1>
        <p className="text-[1.25rem] text-gray-600 mt-[2em]">
          Oops! Page not found.
        </p>
        <p className="text-gray-500 mt-[2em]">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="mt-[2em] inline-block px-[2em] py-[1em] bg-blue-600 text-white text-[1.2rem] font-semibold rounded-md hover:bg-blue-700"
        >
          Go to HomePage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
