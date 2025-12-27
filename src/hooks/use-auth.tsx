"use client";

import { useState, useEffect } from "react";
import { showSuccess } from "@/utils/toast"; // Import showSuccess

interface AuthContextType {
  userRole: "buyer" | "seller" | "admin" | null;
  loginAsBuyer: () => void;
  loginAsSeller: () => void; // This will now be triggered after WhatsApp verification
  logout: () => void;
  simulateWhatsAppLogin: () => void; // New function to trigger WhatsApp flow
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

  useEffect(() => {
    if (userRole) {
      localStorage.setItem("userRole", userRole);
    } else {
      localStorage.removeItem("userRole");
    }
  }, [userRole]);

  const loginAsBuyer = () => {
    setUserRole("buyer");
    showSuccess("Anda telah login sebagai Pembeli.");
  };

  // This function is now called *after* simulated WhatsApp verification
  const loginAsSeller = () => {
    setUserRole("seller");
    // showSuccess("Anda telah login sebagai Penjual."); // Toast moved to WhatsAppVerificationDialog
  };

  const logout = () => {
    setUserRole(null);
    showSuccess("Anda telah logout.");
  };

  // Placeholder for triggering WhatsApp verification flow
  const simulateWhatsAppLogin = () => {
    // In a real app, this would initiate the backend process to send a WhatsApp code
    // For now, it just logs a message and the UI handles the rest.
    console.log("Simulating WhatsApp login flow...");
  };

  return { userRole, loginAsBuyer, loginAsSeller, logout, simulateWhatsAppLogin };
};