"use client";

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, PlayCircle, ShoppingCart, User, Video as VideoIcon } from 'lucide-react'; // Import VideoIcon
import { cn } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { Badge } from '@/components/ui/badge';

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  badgeContent?: number;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon: Icon, label, isActive, badgeContent }) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex flex-col items-center justify-center flex-1 py-2 text-xs transition-colors duration-200 relative",
        isActive ? "text-soft-pink" : "text-gray-500 hover:text-gray-700"
      )}
    >
      <Icon className="h-5 w-5 mb-1" />
      <span>{label}</span>
      {badgeContent !== undefined && badgeContent > 0 && (
        <Badge className="absolute top-0 right-2 h-4 w-4 p-0 flex items-center justify-center rounded-full bg-red-500 text-white text-xs">
          {badgeContent}
        </Badge>
      )}
    </Link>
  );
};

const BottomNavigationBar: React.FC = () => {
  const location = useLocation();
  const { getTotalItems } = useCart();
  const totalCartItems = getTotalItems();

  const navItems = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/products", icon: Search, label: "Cari" },
    { to: "/live", icon: PlayCircle, label: "Live" },
    { to: "/videos", icon: VideoIcon, label: "Video" }, // New Video item
    { to: "/cart", icon: ShoppingCart, label: "Keranjang", badgeContent: totalCartItems },
    { to: "/profile", icon: User, label: "Akun Saya" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-lg dark:bg-gray-900 dark:border-gray-700">
      <div className="flex h-14">
        {navItems.map((item) => (
          <NavItem
            key={item.to}
            to={item.to}
            icon={item.icon}
            label={item.label}
            isActive={location.pathname === item.to || (item.to === "/products" && location.pathname.startsWith("/products/"))}
            badgeContent={item.badgeContent}
          />
        ))}
      </div>
    </nav>
  );
};

export default BottomNavigationBar;