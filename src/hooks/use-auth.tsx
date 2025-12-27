"use client";

import { useState, useEffect, useCallback } from "react";

interface AuthContextType {
  userRole: "buyer" | "seller" | "admin" | null;
  loginAsBuyer: () => void;
  loginAsSeller: () => void; // This will now initiate OTP flow
  logout: () => void;
  isVerifyingSeller: boolean;
  initiateSellerOtp: () => string; // Function to simulate sending OTP
  verifySellerOtp: (code: string) => boolean; // Function to simulate verifying OTP
  cancelSellerOtp: () => void;
}

// For demo purposes, we'll use localStorage to persist the role
// In a real app, this would involve actual authentication logic
export const useAuth = (): AuthContextType => {
  const [userRole, setUserRole] = useState<"buyer" | "seller" | "admin" | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("userRole") as "buyer" | "seller" | "admin" | null;
    }
    return null;
  });
  const [isVerifyingSeller, setIsVerifyingSeller] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState<string | null>(null);

  useEffect(() => {
    if (userRole) {
      localStorage.setItem("userRole", userRole);
    } else {
      localStorage.removeItem("userRole");
    }
  }, [userRole]);

  const loginAsBuyer = useCallback(() => {
    setUserRole("buyer");
    setIsVerifyingSeller(false); // Ensure OTP flow is cancelled
  }, []);

  const loginAsSeller = useCallback(() => {
    // In a real app, this would trigger a backend call to send OTP
    setIsVerifyingSeller(true);
    setGeneratedOtp(null); // Clear previous OTP
  }, []);

  const initiateSellerOtp = useCallback(() => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    setGeneratedOtp(otp);
    console.log(`Simulated WhatsApp OTP for seller: ${otp}`); // Log for demo purposes
    return otp;
  }, []);

  const verifySellerOtp = useCallback((code: string) => {
    if (generatedOtp && code === generatedOtp) {
      setUserRole("seller");
      setIsVerifyingSeller(false);
      setGeneratedOtp(null);
      return true;
    }
    return false;
  }, [generatedOtp]);

  const cancelSellerOtp = useCallback(() => {
    setIsVerifyingSeller(false);
    setGeneratedOtp(null);
  }, []);

  const logout = useCallback(() => {
    setUserRole(null);
    setIsVerifyingSeller(false); // Ensure OTP flow is cancelled
    setGeneratedOtp(null);
  }, []);

  return {
    userRole,
    loginAsBuyer,
    loginAsSeller,
    logout,
    isVerifyingSeller,
    initiateSellerOtp,
    verifySellerOtp,
    cancelSellerOtp,
  };
};