import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Package, Truck, CheckCircle, XCircle, Clock, Wallet } from "lucide-react";
import HomePageHeader from "@/components/HomePageHeader";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface TrackingStepProps {
  icon: React.ElementType;
  label: string;
  date?: string;
  isActive: boolean;
  isCompleted: boolean;
}

const TrackingStep: React.FC<TrackingStepProps> = ({ icon: Icon, label, date, isActive, isCompleted }) => (
  <div className="flex items-start space-x-4">
    <div className={cn(
      "flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center",
      isCompleted ? "bg-green-500 text-white" : isActive ? "bg-soft-pink text-white" : "bg-gray-200 text-gray-500"
    )}>
      <Icon className="h-4 w-4" />
    </div>
    <div className="flex-grow">
      <p className={cn(
        "font-poppins font-medium",
        isCompleted ? "text-gray-900" : isActive ? "text-soft-pink" : "text-gray-600"
      )}>
        {label}
      </p>
      {date && <p className="text-sm text-gray-500">{date}</p>}
    </div>
  </div>
);

const OrderTrackingPage: React.FC = () => {
  // Placeholder data for a single order
  const orderId = "BYLNV-20231225-001";
  const orderStatus = "Dikirim"; // Can be: "Menunggu Pembayaran", "Diproses", "Dikemas", "Dikirim", "Telah Sampai", "Selesai", "Dibatalkan"
  const deliveryEstimate = "28 Des 2023";
  const productName = "Blouse Katun Motif Bunga";
  const productImageUrl = "https://images.unsplash.com/photo-1581044777550-4cfa607037dc?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const trackingSteps = [
    { label: "Pesanan Dibuat", icon: CheckCircle, status: "Pesanan Dibuat", date: "2023-12-25 10:00" },
    { label: "Menunggu Pembayaran", icon: Clock, status: "Menunggu Pembayaran", date: "2023-12-25 10:05" },
    { label: "Pembayaran Dikonfirmasi", icon: Wallet, status: "Pembayaran Dikonfirmasi", date: "2023-12-25 10:30" },
    { label: "Pesanan Diproses", icon: Package, status: "Diproses", date: "2023-12-25 11:00" },
    { label: "Pesanan Dikemas", icon: Package, status: "Dikemas", date: "2023-12-25 14:00" },
    { label: "Menunggu Penjemputan Kurir", icon: Truck, status: "Menunggu Penjemputan Kurir", date: "2023-12-26 09:00" },
    { label: "Sedang Dalam Perjalanan", icon: Truck, status: "Dikirim", date: "2023-12-26 11:00" },
    { label: "Telah Sampai di Tujuan", icon: CheckCircle, status: "Telah Sampai", date: "2023-12-27 16:00" },
    { label: "Pesanan Selesai", icon: CheckCircle, status: "Selesai", date: "2023-12-27 17:00" },
  ];

  const currentStepIndex = trackingSteps.findIndex(step => step.status === orderStatus);

  return (
    <>
      <HomePageHeader />
      <div className="container mx-auto p-4 md:p-8">
        <h1 className="text-4xl font-playfair font-bold text-center mb-10 text-gray-900">Lacak Pesanan #{orderId}</h1>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-playfair font-bold text-gray-900">Status Pesanan: <span className="text-soft-pink">{orderStatus}</span></h2>
            <span className="text-md font-poppins text-gray-600">Estimasi Tiba: {deliveryEstimate}</span>
          </div>
          <Separator className="my-4" />

          <div className="flex items-center mb-6">
            <img src={productImageUrl} alt={productName} className="w-20 h-20 object-cover rounded-md mr-4" />
            <div>
              <p className="font-poppins font-semibold text-lg text-gray-800">{productName}</p>
              <p className="text-sm text-gray-600">Jumlah: 1, Ukuran: M, Warna: Putih</p>
            </div>
          </div>

          <Separator className="my-4" />

          <h3 className="text-xl font-playfair font-bold text-gray-900 mb-4">Detail Pelacakan</h3>
          <div className="space-y-6">
            {trackingSteps.map((step, index) => (
              <React.Fragment key={index}>
                <TrackingStep
                  icon={step.icon}
                  label={step.label}
                  date={step.date}
                  isActive={index === currentStepIndex}
                  isCompleted={index < currentStepIndex}
                />
                {index < trackingSteps.length - 1 && (
                  <div className="ml-4 h-8 w-0.5 bg-gray-300"></div>
                )}
              </React.Fragment>
            ))}
          </div>

          {orderStatus === "Telah Sampai" && (
            <div className="mt-8 flex flex-col md:flex-row gap-4">
              <Button className="flex-1 py-3 text-lg bg-soft-pink hover:bg-rose-600 text-white font-poppins">
                Konfirmasi Pesanan Diterima
              </Button>
              <Button asChild variant="outline" className="flex-1 py-3 text-lg border-gold-rose text-gold-rose hover:bg-gold-rose hover:text-white font-poppins">
                <Link to="/profile/return-request">Ajukan Pengembalian</Link>
              </Button>
            </div>
          )}
          {orderStatus === "Selesai" && (
            <div className="mt-8 text-center">
              <Button asChild className="py-3 text-lg bg-soft-pink hover:bg-rose-600 text-white font-poppins">
                <Link to={`/products/1`}>Berikan Ulasan</Link> {/* Link to product detail for review */}
              </Button>
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

export default OrderTrackingPage;