import React from 'react';
import Navbar from '../components/Navbar';

const About = () => {
  return (
    <>
      <Navbar />
      <div className="pt-24 px-6 py-10 md:px-16 lg:px-32 bg-gray-50 min-h-screen">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-blue-600">
          About the Smart Election Face Recognition System
        </h2>

        <p className="text-base md:text-lg text-gray-700 mb-4 leading-relaxed">
          We are using this Smart Election Face Recognition System to provide a safer,
          more accessible, and efficient voting experience for everyone. With this
          web-based platform, even citizens living abroad or those unable to travel
          can cast their votes securely from their own location.
        </p>

        <p className="text-base md:text-lg text-gray-700 mb-4 leading-relaxed">
          By integrating face recognition technology, we reduce the risk of voter fraud
          and enhance trust in the electoral process. This system not only ensures
          security but also increases voter turnout, empowering more people to participate
          in choosing their government.
        </p>

        <h3 className="text-xl font-semibold text-blue-500 mt-10 mb-2">Why Face Recognition?</h3>
        <p className="text-base md:text-lg text-gray-700 mb-4 leading-relaxed">
          Traditional voting methods can be time-consuming and sometimes unreliable.
          With face recognition, we ensure each voter is verified uniquely and securely.
          It eliminates duplicate votes and impersonation, ensuring transparency and fairness.
        </p>

        <h3 className="text-xl font-semibold text-blue-500 mt-6 mb-2">Key Features:</h3>
        <ul className="list-disc pl-6 text-base md:text-lg text-gray-700 space-y-2">
          <li>Remote voting from anywhere in the world</li>
          <li>Secure facial recognition authentication</li>
          <li>Fraud prevention and identity protection</li>
          <li>User-friendly web interface</li>
          <li>Real-time verification and vote logging</li>
        </ul>

        <h3 className="text-xl font-semibold text-blue-500 mt-6 mb-2">Technology Used:</h3>
        <p className="text-base md:text-lg text-gray-700 mb-4 leading-relaxed">
          The system uses cutting-edge technologies like OpenCV for facial detection,
          DNN models for accurate recognition, and a secure backend powered by Python
          and databases like MySQL or Firebase. Frontend is built with modern web
          technologies including React and Tailwind CSS for responsive design.
        </p>

        <h3 className="text-xl font-semibold text-blue-500 mt-6 mb-2">Security & Privacy</h3>
        <p className="text-base md:text-lg text-gray-700 mb-4 leading-relaxed">
          All user data is encrypted and securely stored. The face recognition
          model ensures that only eligible voters are authenticated. No sensitive
          data is shared or exposed at any point, ensuring complete privacy.
        </p>

        <h3 className="text-xl font-semibold text-blue-500 mt-6 mb-2">Our Vision</h3>
        <p className="text-base md:text-lg text-gray-700 mb-4 leading-relaxed">
          We envision a future where voting is secure, accessible, and empowering
          for all — regardless of physical location or mobility. Our goal is to
          leverage AI and technology to strengthen democracy and civic participation.
        </p>
      </div>
    </>
  );
};

export default About;
