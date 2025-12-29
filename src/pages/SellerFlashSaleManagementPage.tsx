import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import HomePageHeader from "@/components/HomePageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { showSuccess, showError } from "@/utils/toast";
import { useAuth } from "@/hooks/use-auth";
import { PlusCircle, Edit, Trash2 } from "lucide-react";

const SellerFlashSaleManagementPage: React.FC = () => {
  const { userRole } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (userRole !== "seller") {
      showError("Anda tidak memiliki akses ke halaman manajemen flash sale.");
      navigate("/profile");
    }
  }, [userRole, navigate]);

  // Data dummy untuk flash sale
  const [flashSales, setFlashSales] = useState([
    {
      id: "1",
      title: "Flash Sale Akhir Pekan",
      discount: 30,
      startDate: "2023-12-01",
      endDate: "2023-12-03",
      isActive: true,
    },
    {
      id: "2",
      title: "Flash Sale Tahun Baru",
      discount: 50,
      startDate: "2023-12-30",
      endDate: "2024-01-01",
      isActive: false,
    },
  ]);

  const handleDeleteFlashSale = (id: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus flash sale ini?")) {
      setFlashSales(flashSales.filter(fs => fs.id !== id));
      showSuccess("Flash sale berhasil dihapus!");
    }
  };

  const handleToggleActive = (id: string) => {
    setFlashSales(flashSales.map(fs => 
      fs.id === id ? { ...fs, isActive: !fs.isActive } : fs
    ));
    showSuccess("Status flash sale berhasil diubah!");
  };

  if (userRole !== "seller") {
    return null;
  }

  return (
    <>
      <HomePageHeader />
      <div className="container mx-auto p-4 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-playfair font-bold text-gray-900 dark:text-gray-100">Manajemen Flash Sale</h1>
          <Button 
            onClick={() => navigate("/seller/flash-sale/new")} 
            className="bg-soft-pink hover:bg-rose-600 text-white font-poppins"
          >
            <PlusCircle className="h-4 w-4 mr-2" /> Tambah Flash Sale
          </Button>
        </div>
        
        {flashSales.length === 0 ? (
          <div className="text-center p-10 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <div className="h-20 w-20 text-gray-400 mx-auto mb-6 flex items-center justify-center">
              <span className="text-6xl">⚡</span>
            </div>
            <p className="text-xl text-gray-600 font-poppins dark:text-gray-400 mb-6">Belum ada flash sale yang dibuat.</p>
            <Button 
              onClick={() => navigate("/seller/flash-sale/new")} 
              className="px-8 py-3 text-lg bg-soft-pink hover:bg-rose-600 text-white font-poppins"
            >
              Buat Flash Sale Pertama Anda
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {flashSales.map((flashSale) => (
              <Card key={flashSale.id} className="w-full overflow-hidden rounded-lg shadow-lg border-2 border-beige dark:border-gray-700 bg-white dark:bg-gray-800">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-800 font-poppins dark:text-gray-200">{flashSale.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${flashSale.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {flashSale.isActive ? 'Aktif' : 'Tidak Aktif'}
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <span className="text-3xl font-bold text-soft-pink mr-2">{flashSale.discount}%</span>
                      <span className="text-gray-600 font-poppins">Diskon</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-poppins">Mulai:</span>
                      <span className="font-poppins">{flashSale.startDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-poppins">Berakhir:</span>
                      <span className="font-poppins">{flashSale.endDate}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 mt-6">
                    <Button 
                      onClick={() => handleToggleActive(flashSale.id)}
                      variant="outline"
                      className="flex-1 border-soft-pink text-soft-pink hover:bg-soft-pink hover:text-white font-poppins"
                    >
                      {flashSale.isActive ? 'Nonaktifkan' : 'Aktifkan'}
                    </Button>
                    <Button 
                      onClick={() => navigate(`/seller/flash-sale/edit/${flashSale.id}`)}
                      variant="outline"
                      className="flex-1 border-gold-rose text-gold-rose hover:bg-gold-rose hover:text-white font-poppins"
                    >
                      <Edit className="h-4 w-4 mr-2" /> Edit
                    </Button>
                    <Button 
                      variant="destructive"
                      onClick={() => handleDeleteFlashSale(flashSale.id)}
                      className="flex-1 font-poppins"
                    >
                      <Trash2 className="h-4 w-4 mr-2" /> Hapus
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center mt-8">
          <Button 
            onClick={() => navigate("/seller/dashboard")} 
            variant="outline" 
            className="border-soft-pink text-soft-pink hover:bg-soft-pink hover:text-white font-poppins dark:border-gold-rose dark:text-gold-rose dark:hover:bg-gold-rose dark:hover:text-white"
          >
            Kembali ke Dashboard
          </Button>
        </div>
      </div>
    </>
  );
};

export default SellerFlashSaleManagementPage;