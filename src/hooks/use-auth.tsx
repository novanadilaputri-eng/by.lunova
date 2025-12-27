"use client";

import { useState, useEffect } from "react";

interface AuthContextType {
  userRole: "buyer" | "seller" | "admin" | null;
  loginAsBuyer: () => void;
  loginAsSeller: () => void;
  logout: () => void;
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

  const loginAsBuyer = () => setUserRole("buyer");
  const loginAsSeller = () => setUserRole("seller");
  const logout = () => setUserRole(null);

  return { userRole, loginAsBuyer, loginAsSeller, logout };
};