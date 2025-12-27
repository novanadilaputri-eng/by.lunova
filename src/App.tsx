import React, { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProductListingPage from "./pages/ProductListingPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProfilePage from "./pages/ProfilePage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import OrderTrackingPage from "./pages/OrderTrackingPage";
import ReturnRequestPage from "./pages/ReturnRequestPage";
import WishlistPage from "./pages/WishlistPage";
import VoucherPage from "./pages/VoucherPage";
import AddressPage from "./pages/AddressPage";
import SettingsPage from "./pages/SettingsPage";
import HelpPage from "./pages/HelpPage";
import SellerDashboardPage from "./pages/SellerDashboardPage";
import EditProductPage from "./pages/EditProductPage";
import OrderListPage from "./pages/OrderListPage";
import LunoPointsPage from "./pages/LunoPointsPage";
import LunoLivePage from "./pages/LunoLivePage";
import ChatPage from "./pages/ChatPage";
import SplashScreen from "./pages/SplashScreen";
import VideoListingPage from "./pages/VideoListingPage";
import EditVideoPage from "./pages/EditVideoPage";
import SellerPromotionManagementPage from "./pages/SellerPromotionManagementPage";
import { CartProvider } from "./context/CartContext";
import { ThemeProvider } from "./context/ThemeContext";
import BottomNavigationBar from "./components/BottomNavigationBar";
// Import halaman mobile
import MobileProductListingPage from "./pages/MobileProductListingPage";
import MobileProductDetailPage from "./pages/MobileProductDetailPage";

const queryClient = new QueryClient();

const App = () => {
  const [hasSeenSplashScreen, setHasSeenSplashScreen] = useState(false);
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      const seen = localStorage.getItem('hasSeenSplashScreen');
      if (seen === 'true') {
        setHasSeenSplashScreen(true);
      }
    }
  }, []);

  const handleSplashScreenFinish = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem('hasSeenSplashScreen', 'true');
    }
    setHasSeenSplashScreen(true);
  };

  if (!hasSeenSplashScreen) {
    return <SplashScreen onFinish={handleSplashScreenFinish} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <>
          <Toaster />
          <Sonner />
          <CartProvider>
            <BrowserRouter>
              <>
                <div className="pb-14">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/products" element={<ProductListingPage />} />
                    <Route path="/products/:id" element={<ProductDetailPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/profile/orders" element={<OrderListPage />} />
                    <Route path="/profile/orders/:orderId" element={<OrderTrackingPage />} />
                    <Route path="/profile/return-request" element={<ReturnRequestPage />} />
                    <Route path="/profile/wishlist" element={<WishlistPage />} />
                    <Route path="/profile/vouchers" element={<VoucherPage />} />
                    <Route path="/profile/addresses" element={<AddressPage />} />
                    <Route path="/profile/settings" element={<SettingsPage />} />
                    <Route path="/profile/help" element={<HelpPage />} />
                    <Route path="/profile/lunopoints" element={<LunoPointsPage />} />
                    <Route path="/seller/dashboard" element={<SellerDashboardPage />} />
                    <Route path="/seller/products/new" element={<EditProductPage />} />
                    <Route path="/seller/products/edit/:id" element={<EditProductPage />} />
                    <Route path="/seller/promotions" element={<SellerPromotionManagementPage />} />
                    <Route path="/live" element={<LunoLivePage />} />
                    <Route path="/videos" element={<VideoListingPage />} />
                    <Route path="/seller/videos/new" element={<EditVideoPage />} />
                    <Route path="/seller/videos/edit/:id" element={<EditVideoPage />} />
                    <Route path="/chat" element={<ChatPage />} />
                    {/* Routing untuk versi mobile */}
                    <Route path="/m/products" element={<MobileProductListingPage />} />
                    <Route path="/m/products/:id" element={<MobileProductDetailPage />} />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </div>
                <BottomNavigationBar />
              </>
            </BrowserRouter>
          </CartProvider>
        </>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;