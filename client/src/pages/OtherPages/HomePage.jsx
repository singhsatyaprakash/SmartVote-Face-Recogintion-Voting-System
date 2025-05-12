
import React from 'react';
import { Link } from 'react-router-dom';
import HomeImage from '../../assets/HomeImage.jpg';
import Navbar from '../../components/Navbar';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Footer from '../../components/Footer';

const HomePage = () => {
  return (
    <>
    <Navbar></Navbar>
    <div className='Box flex flex-col md:flex-row h-full min-h-screen w-screen p-4 md:p-12 box-border overflow-hidden bg-white dark:bg-gray-900 transition-colors duration-500'>
      <div className="photo w-full md:w-2/3 p-4 md:p-12 box-border flex justify-center items-center animate-fade-in">
        <img
          className='h-auto max-h-[400px] md:max-h-full w-full mt-12 rounded-md object-cover shadow-lg transition-all duration-500 hover:scale-101'
          src={HomeImage}
          alt="Home"
        />
      </div>
      
      <div className="welcome w-full md:w-1/3 flex flex-col justify-center items-center text-center px-4 text-gray-800 dark:text-gray-100 animate-slide-up">
        <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-8 md:mt-16 mb-4 font-semibold transition-all duration-500'>
          Welcome to Smart Voting Election System
        </h1>
        <p className='mb-4 text-sm sm:text-base'>
          <b>Empowering Democracy with Face Recognition Voting</b><br />
          Our Face Recognition-Based Voting System delivers a secure, efficient, and fraud-proof election process. By eliminating voter impersonation and ensuring accurate, transparent, and fast voting, we are building the future of fair and trusted democratic participation.
        </p>
        <Link to='/user-type'>
          <button className="mt-4 bg-blue-600 hover:bg-blue-700 transition-colors duration-300 text-white px-6 py-3 rounded-lg flex items-center gap-2 shadow-md">
            Get Started <KeyboardArrowRightIcon />
          </button>
        </Link>
      </div>
    </div>
    <Footer></Footer>
    </>
  );
};

export default HomePage;
