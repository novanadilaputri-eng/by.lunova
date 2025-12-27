import { Notification } from "@/types/notification";

export let mockNotifications: Notification[] = [
  {
    id: "notif1",
    userId: "seller1", // Assuming a seller ID
    type: "order",
    message: "Pesanan baru masuk! #BYLNV-20240115-003",
    isRead: false,
    timestamp: "2024-01-15T09:16:00Z",
    link: "/seller/dashboard",
  },
  {
    id: "notif2",
    userId: "seller1",
    type: "system",
    message: "Selamat datang di Dashboard Penjual By.Lunova!",
    isRead: true,
    timestamp: "2024-01-01T08:00:00Z",
    link: "/seller/dashboard",
  },
];

export const addNotification = (newNotification: Omit<Notification, 'id'>) => {
  const notificationWithId: Notification = {
    ...newNotification,
    id: `notif-${Date.now()}`,
  };
  mockNotifications.unshift(notificationWithId); // Add to the beginning
  return notificationWithId;
};

export const markNotificationAsRead = (notificationId: string) => {
  const index = mockNotifications.findIndex(n => n.id === notificationId);
  if (index !== -1) {
    mockNotifications[index].isRead = true;
  }
};

export const getUnreadNotificationsCount = (userId: string) => {
  return mockNotifications.filter(n => n.userId === userId && !n.isRead).length;
};