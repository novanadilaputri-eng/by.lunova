export interface Promotion {
  id: string;
  title: string;
  message: string;
  imageUrl?: string; // Optional image for the promotion
  isActive: boolean;
  startDate: string;
  endDate: string;
  sellerId: string; // To link promotion to a specific seller
}