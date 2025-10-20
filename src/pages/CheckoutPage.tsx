import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";
import { showSuccess, showError } from "@/utils/toast";
import HomePageHeader from "@/components/HomePageHeader";

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const [deliveryAddress, setDeliveryAddress] = useState("Alamat Utama Saya");
  const [courierOption, setCourierOption] = useState("ByLuno Express");
  const [paymentMethod, setPaymentMethod] = useState("Transfer Bank");
  const [voucherCode, setVoucherCode] = useState("");
  const [lunoPointsUsed, setLunoPointsUsed] = useState(0);

  const subtotal = getTotalPrice();
  const shippingCost = courierOption === "ByLuno Express" ? 0 : 15000; // Example shipping
  const discount = 0; // Placeholder for voucher/points discount
  const totalAmount = subtotal + shippingCost - discount;

  const handlePlaceOrder = () => {
    if (!deliveryAddress || !courierOption || !paymentMethod) {
      showError("Mohon lengkapi semua detail pengiriman dan pembayaran.");
      return;
    }
    // Simulate order placement
    showSuccess("Pesanan Anda berhasil dibuat!");
    clearCart(); // Clear cart after successful order
    navigate("/order-confirmation");
  };

  return (
    <>
      <HomePageHeader />
      <div className="container mx-auto p-4 md:p-8">
        <h1 className="text-4xl font-playfair font-bold text-center mb-10 text-gray-900">Checkout Pesanan</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md space-y-8">
            {/* Alamat Pengiriman */}
            <div>
              <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-4">Alamat Pengiriman</h2>
              <RadioGroup value={deliveryAddress} onValueChange={setDeliveryAddress} className="space-y-2">
                <div className="flex items-center">
                  <RadioGroupItem value="Alamat Utama Saya" id="address-main" className="border-soft-pink data-[state=checked]:bg-soft-pink" />
                  <Label htmlFor="address-main" className="ml-2 font-poppins">Alamat Utama Saya (Jl. Contoh No. 123, Jakarta)</Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem value="Tambah Alamat Baru" id="address-new" className="border-soft-pink data-[state=checked]:bg-soft-pink" />
                  <Label htmlFor="address-new" className="ml-2 font-poppins">Tambah Alamat Baru</Label>
                </div>
              </RadioGroup>
              {deliveryAddress === "Tambah Alamat Baru" && (
                <div className="mt-4 space-y-3">
                  <Input placeholder="Nama Penerima" className="border-soft-pink focus:ring-soft-pink font-poppins" />
                  <Input placeholder="Nomor Telepon" className="border-soft-pink focus:ring-soft-pink font-poppins" />
                  <Textarea placeholder="Alamat Lengkap (Jalan, Nomor, RT/RW, Kelurahan, Kecamatan, Kota, Provinsi, Kode Pos)" rows={3} className="border-soft-pink focus:ring-soft-pink font-poppins" />
                </div>
              )}
            </div>

            <Separator />

            {/* Opsi Kurir */}
            <div>
              <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-4">Opsi Kurir</h2>
              <Select value={courierOption} onValueChange={setCourierOption}>
                <SelectTrigger className="w-full border-soft-pink focus:ring-soft-pink font-poppins">
                  <SelectValue placeholder="Pilih Opsi Kurir" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ByLuno Express">ByLuno Express (Gratis Ongkir)</SelectItem>
                  <SelectItem value="Reguler">Reguler (Rp 15.000)</SelectItem>
                  <SelectItem value="Same Day">Same Day (Rp 25.000)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            {/* Voucher & LunoPoints */}
            <div>
              <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-4">Voucher & LunoPoints</h2>
              <div className="flex space-x-2 mb-3">
                <Input
                  placeholder="Masukkan kode voucher"
                  value={voucherCode}
                  onChange={(e) => setVoucherCode(e.target.value)}
                  className="flex-1 border-soft-pink focus:ring-soft-pink font-poppins"
                />
                <Button className="bg-gold-rose hover:bg-gold-rose/80 text-white font-poppins">Terapkan</Button>
              </div>
              <div className="flex items-center">
                <Input
                  type="number"
                  placeholder="Gunakan LunoPoints"
                  value={lunoPointsUsed}
                  onChange={(e) => setLunoPointsUsed(Number(e.target.value))}
                  className="flex-1 border-soft-pink focus:ring-soft-pink font-poppins"
                />
                <span className="ml-2 text-sm text-gray-600 font-poppins">Poin Anda: 1200</span>
              </div>
            </div>

            <Separator />

            {/* Metode Pembayaran */}
            <div>
              <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-4">Metode Pembayaran</h2>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                <Label className="font-poppins font-semibold text-gray-700">Transfer Bank</Label>
                <div className="grid grid-cols-2 gap-2 ml-4">
                  <div className="flex items-center">
                    <RadioGroupItem value="BCA" id="payment-bca" className="border-soft-pink data-[state=checked]:bg-soft-pink" />
                    <Label htmlFor="payment-bca" className="ml-2 font-poppins">BCA</Label>
                  </div>
                  <div className="flex items-center">
                    <RadioGroupItem value="BRI" id="payment-bri" className="border-soft-pink data-[state=checked]:bg-soft-pink" />
                    <Label htmlFor="payment-bri" className="ml-2 font-poppins">BRI</Label>
                  </div>
                  <div className="flex items-center">
                    <RadioGroupItem value="Mandiri" id="payment-mandiri" className="border-soft-pink data-[state=checked]:bg-soft-pink" />
                    <Label htmlFor="payment-mandiri" className="ml-2 font-poppins">Mandiri</Label>
                  </div>
                  <div className="flex items-center">
                    <RadioGroupItem value="BNI" id="payment-bni" className="border-soft-pink data-[state=checked]:bg-soft-pink" />
                    <Label htmlFor="payment-bni" className="ml-2 font-poppins">BNI</Label>
                  </div>
                </div>

                <Label className="font-poppins font-semibold text-gray-700 mt-4">E-Wallet</Label>
                <div className="grid grid-cols-2 gap-2 ml-4">
                  <div className="flex items-center">
                    <RadioGroupItem value="Dana" id="payment-dana" className="border-soft-pink data-[state=checked]:bg-soft-pink" />
                    <Label htmlFor="payment-dana" className="ml-2 font-poppins">Dana</Label>
                  </div>
                  <div className="flex items-center">
                    <RadioGroupItem value="Gopay" id="payment-gopay" className="border-soft-pink data-[state=checked]:bg-soft-pink" />
                    <Label htmlFor="payment-gopay" className="ml-2 font-poppins">Gopay</Label>
                  </div>
                  <div className="flex items-center">
                    <RadioGroupItem value="ShopeePay" id="payment-shopeepay" className="border-soft-pink data-[state=checked]:bg-soft-pink" />
                    <Label htmlFor="payment-shopeepay" className="ml-2 font-poppins">ShopeePay</Label>
                  </div>
                </div>

                <div className="flex items-center mt-4">
                  <RadioGroupItem value="COD" id="payment-cod" className="border-soft-pink data-[state=checked]:bg-soft-pink" />
                  <Label htmlFor="payment-cod" className="ml-2 font-poppins">Cash On Delivery (COD)</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md h-fit">
            <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-4">Ringkasan Pesanan</h2>
            <div className="space-y-2 mb-4 text-gray-700 font-poppins">
              <div className="flex justify-between">
                <span>Subtotal ({cartItems.length} produk):</span>
                <span>Rp{subtotal.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between">
                <span>Biaya Pengiriman:</span>
                <span>Rp{shippingCost.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between">
                <span>Diskon Voucher/Poin:</span>
                <span className="text-red-500">- Rp{discount.toLocaleString("id-ID")}</span>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="flex justify-between items-center text-xl font-playfair font-bold mb-6">
              <span>Total Pembayaran:</span>
              <span className="text-gold-rose">Rp{totalAmount.toLocaleString("id-ID")}</span>
            </div>
            <Button
              onClick={handlePlaceOrder}
              className="w-full py-3 text-lg bg-soft-pink hover:bg-rose-600 text-white font-poppins"
              disabled={cartItems.length === 0}
            >
              Buat Pesanan Sekarang
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;