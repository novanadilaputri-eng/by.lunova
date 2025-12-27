"use client";

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import HomePageHeader from "@/components/HomePageHeader";
import { PlusCircle, Edit, Trash2, Image as ImageIcon } from "lucide-react";
import { showSuccess, showError } from "@/utils/toast";
import { CollageImage, mockCollageImages, addCollageImage, updateCollageImage, deleteCollageImage } from "@/data/collageImages";
import { useAuth } from "@/hooks/use-auth";

const SellerCollageManagementPage: React.FC = () => {
  const { userRole } = useAuth();
  const navigate = useNavigate();
  const [collageImages, setCollageImages] = useState<CollageImage[]>(mockCollageImages);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<CollageImage | null>(null);

  const [imageUrl, setImageUrl] = useState("");
  const [altText, setAltText] = useState("");

  // For demo, assume current seller is "seller1"
  const currentSellerId = "seller1";

  useEffect(() => {
    if (userRole !== "seller") {
      showError("Anda tidak memiliki akses ke halaman Manajemen Kolase.");
      navigate("/profile");
    }
  }, [userRole, navigate]);

  useEffect(() => {
    // Filter images for the current seller
    setCollageImages(mockCollageImages.filter(img => img.sellerId === currentSellerId));
  }, [mockCollageImages, currentSellerId]); // Re-run when mockCollageImages change

  useEffect(() => {
    if (editingImage) {
      setImageUrl(editingImage.imageUrl);
      setAltText(editingImage.altText);
    } else {
      setImageUrl("");
      setAltText("");
    }
  }, [editingImage, isFormOpen]);

  const handleOpenForm = (image: CollageImage | null = null) => {
    setEditingImage(image);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingImage(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl.trim() || !altText.trim()) {
      showError("Mohon lengkapi URL Gambar dan Teks Alternatif.");
      return;
    }

    const newOrUpdatedImage: Omit<CollageImage, 'id'> = {
      imageUrl: imageUrl.trim(),
      altText: altText.trim(),
      uploadDate: new Date().toISOString().split('T')[0],
      sellerId: currentSellerId,
    };

    if (editingImage) {
      const updated: CollageImage = { ...editingImage, ...newOrUpdatedImage };
      updateCollageImage(updated);
      showSuccess("Gambar kolase berhasil diperbarui!");
    } else {
      addCollageImage(newOrUpdatedImage);
      showSuccess("Gambar kolase baru berhasil ditambahkan!");
    }
    setCollageImages([...mockCollageImages.filter(img => img.sellerId === currentSellerId)]); // Refresh local state
    handleCloseForm();
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus gambar ini dari kolase?")) {
      deleteCollageImage(id);
      setCollageImages([...mockCollageImages.filter(img => img.sellerId === currentSellerId)]);
      showSuccess("Gambar kolase berhasil dihapus.");
    }
  };

  if (userRole !== "seller") {
    return null;
  }

  return (
    <>
      <HomePageHeader />
      <div className="container mx-auto p-4 md:p-8">
        <h1 className="text-4xl font-playfair font-bold text-center mb-10 text-gray-900 dark:text-gray-100">Manajemen Kolase Foto Produk</h1>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-3xl mx-auto">
          <div className="flex items-center justify-between border-b pb-4 mb-4 border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-playfair font-bold text-gray-900 dark:text-gray-100">Daftar Gambar Kolase Anda</h2>
            <Button onClick={() => handleOpenForm()} className="bg-soft-pink hover:bg-rose-600 text-white font-poppins">
              <PlusCircle className="h-4 w-4 mr-2" /> Tambah Gambar Baru
            </Button>
          </div>

          {collageImages.length === 0 ? (
            <div className="text-center py-8">
              <ImageIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-lg text-gray-600 font-poppins dark:text-gray-400">Anda belum memiliki gambar di kolase.</p>
              <Button onClick={() => handleOpenForm()} className="mt-4 bg-soft-pink hover:bg-rose-600 text-white font-poppins">
                <PlusCircle className="h-4 w-4 mr-2" /> Tambah Gambar Pertama Anda
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {collageImages.map((image) => (
                <Card key={image.id} className="overflow-hidden rounded-lg shadow-sm border-2 border-beige dark:border-gray-700 bg-white dark:bg-gray-800">
                  <img
                    src={image.imageUrl}
                    alt={image.altText}
                    className="w-full h-32 object-cover"
                  />
                  <CardContent className="p-3">
                    <p className="text-sm font-poppins font-medium text-gray-800 dark:text-gray-200 line-clamp-1">{image.altText}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{image.uploadDate}</p>
                  </CardContent>
                  <CardFooter className="p-3 pt-0 flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleOpenForm(image)} className="flex-1 border-gold-rose text-gold-rose hover:bg-gold-rose hover:text-white font-poppins dark:border-gold-rose dark:text-gold-rose dark:hover:bg-gold-rose dark:hover:text-white">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(image.id)} className="flex-1 font-poppins">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>

        <div className="text-center mt-8">
          <Button asChild variant="outline" className="border-soft-pink text-soft-pink hover:bg-soft-pink hover:text-white font-poppins dark:border-gold-rose dark:text-gold-rose dark:hover:bg-gold-rose dark:hover:text-white">
            <Link to="/seller/dashboard">Kembali ke Dashboard</Link>
          </Button>
        </div>
      </div>

      {/* Image Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[500px] bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <DialogHeader>
            <DialogTitle className="font-playfair">{editingImage ? "Edit Gambar Kolase" : "Tambah Gambar Kolase Baru"}</DialogTitle>
            <DialogDescription className="font-poppins text-gray-600 dark:text-gray-400">
              Tambahkan atau perbarui detail gambar untuk kolase Anda.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="imageUrl" className="text-right font-poppins text-gray-800 dark:text-gray-200">URL Gambar</Label>
              <Input id="imageUrl" type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://example.com/image.jpg" className="col-span-3 font-poppins border-soft-pink focus:ring-soft-pink dark:bg-gray-700 dark:text-gray-100 dark:border-gold-rose" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="altText" className="text-right font-poppins text-gray-800 dark:text-gray-200">Teks Alternatif</Label>
              <Input id="altText" value={altText} onChange={(e) => setAltText(e.target.value)} placeholder="Deskripsi singkat gambar" className="col-span-3 font-poppins border-soft-pink focus:ring-soft-pink dark:bg-gray-700 dark:text-gray-100 dark:border-gold-rose" required />
            </div>
            {imageUrl && (
              <div className="col-span-full flex justify-center mt-2">
                <img src={imageUrl} alt="Preview" className="h-32 w-32 object-cover rounded-md border border-soft-pink dark:border-gold-rose" />
              </div>
            )}
            <DialogFooter className="col-span-4 mt-4">
              <Button type="submit" className="bg-soft-pink hover:bg-rose-600 text-white font-poppins">
                {editingImage ? "Simpan Perubahan" : "Tambah Gambar"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SellerCollageManagementPage;