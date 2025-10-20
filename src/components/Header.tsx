import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

const Header: React.FC = () => {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link to="/" className="text-2xl font-bold text-rose-600 hover:text-rose-700 transition-colors">
          Fashionista
        </Link>
        <nav className="flex items-center space-x-4">
          <Button asChild variant="ghost" className="relative">
            <Link to="/cart">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-xs text-white">
                  {totalItems}
                </span>
              )}
              <span className="sr-only">Keranjang</span>
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;