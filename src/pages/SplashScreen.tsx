"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
// import { useNavigate } from 'react-router-dom'; // Hapus import ini

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  // const navigate = useNavigate(); // Hapus hook ini

  const handleEnterApp = () => {
    onFinish();
    // navigate('/'); // Hapus panggilan ini, onFinish akan menangani transisi
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-soft-pink to-gold-rose text-white p-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-white opacity-10 rounded-full transform rotate-45 -translate-x-1/2 -translate-y-1/2 animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-white opacity-10 rounded-full transform -rotate-30 translate-x-1/2 translate-y-1/2 animate-slow-spin"></div>
      <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-white opacity-5 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div> {/* New pulsing circle */}
      <div className="absolute top-0 left-1/2 w-96 h-2 bg-white opacity-15 transform -rotate-12 -translate-x-1/2 animate-float"></div>
      <div className="absolute bottom-0 right-1/2 w-96 h-2 bg-white opacity-15 transform rotate-12 translate-x-1/2 animate-float"></div>
      <div className="absolute top-1/2 left-0 w-2 h-96 bg-white opacity-15 transform rotate-30 -translate-y-1/2 animate-slow-spin"></div>
      <div className="absolute top-1/2 right-0 w-2 h-96 bg-white opacity-15 transform -rotate-30 -translate-y-1/2 animate-slow-spin"></div>
      <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-white opacity-10 rounded-full animate-float delay-1000"></div> {/* Another floating circle */}


      <h1 className="text-7xl md:text-9xl font-playfair font-extrabold mb-4 animate-pulse relative z-10 drop-shadow-lg"> {/* Increased size, added drop-shadow */}
        By.Lunova
      </h1>
      <p className="text-xl md:text-2xl font-poppins mb-10 text-center relative z-10">
        Find Your Glow in Every Style ✨
      </p>
      <Button
        onClick={handleEnterApp}
        className="px-10 py-4 text-xl bg-white text-soft-pink hover:bg-gray-100 font-poppins shadow-lg transition-all duration-300 hover:scale-105 relative z-10"
      >
        Ayo Belanja!
      </Button>
    </div>
  );
};

export default SplashScreen;