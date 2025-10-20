"use client";

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, PlayCircle, ShoppingCart, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  isActive: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon: Icon, label, isActive }) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex flex-col items-center justify-center flex-1 py-2 text-xs transition-colors duration-200",
        isActive ? "text-soft-pink" : "text-gray-500 hover:text-gray-700"
      )}
    >
      <Icon className="h-5 w-5 mb-1" />
      <span>{label}</span>
    </Link>
  );
};

const BottomNavigationBar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/products", icon: Search, label: "Cari" },
    { to: "/live", icon: PlayCircle, label: "Live" }, // Placeholder route
    { to: "/cart", icon: ShoppingCart, label: "Keranjang" },
    { to: "/profile", icon: User, label: "Akun Saya" }, // Placeholder route
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-lg md:hidden">
      <div className="flex h-14">
        {navItems.map((item) => (
          <NavItem
            key={item.to}
            to={item.to}
            icon={item.icon}
            label={item.label}
            isActive={location.pathname === item.to || (item.to === "/products" && location.pathname.startsWith("/products/"))}
          />
        ))}
      </div>
    </nav>
  );
};

export default BottomNavigationBar;