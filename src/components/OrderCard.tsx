import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Order, OrderItem } from "@/types/order";
import { Package, Truck, CheckCircle, Clock, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface OrderCardProps {
  order: Order;
}

const getStatusIcon = (status: Order["status"]) => {
  switch (status) {
    case "Menunggu Pembayaran":
      return <Clock className="h-4 w-4 text-orange-500" />;
    case "Dikemas":
    case "Diproses":
      return <Package className="h-4 w-4 text-blue-500" />;
    case "Sedang Dalam Perjalanan":
    case "Menunggu Penjemputan Kurir":
      return <Truck className="h-4 w-4 text-indigo-500" />;
    case "Telah Sampai":
    case "Selesai":
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case "Dibatalkan":
      return <XCircle className="h-4 w-4 text-red-500" />;
    default:
      return <Package className="h-4 w-4 text-gray-500" />;
  }
};

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const firstItem = order.items[0];
  const otherItemsCount = order.items.length - 1;

  return (
    <Card className="w-full overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-beige">
      <Link to={`/profile/orders/${order.id}`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              {getStatusIcon(order.status)}
              <span className={cn(
                "font-poppins font-semibold text-sm",
                order.status === "Menunggu Pembayaran" && "text-orange-600",
                (order.status === "Dikemas" || order.status === "Diproses") && "text-blue-600",
                (order.status === "Sedang Dalam Perjalanan" || order.status === "Menunggu Penjemputan Kurir") && "text-indigo-600",
                (order.status === "Telah Sampai" || order.status === "Selesai") && "text-green-600",
                order.status === "Dibatalkan" && "text-red-600"
              )}>
                {order.status}
              </span>
            </div>
            <span className="text-xs text-gray-500 font-poppins">
              {new Date(order.orderDate).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <img
              src={firstItem.imageUrl}
              alt={firstItem.name}
              className="w-20 h-20 object-cover rounded-md flex-shrink-0"
            />
            <div className="flex-grow">
              <h3 className="text-md font-poppins font-semibold text-gray-800 line-clamp-2">
                {firstItem.name}
              </h3>
              <p className="text-sm text-gray-600 font-poppins">
                {firstItem.quantity}x {firstItem.size}, {firstItem.color}
              </p>
              {otherItemsCount > 0 && (
                <p className="text-sm text-gray-500 font-poppins">+{otherItemsCount} produk lainnya</p>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center mt-4 pt-3 border-t border-beige">
            <span className="text-sm text-gray-700 font-poppins">Total Pembayaran:</span>
            <span className="text-lg font-playfair font-bold text-gold-rose">
              Rp{order.totalAmount.toLocaleString("id-ID")}
            </span>
          </div>
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full bg-soft-pink hover:bg-rose-600 text-white font-poppins">
          <Link to={`/profile/orders/${order.id}`}>Lihat Detail Pesanan</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OrderCard;