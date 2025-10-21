import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import HomePageHeader from "@/components/HomePageHeader";
import { MapPin, PlusCircle } from "lucide-react";

const AddressPage: React.FC = () => {
  return (
    <>
      <HomePageHeader />
      <div className="container mx-auto p-4 md:p-8">
        <h1 className="text-4xl font-playfair font-bold text-center mb-10 text-gray-900">Alamat Saya</h1>

        <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
          <div className="flex items-center justify-between border-b pb-4 mb-4">
            <h2 className="text-2xl font-playfair font-bold text-gray-900">Daftar Alamat</h2>
            <Button variant="outline" className="border-soft-pink text-soft-pink hover:bg-soft-pink hover:text-white font-poppins">
              <PlusCircle className="h-4 w-4 mr-2" /> Tambah Alamat Baru
            </Button>
          </div>

          {/* Placeholder for existing addresses */}
          <div className="space-y-4">
            <div className="border p-4 rounded-lg bg-beige">
              <p className="font-poppins font-semibold text-gray-800">Alamat Utama</p>
              <p className="text-gray-700">Nama Penerima: Jane Doe</p>
              <p className="text-gray-700">No. Telepon: 0812-3456-7890</p>
              <p className="text-gray-700">Jl. Contoh No. 123, RT 01/RW 02, Kel. Menteng, Kec. Menteng, Jakarta Pusat, 10310</p>
              <div className="flex space-x-2 mt-3">
                <Button variant="outline" size="sm" className="border-gold-rose text-gold-rose hover:bg-gold-rose hover:text-white font-poppins">Edit</Button>
                <Button variant="destructive" size="sm" className="font-poppins">Hapus</Button>
              </div>
            </div>
            <div className="border p-4 rounded-lg">
              <p className="font-poppins font-semibold text-gray-800">Alamat Kantor</p>
              <p className="text-gray-700">Nama Penerima: Jane Doe</p>
              <p className="text-gray-700">No. Telepon: 0812-9876-5432</p>
              <p className="text-gray-700">Gedung Perkantoran, Lt. 5, Jl. Sudirman No. 45, Jakarta Selatan, 12190</p>
              <div className="flex space-x-2 mt-3">
                <Button variant="outline" size="sm" className="border-gold-rose text-gold-rose hover:bg-gold-rose hover:text-white font-poppins">Edit</Button>
                <Button variant="destructive" size="sm" className="font-poppins">Hapus</Button>
              </div>
            </div>
          </div>

          {/* If no addresses */}
          {/* <div className="text-center py-8">
            <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-lg text-gray-600 font-poppins">Anda belum menambahkan alamat pengiriman.</p>
            <Button className="mt-4 bg-soft-pink hover:bg-rose-600 text-white font-poppins">
              <PlusCircle className="h-4 w-4 mr-2" /> Tambah Alamat Baru
            </Button>
          </div> */}
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

export default AddressPage;