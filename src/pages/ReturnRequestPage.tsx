import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import HomePageHeader from "@/components/HomePageHeader";
import { showSuccess, showError } from "@/utils/toast";

const ReturnRequestPage: React.FC = () => {
  const navigate = useNavigate();
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAttachment(e.target.files[0]);
    }
  };

  const handleSubmitReturn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason || !details) {
      showError("Mohon lengkapi alasan dan detail pengembalian.");
      return;
    }
    // Simulate return request submission
    showSuccess("Permintaan pengembalian Anda berhasil diajukan!");
    navigate("/profile"); // Navigate back to profile or a confirmation page
  };

  return (
    <>
      <HomePageHeader />
      <div className="container mx-auto p-4 md:p-8">
        <h1 className="text-4xl font-playfair font-bold text-center mb-10 text-gray-900">Ajukan Pengembalian Barang</h1>

        <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
          <p className="text-gray-700 font-poppins mb-6">
            Mohon isi formulir di bawah ini untuk mengajukan pengembalian barang. Tim kami akan segera memproses permintaan Anda.
          </p>

          <form onSubmit={handleSubmitReturn} className="space-y-6">
            <div>
              <Label htmlFor="order-id" className="text-base font-poppins font-medium">ID Pesanan</Label>
              <Input id="order-id" type="text" defaultValue="BYLNV-20231225-001" readOnly className="mt-2 bg-gray-100 border-soft-pink focus:ring-soft-pink font-poppins" />
            </div>

            <div>
              <Label htmlFor="product-name" className="text-base font-poppins font-medium">Produk</Label>
              <Input id="product-name" type="text" defaultValue="Blouse Katun Motif Bunga (Ukuran: M, Warna: Putih)" readOnly className="mt-2 bg-gray-100 border-soft-pink focus:ring-soft-pink font-poppins" />
            </div>

            <div>
              <Label htmlFor="return-reason" className="text-base font-poppins font-medium">Alasan Pengembalian</Label>
              <Select value={reason} onValueChange={setReason}>
                <SelectTrigger id="return-reason" className="w-full mt-2 border-soft-pink focus:ring-soft-pink font-poppins">
                  <SelectValue placeholder="Pilih Alasan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ukuran-tidak-sesuai">Ukuran tidak sesuai</SelectItem>
                  <SelectItem value="warna-tidak-sesuai">Warna tidak sesuai</SelectItem>
                  <SelectItem value="barang-rusak">Barang rusak/cacat</SelectItem>
                  <SelectItem value="barang-salah">Barang yang diterima salah</SelectItem>
                  <SelectItem value="berubah-pikiran">Berubah pikiran</SelectItem>
                  <SelectItem value="lainnya">Lainnya</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="return-details" className="text-base font-poppins font-medium">Detail Tambahan</Label>
              <Textarea
                id="return-details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Jelaskan lebih lanjut mengenai alasan pengembalian Anda..."
                rows={5}
                className="mt-2 border-soft-pink focus:ring-soft-pink font-poppins"
              />
            </div>

            <div>
              <Label htmlFor="attachment" className="text-base font-poppins font-medium">Lampirkan Foto/Video (Opsional)</Label>
              <Input
                id="attachment"
                type="file"
                onChange={handleFileChange}
                className="mt-2 border-soft-pink focus:ring-soft-pink font-poppins"
              />
              {attachment && <p className="text-sm text-gray-500 mt-2">File terpilih: {attachment.name}</p>}
            </div>

            <Button type="submit" className="w-full py-3 text-lg bg-soft-pink hover:bg-rose-600 text-white font-poppins">
              Kirim Permintaan Pengembalian
            </Button>
          </form>
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

export default ReturnRequestPage;