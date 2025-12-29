"use client";

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Edit, Trash2, Image as ImageIcon, Heart, Sparkles, ZoomIn, ZoomOut, RotateCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
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
  const [selectedPhoto, setSelectedPhoto] = useState<CollagePhoto | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isLiked, setIsLiked] = useState<{[key: string]: boolean}>({});
  const [likeCount, setLikeCount] = useState<{[key: string]: number}>({});
  const [zoomLevel, setZoomLevel] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // For demo, assume current seller is "seller1"
  const currentSellerId = "seller1";

  useEffect(() => {
    // Load initial photos from the persisted mock data
    setPhotos([...mockCollagePhotos]);
    
    // Initialize like counts from localStorage
    const savedLikes = localStorage.getItem('collageLikes');
    if (savedLikes) {
      const parsedLikes = JSON.parse(savedLikes);
      setLikeCount(parsedLikes);
    }
  }, []); // Run only once on mount

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
      const updated: CollagePhoto = {
        ...editingPhoto,
        ...newOrUpdatedPhoto,
      };
      updateCollagePhoto(updated);
      showSuccess("Foto kolase berhasil diperbarui!");
    } else {
      addCollagePhoto(newOrUpdatedPhoto);
      showSuccess("Foto kolase baru berhasil ditambahkan!");
    }

    setPhotos([...mockCollagePhotos]); // Update local state from persisted mock data
    handleCloseForm();
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus foto ini dari kolase?")) {
      deleteCollagePhoto(id);
      setPhotos([...mockCollagePhotos]); // Update local state from persisted mock data
      showSuccess("Foto kolase berhasil dihapus.");
    }
  };

  const handleViewPhoto = (photo: CollagePhoto) => {
    setSelectedPhoto(photo);
    setIsViewOpen(true);
    setZoomLevel(1);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
  };

  const handleCloseView = () => {
    setIsViewOpen(false);
    setSelectedPhoto(null);
    setZoomLevel(1);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
  };

  const handleLike = (photoId: string) => {
    setIsLiked(prev => ({
      ...prev,
      [photoId]: !prev[photoId]
    }));
    
    const newCount = isLiked[photoId] ? (likeCount[photoId] || 0) - 1 : (likeCount[photoId] || 0) + 1;
    setLikeCount(prev => ({
      ...prev,
      [photoId]: newCount
    }));
    
    // Save to localStorage
    localStorage.setItem('collageLikes', JSON.stringify({
      ...likeCount,
      [photoId]: newCount
    }));
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.2, 1));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
  };

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setZoomLevel(prev => Math.min(Math.max(prev + delta, 1), 3));
  };

  return (
    <div className="p-4 bg-gradient-to-br from-rose-50 to-gold-50 rounded-xl shadow-lg border border-rose-100">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Sparkles className="h-6 w-6 text-soft-pink mr-2" />
          <h3 className="text-2xl font-bold font-playfair text-gray-900 dark:text-gray-100">Inspirasi Gaya By.Lunova</h3>
        </div>
        {userRole === "seller" && (
          <Button 
            onClick={() => handleOpenForm()} 
            className="bg-soft-pink hover:bg-rose-600 text-white font-poppins transition-all duration-300 hover:scale-105 shadow-md"
          >
            <PlusCircle className="h-4 w-4 mr-2" /> Tambah Foto
          </Button>
        )}
      </div>
      
      {photos.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <ImageIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-lg text-gray-600 font-poppins dark:text-gray-400">Belum ada foto di kolase.</p>
          {userRole === "seller" && (
            <Button 
              onClick={() => handleOpenForm()} 
              className="mt-4 bg-soft-pink hover:bg-rose-600 text-white font-poppins transition-all duration-300 hover:scale-105"
            >
              <PlusCircle className="h-4 w-4 mr-2" /> Tambah Foto Pertama Anda
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <Card 
              key={photo.id} 
              className="overflow-hidden rounded-xl shadow-md border-2 border-rose-100 dark:border-gray-700 group relative transform transition-all duration-300 hover:scale-105 hover:shadow-xl bg-white"
            >
              <div 
                className="relative cursor-pointer h-48 overflow-hidden"
                onClick={() => handleViewPhoto(photo)}
              >
                <img 
                  src={photo.imageUrl} 
                  alt={photo.altText} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                  <p className="text-white text-sm font-poppins truncate">{photo.altText}</p>
                </div>
                <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full p-1.5 shadow-md">
                  <Heart 
                    className={`h-4 w-4 cursor-pointer ${isLiked[photo.id] ? 'text-red-500 fill-red-500' : 'text-gray-600'}`} 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(photo.id);
                    }} 
                  />
                </div>
                <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                  {likeCount[photo.id] || 0} likes
                </div>
              </div>
              <CardContent className="p-2">
                <p className="text-xs font-poppins text-gray-700 dark:text-gray-300 truncate text-center">{photo.altText}</p>
                {userRole === "seller" && photo.sellerId === currentSellerId && (
                  <div className="flex justify-center space-x-1 mt-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleOpenForm(photo)}
                      className="h-7 w-7 text-gold-rose hover:bg-gold-rose/20"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(photo.id);
                      }}
                      className="h-7 w-7 text-red-500 hover:bg-red-500/20"
                    >
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
          <div className="grid gap-4 py-4">
            <h2 className="text-xl font-playfair font-bold text-center">
              {editingPhoto ? "Edit Foto Kolase" : "Tambah Foto Baru ke Kolase"}
            </h2>
            <p className="text-sm text-gray-600 font-poppins text-center dark:text-gray-400">
              Tambahkan atau perbarui foto untuk kolase inspirasi gaya Anda.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="image-file" className="text-base font-poppins font-medium text-gray-800 dark:text-gray-200">
                  Unggah Gambar
                </Label>
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
                <Label htmlFor="image-url" className="text-base font-poppins font-medium text-gray-800 dark:text-gray-200">
                  URL Gambar
                </Label>
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
                <div className="flex justify-center">
                  <img 
                    src={imagePreviewUrl} 
                    alt="Preview" 
                    className="h-32 w-32 object-cover rounded-md border-2 border-soft-pink shadow-md"
                  />
                </div>
              )}
              
              <div>
                <Label htmlFor="alt-text" className="text-base font-poppins font-medium text-gray-800 dark:text-gray-200">
                  Teks Alternatif
                </Label>
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
                <Label htmlFor="product-id" className="text-base font-poppins font-medium text-gray-800 dark:text-gray-200">
                  ID Produk Terkait (Opsional)
                </Label>
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
              
              <div className="flex justify-end mt-4">
                <Button 
                  type="submit" 
                  className="bg-soft-pink hover:bg-rose-600 text-white font-poppins transition-all duration-300 hover:scale-105"
                >
                  {editingPhoto ? "Simpan Perubahan" : "Tambah Foto"}
                </Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>

      {/* Photo View Dialog with Zoom */}
      <Dialog open={isViewOpen} onOpenChange={handleCloseView}>
        <DialogContent className="sm:max-w-[95vw] sm:max-h-[95vh] bg-black/90 backdrop-blur-sm text-white p-0 overflow-hidden border-0 rounded-xl max-w-none h-[90vh]">
          <div className="flex flex-col h-full">
            {selectedPhoto && (
              <>
                <div className="flex justify-between items-center p-4 bg-black/50">
                  <h3 className="text-xl font-playfair font-bold">{selectedPhoto.altText}</h3>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" onClick={handleZoomOut} className="text-white hover:bg-white/20">
                      <ZoomOut className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleResetZoom} className="text-white hover:bg-white/20">
                      <RotateCw className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleZoomIn} className="text-white hover:bg-white/20">
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleCloseView} className="text-white hover:bg-white/20">
                      Tutup
                    </Button>
                  </div>
                </div>
                
                <div 
                  className="flex-1 flex items-center justify-center overflow-hidden relative cursor-move"
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onWheel={handleWheel}
                >
                  <img 
                    src={selectedPhoto.imageUrl} 
                    alt={selectedPhoto.altText} 
                    className="max-w-none transition-transform duration-200"
                    style={{ 
                      transform: `scale(${zoomLevel}) rotate(${rotation}deg) translate(${position.x}px, ${position.y}px)`,
                      cursor: isDragging ? 'grabbing' : 'grab'
                    }}
                  />
                </div>
                
                <div className="p-4 bg-black/50 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
                    <div className="ml-3">
                      <p className="font-poppins font-medium">By.Lunova Official</p>
                      <p className="text-sm text-gray-300 font-poppins">Penjual Terpercaya</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Heart 
                        className={`h-5 w-5 cursor-pointer ${isLiked[selectedPhoto.id] ? 'text-red-500 fill-red-500' : 'text-white'}`} 
                        onClick={() => handleLike(selectedPhoto.id)} 
                      />
                      <span className="ml-2 font-poppins">{likeCount[selectedPhoto.id] || 0} likes</span>
                    </div>
                    {selectedPhoto.productId ? (
                      <Button asChild className="bg-soft-pink hover:bg-rose-600 text-white font-poppins">
                        <Link to={`/products/${selectedPhoto.productId}`}>
                          Lihat Produk
                        </Link>
                      </Button>
                    ) : null}
                  </div>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductCollage;