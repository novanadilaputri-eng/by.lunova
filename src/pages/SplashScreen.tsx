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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-soft-pink to-gold-rose text-white p-4">
      <h1 className="text-6xl md:text-8xl font-playfair font-extrabold mb-4 animate-pulse">
        By.Lunova
      </h1>
      <p className="text-xl md:text-2xl font-poppins mb-10 text-center">
        Find Your Glow in Every Style ✨
      </p>
      <Button
        onClick={handleEnterApp}
        className="px-10 py-4 text-xl bg-white text-soft-pink hover:bg-gray-100 font-poppins shadow-lg transition-all duration-300 hover:scale-105"
      >
        Ayo Belanja!
      </Button>
    </div>
  );
};

export default SplashScreen;