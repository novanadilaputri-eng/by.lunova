import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import HomePageHeader from "@/components/HomePageHeader";
import { products as mockProducts } from "@/data/products";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { showSuccess } from "@/utils/toast";

const SellerDashboardPage: React.FC = () => {
  // In a real app, this would filter products by seller ID
  const sellerProducts = mockProducts.filter(p => p.storeName === "By.Lunova Official"); // Example filter

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus produk ID: ${productId}?`)) {
      // Simulate deletion
      showSuccess(`Produk ID: ${productId} berhasil dihapus (simulasi).`);
      // In a real app, you'd update state or refetch data
    }
  };

  return (
    <>
      <HomePageHeader />
      <div className="container mx-auto p-4 md:p-8">
        <h1 className="text-4xl font-playfair font-bold text-center mb-10 text-gray-900">Dashboard Penjual</h1>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-playfair font-bold text-gray-900">Produk Saya</h2>
          <Button asChild className="bg-soft-pink hover:bg-rose-600 text-white font-poppins">
            <Link to="/seller/products/new">
              <PlusCircle className="h-4 w-4 mr-2" /> Tambah Produk Baru
            </Link>
          </Button>
        </div>

        {sellerProducts.length === 0 ? (
          <div className="text-center p-10 bg-white rounded-lg shadow-md">
            <Package className="h-20 w-20 text-gray-400 mx-auto mb-6" />
            <p className="text-xl text-gray-600 font-poppins mb-6">Anda belum memiliki produk di toko.</p>
            <Button asChild className="px-8 py-3 text-lg bg-soft-pink hover:bg-rose-600 text-white font-poppins">
              <Link to="/seller/products/new">Tambah Produk Pertama Anda</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sellerProducts.map((product) => (
              <Card key={product.id} className="w-full overflow-hidden rounded-lg shadow-lg border-2 border-beige">
                <img
                  src={product.mainImageUrl}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 font-poppins">{product.name}</h3>
                  <p className="text-sm text-gray-600 font-poppins">Stok: {product.stock}</p>
                  <p className="text-md font-bold text-gold-rose mt-1 font-playfair">
                    Rp{product.price.toLocaleString("id-ID")}
                  </p>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between space-x-2">
                  <Button asChild variant="outline" className="flex-1 border-soft-pink text-soft-pink hover:bg-soft-pink hover:text-white font-poppins">
                    <Link to={`/seller/products/edit/${product.id}`}>
                      <Edit className="h-4 w-4 mr-2" /> Edit
                    </Link>
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex-1 font-poppins"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" /> Hapus
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center mt-8">
          <Button asChild variant="outline" className="border-soft-pink text-soft-pink hover:bg-soft-pink hover:text-white font-poppins">
            <Link to="/profile">Kembali ke Akun Saya</Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default SellerDashboardPage;