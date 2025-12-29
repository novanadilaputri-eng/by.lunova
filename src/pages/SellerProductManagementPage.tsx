import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import HomePageHeader from "@/components/HomePageHeader";
import { products as mockProducts, getSellerProducts } from "@/data/products";
import { deleteProduct } from "@/data/products";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { showSuccess, showError } from "@/utils/toast";
import { useAuth } from "@/hooks/use-auth";
import { PlusCircle, Edit, Trash2, Package } from "lucide-react";

const SellerProductManagementPage: React.FC = () => {
  const { userRole } = useAuth();
  const navigate = useNavigate();
  const [currentProducts, setCurrentProducts] = useState(mockProducts);
  const currentSellerId = "seller1";

  useEffect(() => {
    if (userRole !== "seller") {
      showError("Anda tidak memiliki akses ke halaman manajemen produk.");
      navigate("/profile");
    }
  }, [userRole, navigate]);

  useEffect(() => {
    setCurrentProducts([...mockProducts]);
  }, [mockProducts]);

  const sellerProducts = getSellerProducts(currentSellerId);

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus produk ID: ${productId}?`)) {
      try {
        deleteProduct(productId);
        setCurrentProducts([...mockProducts]);
        showSuccess(`Produk ID: ${productId} berhasil dihapus.`);
      } catch (error) {
        showError("Gagal menghapus produk. Silakan coba lagi.");
        console.error("Error deleting product:", error);
      }
    }
  };

  if (userRole !== "seller") {
    return null;
  }

  return (
    <>
      <HomePageHeader />
      <div className="container mx-auto p-4 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-playfair font-bold text-gray-900 dark:text-gray-100">Manajemen Produk</h1>
          <Button 
            onClick={() => navigate("/seller/products/new")} 
            className="bg-soft-pink hover:bg-rose-600 text-white font-poppins"
          >
            <PlusCircle className="h-4 w-4 mr-2" /> Tambah Produk Baru
          </Button>
        </div>
        
        {sellerProducts.length === 0 ? (
          <div className="text-center p-10 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <Package className="h-20 w-20 text-gray-400 mx-auto mb-6" />
            <p className="text-xl text-gray-600 font-poppins dark:text-gray-400 mb-6">Anda belum memiliki produk di toko.</p>
            <Button 
              onClick={() => navigate("/seller/products/new")} 
              className="px-8 py-3 text-lg bg-soft-pink hover:bg-rose-600 text-white font-poppins"
            >
              Tambah Produk Pertama Anda
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sellerProducts.map((product) => (
              <Card key={product.id} className="w-full overflow-hidden rounded-lg shadow-lg border-2 border-beige dark:border-gray-700 bg-white dark:bg-gray-800">
                <img src={product.mainImageUrl} alt={product.name} className="w-full h-48 object-cover" />
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 font-poppins dark:text-gray-200">{product.name}</h3>
                  <p className="text-sm text-gray-600 font-poppins dark:text-gray-400">Stok: {product.stock}</p>
                  <p className="text-md font-bold text-gold-rose mt-1 font-playfair">
                    Rp{product.price.toLocaleString("id-ID")}
                  </p>
                  {product.isFeatured && (
                    <span className="text-xs font-semibold text-soft-pink dark:text-gold-rose mt-1 block">Produk Unggulan</span>
                  )}
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between space-x-2">
                  <Button 
                    onClick={() => navigate(`/seller/products/edit/${product.id}`)} 
                    variant="outline" 
                    className="flex-1 border-soft-pink text-soft-pink hover:bg-soft-pink hover:text-white font-poppins dark:border-gold-rose dark:text-gold-rose dark:hover:bg-gold-rose dark:hover:text-white"
                  >
                    <Edit className="h-4 w-4 mr-2" /> Edit
                  </Button>
                  <Button 
                    variant="destructive" 
                    className="flex-1 font-poppins"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteProduct(product.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4 mr-2" /> Hapus
                  </Button>
                </CardFooter>
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

export default SellerProductManagementPage;