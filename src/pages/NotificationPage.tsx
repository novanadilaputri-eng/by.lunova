import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HomePageHeader from "@/components/HomePageHeader";
import { Button } from "@/components/ui/button";
import { mockNotifications, markNotificationAsRead } from "@/data/notifications";
import { Bell, CheckCircle, Clock, Package, XCircle } from "lucide-react";
import { showSuccess } from "@/utils/toast";

const NotificationPage: React.FC = () => {
  const [notifications, setNotifications] = useState(mockNotifications);

  useEffect(() => {
    // Update local state when global mock data changes
    setNotifications([...mockNotifications]);
  }, [mockNotifications]);

  const handleMarkAsRead = (id: string) => {
    markNotificationAsRead(id);
    setNotifications([...mockNotifications]); // Refresh local state
    showSuccess("Notifikasi ditandai sebagai sudah dibaca.");
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "order":
        return <Package className="h-5 w-5 text-soft-pink" />;
      case "system":
        return <Bell className="h-5 w-5 text-gold-rose" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const getNotificationTitle = (type: string) => {
    switch (type) {
      case "order":
        return "Pesanan";
      case "system":
        return "Sistem";
      default:
        return "Notifikasi";
    }
  };

  return (
    <>
      <HomePageHeader />
      <div className="container mx-auto p-4 md:p-8">
        <h1 className="text-4xl font-playfair font-bold text-center mb-10 text-gray-900">Pemberitahuan</h1>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-2xl mx-auto">
          {notifications.length === 0 ? (
            <div className="text-center py-8">
              <Bell className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-lg text-gray-600 font-poppins dark:text-gray-400">Tidak ada notifikasi baru.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`border p-4 rounded-lg ${notification.isRead ? "bg-gray-50 dark:bg-gray-700" : "bg-beige dark:bg-gray-600 border-soft-pink"}`}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="ml-3 flex-grow">
                      <div className="flex items-center justify-between">
                        <h3 className="font-poppins font-semibold text-gray-800 dark:text-gray-200">
                          {getNotificationTitle(notification.type)}
                        </h3>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(notification.timestamp).toLocaleDateString('id-ID', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mt-1 font-poppins">
                        {notification.message}
                      </p>
                      {notification.link && (
                        <Link to={notification.link} className="text-soft-pink text-sm font-poppins hover:underline mt-2 inline-block">
                          Lihat detail
                        </Link>
                      )}
                    </div>
                  </div>
                  {!notification.isRead && (
                    <div className="mt-3 flex justify-end">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleMarkAsRead(notification.id)}
                        className="border-soft-pink text-soft-pink hover:bg-soft-pink hover:text-white font-poppins"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" /> Tandai Dibaca
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="text-center mt-8">
          <Button asChild variant="outline" className="border-soft-pink text-soft-pink hover:bg-soft-pink hover:text-white font-poppins">
            <Link to="/profile">Kembali ke Akun Saya</Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default NotificationPage;