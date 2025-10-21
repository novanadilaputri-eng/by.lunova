import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import HomePageHeader from "@/components/HomePageHeader";
import { Settings, Bell, Languages, MoonStar } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useTheme } from "@/context/ThemeContext"; // Import useTheme

const SettingsPage: React.FC = () => {
  const { theme, toggleTheme } = useTheme(); // Use the theme context

  return (
    <>
      <HomePageHeader />
      <div className="container mx-auto p-4 md:p-8">
        <h1 className="text-4xl font-playfair font-bold text-center mb-10 text-gray-900 dark:text-gray-100">Pengaturan Aplikasi</h1>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-2xl mx-auto space-y-6">
          <div className="flex items-center justify-between border-b pb-4 border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <Bell className="h-5 w-5 text-soft-pink mr-3" />
              <Label htmlFor="notification-switch" className="text-lg font-poppins font-medium text-gray-800 dark:text-gray-200">Notifikasi</Label>
            </div>
            <Switch id="notification-switch" defaultChecked className="data-[state=checked]:bg-soft-pink" />
          </div>

          <div className="flex items-center justify-between border-b pb-4 border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <Languages className="h-5 w-5 text-soft-pink mr-3" />
              <Label htmlFor="language-setting" className="text-lg font-poppins font-medium text-gray-800 dark:text-gray-200">Bahasa</Label>
            </div>
            <span className="text-gray-700 font-poppins dark:text-gray-300">Bahasa Indonesia</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <MoonStar className="h-5 w-5 text-soft-pink mr-3" />
              <Label htmlFor="dark-mode-switch" className="text-lg font-poppins font-medium text-gray-800 dark:text-gray-200">Mode Gelap</Label>
            </div>
            <Switch
              id="dark-mode-switch"
              checked={theme === "dark"}
              onCheckedChange={toggleTheme}
              className="data-[state=checked]:bg-soft-pink"
            />
          </div>
        </div>

        <div className="text-center mt-8">
          <Button asChild variant="outline" className="border-soft-pink text-soft-pink hover:bg-soft-pink hover:text-white font-poppins dark:border-gold-rose dark:text-gold-rose dark:hover:bg-gold-rose dark:hover:text-white">
            <Link to="/profile">Kembali ke Akun Saya</Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default SettingsPage;