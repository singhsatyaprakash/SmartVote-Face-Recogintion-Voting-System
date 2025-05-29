import React from 'react';

const PageNotFound = () => {
  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center bg-cover bg-center relative"
    >
      <div className="bg-black bg-opacity-60 rounded-xl px-8 py-10 flex flex-col items-center shadow-lg">
        <h1 className="text-5xl font-bold text-white mb-4">404</h1>
        <h2 className="text-2xl text-white mb-2">Page Not Found</h2>
        <p className="text-white mb-6">Sorry, the page you are looking for does not exist.</p>
        <a
          href="/"
          className="mt-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Go Home
        </a>
      </div>
    </div>
  );
};

export default PageNotFound;