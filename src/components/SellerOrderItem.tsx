import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Order } from "@/types/order";
import { Package, Truck, CheckCircle, Clock, Printer, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface SellerOrderItemProps {
  order: Order;
  onUpdateStatus: (orderId: string, newStatus: Order["status"]) => void;
}

const getStatusIcon = (status: Order["status"]) => {
  switch (status) {
    case "Menunggu Pembayaran":
      return <Clock className="h-4 w-4 text-orange-500" />;
    case "Diproses":
    case "Dikemas":
      return <Package className="h-4 w-4 text-blue-500" />;
    case "Menunggu Penjemputan Kurir":
    case "Sedang Dalam Perjalanan":
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

const SellerOrderItem: React.FC<SellerOrderItemProps> = ({ order, onUpdateStatus }) => {
  const firstItem = order.items[0];
  const otherItemsCount = order.items.length - 1;

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  const handlePrintReceipt = () => {
    const receiptContent = `
      <!DOCTYPE html>
      <html lang="id">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Resi Pesanan #${order.id}</title>
          <style>
              body { font-family: 'Poppins', sans-serif; margin: 20px; color: #333; }
              h1, h2, h3 { font-family: 'Playfair Display', serif; color: #333; }
              .container { width: 80mm; margin: 0 auto; padding: 10mm; border: 1px solid #eee; box-shadow: 0 0 10px rgba(0,0,0,0.05); }
              .header { text-align: center; margin-bottom: 20px; }
              .header h1 { font-size: 24px; color: #EAC4A3; margin: 0; }
              .header p { font-size: 12px; color: #666; margin-top: 5px; }
              .section-title { font-size: 16px; font-weight: bold; margin-top: 20px; margin-bottom: 10px; border-bottom: 1px dashed #eee; padding-bottom: 5px; }
              .info-row { display: flex; justify-content: space-between; margin-bottom: 5px; font-size: 12px; }
              .info-row span:first-child { font-weight: 500; }
              .item-table { width: 100%; border-collapse: collapse; margin-top: 15px; }
              .item-table th, .item-table td { border: 1px solid #eee; padding: 8px; text-align: left; font-size: 12px; }
              .item-table th { background-color: #f8f8f8; font-weight: bold; }
              .total-row { font-size: 14px; font-weight: bold; margin-top: 15px; text-align: right; }
              .total-row span:first-child { margin-right: 10px; }
              .footer { text-align: center; margin-top: 30px; font-size: 10px; color: #999; }
              @media print {
                  body { margin: 0; }
                  .container { width: auto; border: none; box-shadow: none; padding: 0; }
                  .no-print { display: none; }
              }
          </style>
          <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <h1>By.Lunova</h1>
                  <p>Find Your Glow in Every Style ✨</p>
                  <p>Resi Pesanan</p>
              </div>

              <div class="section-title">Detail Pesanan</div>
              <div class="info-row"><span>ID Pesanan:</span><span>#${order.id}</span></div>
              <div class="info-row"><span>Tanggal Pesanan:</span><span>${formatDate(order.orderDate)}</span></div>
              <div class="info-row"><span>Status:</span><span>${order.status}</span></div>
              <div class="info-row"><span>Metode Pembayaran:</span><span>${order.paymentMethod}</span></div>
              <div class="info-row"><span>Kurir:</span><span>${order.courier}</span></div>
              ${order.trackingNumber ? `<div class="info-row"><span>Nomor Resi:</span><span>${order.trackingNumber}</span></div>` : ''}

              <div class="section-title">Alamat Pengiriman</div>
              <p style="font-size: 12px;">${order.shippingAddress}</p>

              <div class="section-title">Produk</div>
              <table class="item-table">
                  <thead>
                      <tr>
                          <th>Produk</th>
                          <th>Ukuran</th>
                          <th>Warna</th>
                          <th>Jumlah</th>
                          <th>Harga Satuan</th>
                          <th>Subtotal</th>
                      </tr>
                  </thead>
                  <tbody>
                      ${order.items.map(item => `
                          <tr>
                              <td>${item.name}</td>
                              <td>${item.size}</td>
                              <td>${item.color}</td>
                              <td>${item.quantity}</td>
                              <td>Rp${item.price.toLocaleString("id-ID")}</td>
                              <td>Rp${(item.price * item.quantity).toLocaleString("id-ID")}</td>
                          </tr>
                      `).join('')}
                  </tbody>
              </table>

              <div class="total-row" style="margin-top: 20px;">
                  <span>Subtotal Produk:</span>
                  <span>Rp${order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString("id-ID")}</span>
              </div>
              <div class="total-row">
                  <span>Biaya Pengiriman:</span>
                  <span>Rp${(order.totalAmount - order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)).toLocaleString("id-ID")}</span>
              </div>
              <div class="total-row" style="font-size: 18px; color: #EAC4A3;">
                  <span>Total Pembayaran:</span>
                  <span>Rp${order.totalAmount.toLocaleString("id-ID")}</span>
              </div>

              <div class="footer">
                  Terima kasih telah berbelanja di By.Lunova!
              </div>
          </div>
      </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(receiptContent);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    } else {
      alert('Mohon izinkan pop-up untuk mencetak resi.');
    }
  };

  return (
    <Card className="w-full overflow-hidden rounded-lg shadow-lg border-2 border-beige dark:border-gray-700 bg-white dark:bg-gray-800">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="font-poppins font-semibold text-sm text-gray-800 dark:text-gray-200">
            Pesanan #{order.id}
          </span>
          <span className="text-xs text-gray-500 font-poppins dark:text-gray-400">
            {formatDate(order.orderDate)}
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <img
            src={firstItem.imageUrl}
            alt={firstItem.name}
            className="w-16 h-16 object-cover rounded-md flex-shrink-0"
          />
          <div className="flex-grow">
            <h3 className="text-md font-poppins font-semibold text-gray-800 dark:text-gray-200 line-clamp-2">
              {firstItem.name}
            </h3>
            <p className="text-sm text-gray-600 font-poppins dark:text-gray-400">
              {firstItem.quantity}x {firstItem.size}, {firstItem.color}
            </p>
            {otherItemsCount > 0 && (
              <p className="text-sm text-gray-500 font-poppins dark:text-gray-400">+{otherItemsCount} produk lainnya</p>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center mt-4 pt-3 border-t border-beige dark:border-gray-700">
          <span className="text-sm font-poppins text-gray-700 dark:text-gray-300">Total:</span>
          <span className="text-lg font-playfair font-bold text-gold-rose">
            Rp{order.totalAmount.toLocaleString("id-ID")}
          </span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-col space-y-2">
        <span className="text-sm font-poppins text-gray-700 dark:text-gray-300">Status: <span className="font-semibold text-soft-pink">{order.status}</span></span>
        <div className="flex gap-2 w-full">
          {order.status === "Menunggu Pembayaran" && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onUpdateStatus(order.id, "Diproses")}
              className="flex-1 border-soft-pink text-soft-pink hover:bg-soft-pink hover:text-white font-poppins"
            >
              <CheckCircle className="h-4 w-4 mr-1" /> Konfirmasi Bayar
            </Button>
          )}
          {order.status === "Diproses" && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onUpdateStatus(order.id, "Dikemas")}
              className="flex-1 border-soft-pink text-soft-pink hover:bg-soft-pink hover:text-white font-poppins"
            >
              <Package className="h-4 w-4 mr-1" /> Kemas Pesanan
            </Button>
          )}
          {order.status === "Dikemas" && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onUpdateStatus(order.id, "Menunggu Penjemputan Kurir")}
              className="flex-1 border-soft-pink text-soft-pink hover:bg-soft-pink hover:text-white font-poppins"
            >
              <Truck className="h-4 w-4 mr-1" /> Siap Dikirim
            </Button>
          )}
          {order.status === "Menunggu Penjemputan Kurir" && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onUpdateStatus(order.id, "Sedang Dalam Perjalanan")}
              className="flex-1 border-soft-pink text-soft-pink hover:bg-soft-pink hover:text-white font-poppins"
            >
              <Truck className="h-4 w-4 mr-1" /> Dalam Pengiriman
            </Button>
          )}
          {(order.status === "Sedang Dalam Perjalanan" || order.status === "Telah Sampai") && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onUpdateStatus(order.id, "Selesai")}
              className="flex-1 border-soft-pink text-soft-pink hover:bg-soft-pink hover:text-white font-poppins"
            >
              <CheckCircle className="h-4 w-4 mr-1" /> Tandai Selesai
            </Button>
          )}
          <Button asChild variant="ghost" size="sm" className="flex-1 text-gray-600 dark:text-gray-400 hover:text-soft-pink dark:hover:text-gold-rose">
            <Link to={`/profile/orders/${order.id}`}>Detail</Link>
          </Button>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrintReceipt}
          className="w-full border-gold-rose text-gold-rose hover:bg-gold-rose hover:text-white font-poppins"
        >
          <Printer className="h-4 w-4 mr-1" /> Cetak Resi
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SellerOrderItem;