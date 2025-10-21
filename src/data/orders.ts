import { Order } from "@/types/order";
import { products } from "./products";

// Helper to get product details for order items
const getProductDetails = (productId: string, size: string, color: string, quantity: number) => {
  const product = products.find(p => p.id === productId);
  if (!product) {
    return {
      productId,
      name: "Produk Tidak Ditemukan",
      imageUrl: "https://via.placeholder.com/150?text=No+Image",
      price: 0,
      size,
      color,
      quantity,
    };
  }
  const imageUrl = product.colorImages.find(ci => ci.color === color)?.imageUrl || product.mainImageUrl;
  return {
    productId: product.id,
    name: product.name,
    imageUrl,
    price: product.price,
    size,
    color,
    quantity,
  };
};

export let mockOrders: Order[] = [
  {
    id: "BYLNV-20231225-001",
    userId: "user1",
    orderDate: "2023-12-25T10:00:00Z",
    status: "Selesai",
    items: [
      getProductDetails("1", "M", "Putih", 1),
      getProductDetails("4", "L", "Hitam", 2),
    ],
    totalAmount: 125000 * 1 + 75000 * 2 + 15000, // product 1 + product 4 * 2 + shipping
    shippingAddress: "Jl. Contoh No. 123, Jakarta",
    paymentMethod: "Transfer Bank (BCA)",
    courier: "ByLuno Express",
    trackingNumber: "BYLNV-TRK-001",
    deliveryEstimate: "2023-12-27",
  },
  {
    id: "BYLNV-20240110-002",
    userId: "user1",
    orderDate: "2024-01-10T14:30:00Z",
    status: "Sedang Dalam Perjalanan",
    items: [
      getProductDetails("2", "M", "Beige", 1),
    ],
    totalAmount: 180000 + 15000, // product 2 + shipping
    shippingAddress: "Jl. Contoh No. 123, Jakarta",
    paymentMethod: "E-Wallet (Gopay)",
    courier: "Reguler",
    trackingNumber: "BYLNV-TRK-002",
    deliveryEstimate: "2024-01-13",
  },
  {
    id: "BYLNV-20240115-003",
    userId: "user1",
    orderDate: "2024-01-15T09:15:00Z",
    status: "Menunggu Pembayaran",
    items: [
      getProductDetails("3", "L", "Coklat", 1),
      getProductDetails("5", "All Size", "Cream", 1),
    ],
    totalAmount: 250000 + 150000, // product 3 + product 5 (no shipping yet)
    shippingAddress: "Jl. Contoh No. 123, Jakarta",
    paymentMethod: "Transfer Bank (Mandiri)",
    courier: "ByLuno Express",
    deliveryEstimate: "2024-01-18",
  },
  {
    id: "BYLNV-20240116-004",
    userId: "user1",
    orderDate: "2024-01-16T11:00:00Z",
    status: "Dikemas",
    items: [
      getProductDetails("6", "S", "Peach", 1),
    ],
    totalAmount: 195000 + 15000,
    shippingAddress: "Jl. Contoh No. 123, Jakarta",
    paymentMethod: "COD",
    courier: "Reguler",
    trackingNumber: "BYLNV-TRK-004",
    deliveryEstimate: "2024-01-19",
  },
  {
    id: "BYLNV-20240117-005",
    userId: "user1",
    orderDate: "2024-01-17T16:00:00Z",
    status: "Dibatalkan",
    items: [
      getProductDetails("7", "M", "Ocean Blue", 1),
    ],
    totalAmount: 210000,
    shippingAddress: "Jl. Contoh No. 123, Jakarta",
    paymentMethod: "Transfer Bank (BCA)",
    courier: "ByLuno Express",
  },
];

export const updateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
  const orderIndex = mockOrders.findIndex(order => order.id === orderId);
  if (orderIndex > -1) {
    mockOrders[orderIndex].status = newStatus;
    // For demo, also update orderDate to reflect status change time
    mockOrders[orderIndex].orderDate = new Date().toISOString();
    console.log(`Order ${orderId} status updated to ${newStatus}`);
    // In a real app, you'd persist this to a database
  }
};