"use client";

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Edit, Trash2, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { showSuccess, showError } from '@/utils/toast';
import { useAuth } from '@/hooks/use-auth';
import { CollagePhoto, mockCollagePhotos, addCollagePhoto, updateCollagePhoto, deleteCollagePhoto } from '@/data/collagePhotos';

const ProductCollage: React.FC = () => {
  const { userRole } = useAuth();
  const [photos, setPhotos] = useState<CollagePhoto[]>(mockCollagePhotos);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState<CollagePhoto | null>(null);

  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [altText, setAltText] = useState("");
  const [productId, setProductId] = useState("");

  // For demo, assume current seller is "seller1"
  const currentSellerId = "seller1";

  useEffect(() => {
    setPhotos([...mockCollagePhotos]); // Ensure state is updated if mock data changes
  }, [mockCollagePhotos]);

  useEffect(() => {
    if (editingPhoto) {
      setImageUrl(editingPhoto.imageUrl);
      setImagePreviewUrl(editingPhoto.imageUrl);
      setAltText(editingPhoto.altText);
      setProductId(editingPhoto.productId || "");
      setImageFile(null);
    } else {
      setImageUrl("");
      setImagePreviewUrl(null);
      setAltText("");
      setProductId("");
      setImageFile(null);
    }
  }, [editingPhoto, isFormOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string);
        setImageUrl(reader.result as string); // Update imageUrl state for submission
      };
      reader.readAsDataURL(file);
    } else {
      setImageFile(null);
      setImagePreviewUrl(editingPhoto?.imageUrl || null);
      setImageUrl(editingPhoto?.imageUrl || "");
    }
  };

  const handleOpenForm = (photo: CollagePhoto | null = null) => {
    setEditingPhoto(photo);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingPhoto(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl.trim() || !altText.trim()) {
      showError("Mohon lengkapi URL Gambar/Unggah File dan Teks Alternatif.");
      return;
    }

    const newOrUpdatedPhoto: Omit<CollagePhoto, 'id'> = {
      imageUrl: imageUrl.trim(),
      altText: altText.trim(),
      productId: productId.trim() || undefined,
      sellerId: currentSellerId,
    };

    if (editingPhoto) {
      const updated: CollagePhoto = { ...editingPhoto, ...newOrUpdatedPhoto };
      updateCollagePhoto(updated);
      showSuccess("Foto kolase berhasil diperbarui!");
    } else {
      addCollagePhoto(newOrUpdatedPhoto);
      showSuccess("Foto kolase baru berhasil ditambahkan!");
    }
    setPhotos([...mockCollagePhotos]);
    handleCloseForm();
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus foto ini dari kolase?")) {
      deleteCollagePhoto(id);
      setPhotos([...mockCollagePhotos]);
      showSuccess("Foto kolase berhasil dihapus.");
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold font-playfair text-gray-900 dark:text-gray-100">Inspirasi Gaya By.Lunova</h3>
        {userRole === "seller" && (
          <Button onClick={() => handleOpenForm()} className="bg-soft-pink hover:bg-rose-600 text-white font-poppins">
            <PlusCircle className="h-4 w-4 mr-2" /> Tambah Foto
          </Button>
        )}
      </div>

      {photos.length === 0 ? (
        <div className="text-center py-8">
          <ImageIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-lg text-gray-600 font-poppins dark:text-gray-400">Belum ada foto di kolase.</p>
          {userRole === "seller" && (
            <Button onClick={() => handleOpenForm()} className="mt-4 bg-soft-pink hover:bg-rose-600 text-white font-poppins">
              <PlusCircle className="h-4 w-4 mr-2" /> Tambah Foto Pertama Anda
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <Card key={photo.id} className="overflow-hidden rounded-lg shadow-sm border-2 border-beige dark:border-gray-700">
              <Link to={photo.productId ? `/products/${photo.productId}` : "#"} className="block">
                <img
                  src={photo.imageUrl}
                  alt={photo.altText}
                  className="w-full h-40 object-cover"
                />
              </Link>
              <CardContent className="p-2">
                <p className="text-sm font-poppins text-gray-700 dark:text-gray-300 truncate">{photo.altText}</p>
                {userRole === "seller" && photo.sellerId === currentSellerId && (
                  <div className="flex justify-end space-x-1 mt-2">
                    <Button variant="ghost" size="icon" onClick={() => handleOpenForm(photo)} className="h-7 w-7 text-gold-rose hover:bg-gold-rose/20">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(photo.id)} className="h-7 w-7 text-red-500 hover:bg-red-500/20">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Photo Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[500px] bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <DialogHeader>
            <DialogTitle className="font-playfair">{editingPhoto ? "Edit Foto Kolase" : "Tambah Foto Baru ke Kolase"}</DialogTitle>
            <DialogDescription className="font-poppins text-gray-600 dark:text-gray-400">
              Tambahkan atau perbarui foto untuk kolase inspirasi gaya Anda.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div>
              <Label htmlFor="image-file" className="text-base font-poppins font-medium text-gray-800 dark:text-gray-200">Unggah Gambar</Label>
              <Input
                id="image-file"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mt-2 border-soft-pink focus:ring-soft-pink font-poppins dark:bg-gray-700 dark:text-gray-100 dark:border-gold-rose"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Atau masukkan URL gambar di bawah.
              </p>
            </div>
            <div>
              <Label htmlFor="image-url" className="text-base font-poppins font-medium text-gray-800 dark:text-gray-200">URL Gambar</Label>
              <Input
                id="image-url"
                type="url"
                value={imageUrl}
                onChange={(e) => {
                  setImageUrl(e.target.value);
                  setImagePreviewUrl(e.target.value);
                  setImageFile(null); // Clear file input if URL is used
                }}
                placeholder="https://example.com/image.jpg"
                className="mt-2 border-soft-pink focus:ring-soft-pink font-poppins dark:bg-gray-700 dark:text-gray-100 dark:border-gold-rose"
              />
            </div>
            {imagePreviewUrl && (
              <div className="col-span-full flex justify-center mt-2">
                <img src={imagePreviewUrl} alt="Preview" className="h-32 w-32 object-cover rounded-md border border-soft-pink dark:border-gold-rose" />
              </div>
            )}
            <div>
              <Label htmlFor="alt-text" className="text-base font-poppins font-medium text-gray-800 dark:text-gray-200">Teks Alternatif</Label>
              <Input
                id="alt-text"
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                placeholder="Deskripsi singkat gambar"
                className="mt-2 border-soft-pink focus:ring-soft-pink font-poppins dark:bg-gray-700 dark:text-gray-100 dark:border-gold-rose"
                required
              />
            </div>
            <div>
              <Label htmlFor="product-id" className="text-base font-poppins font-medium text-gray-800 dark:text-gray-200">ID Produk Terkait (Opsional)</Label>
              <Input
                id="product-id"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                placeholder="e.g., 1, 2, prod-12345"
                className="mt-2 border-soft-pink focus:ring-soft-pink font-poppins dark:bg-gray-700 dark:text-gray-100 dark:border-gold-rose"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Jika diisi, foto akan mengarah ke halaman detail produk ini.
              </p>
            </div>
            <DialogFooter className="col-span-4 mt-4">
              <Button type="submit" className="bg-soft-pink hover:bg-rose-600 text-white font-poppins">
                {editingPhoto ? "Simpan Perubahan" : "Tambah Foto"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductCollage;