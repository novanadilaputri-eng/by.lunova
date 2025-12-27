export interface Notification {
  id: string;
  userId: string; // ID of the user (seller) who receives the notification
  type: "order" | "message" | "promotion" | "system";
  message: string;
  isRead: boolean;
  timestamp: string;
  link?: string; // Optional link related to the notification
}