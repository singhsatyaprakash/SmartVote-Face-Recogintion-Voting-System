import React from 'react';
import Navbar from '../../components/Navbar';

const Contact = () => {
  return (
    <>
      <Navbar />
      <div className="pt-24 px-6 py-10 md:px-16 lg:px-32 bg-gray-50 min-h-screen">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-700 mb-8">
          Contact & Support
        </h2>

        <div className="bg-white shadow-md rounded-xl p-6 md:p-10 space-y-6">
          <p className="text-gray-700 text-lg">
            If you have any issues, feedback, or want to report a problem related to the
            Smart Election Face Recognition System, feel free to reach out to us:
          </p>

          <div className="space-y-4">
            <div>
              <span className="font-semibold text-gray-800">📞 Toll-Free Number:</span>
              <p className="text-gray-600">1800-123-4567</p>
            </div>

            <div>
              <span className="font-semibold text-gray-800">✉️ Email:</span>
              <p className="text-gray-600">support@smartelection.gov</p>
            </div>

            <div>
              <span className="font-semibold text-gray-800">🌐 Official Website:</span>
              <a
                href="https://www.smartelection.gov"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline hover:text-blue-800 transition"
              >
                www.smartelection.gov
              </a>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4 text-blue-600">Submit a Complaint or Feedback</h3>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <textarea
                placeholder="Your Message"
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              ></textarea>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
