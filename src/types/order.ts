import { Product } from "./product";

export interface OrderItem {
  productId: string;
  name: string;
  imageUrl: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
}

export type OrderStatus = "Pesanan Dibuat" | "Menunggu Pembayaran" | "Pembayaran Dikonfirmasi" | "Diproses" | "Dikemas" | "Menunggu Penjemputan Kurir" | "Sedang Dalam Perjalanan" | "Telah Sampai" | "Selesai" | "Dibatalkan";

export interface Order {
  id: string;
  userId: string;
  orderDate: string;
  status: OrderStatus;
  items: OrderItem[];
  totalAmount: number;
  shippingAddress: string;
  paymentMethod: string;
  courier: string;
  trackingNumber?: string;
  deliveryEstimate?: string;
}