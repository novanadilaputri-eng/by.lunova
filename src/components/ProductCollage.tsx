"use client";

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Edit, Trash2, Image as ImageIcon, Heart, Sparkles, ZoomIn, ZoomOut, RotateCw, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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
  }, []);

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
        setImageUrl(reader.result as string);
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
    <div className="p-6 bg-gradient-to-br from-rose-50 to-gold-50 rounded-2xl shadow-xl border border-rose-100">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Sparkles className="h-8 w-8 text-soft-pink mr-3" />
          <h3 className="text-3xl font-bold font-playfair text-gray-900 dark:text-gray-100">Inspirasi Gaya By.Lunova</h3>
        </div>
        {userRole === "seller" && (
          <Button 
            onClick={() => handleOpenForm()} 
            className="bg-soft-pink hover:bg-rose-600 text-white font-poppins transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <PlusCircle className="h-5 w-5 mr-2" /> Tambah Foto
          </Button>
        )}
      </div>
      
      {photos.length === 0 ? (
        <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-xl shadow-inner">
          <ImageIcon className="h-20 w-20 text-gray-400 mx-auto mb-6" />
          <p className="text-xl text-gray-600 font-poppins dark:text-gray-400 mb-6">Belum ada foto di kolase inspirasi.</p>
          {userRole === "seller" && (
            <Button 
              onClick={() => handleOpenForm()} 
              className="mt-4 bg-soft-pink hover:bg-rose-600 text-white font-poppins transition-all duration-300 hover:scale-105 shadow-md px-6 py-3"
            >
              <PlusCircle className="h-5 w-5 mr-2" /> Tambah Foto Pertama Anda
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {photos.map((photo) => (
            <div 
              key={photo.id} 
              className="group relative overflow-hidden rounded-2xl shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer"
              onClick={() => handleViewPhoto(photo)}
            >
              <div className="aspect-square overflow-hidden">
                <img 
                  src={photo.imageUrl} 
                  alt={photo.altText} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <p className="text-white text-sm font-poppins truncate mb-2">{photo.altText}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                    <Heart 
                      className={`h-4 w-4 mr-1 ${isLiked[photo.id] ? 'text-red-500 fill-red-500' : 'text-white'}`} 
                    />
                    <span className="text-white text-xs font-poppins">{likeCount[photo.id] || 0}</span>
                  </div>
                  {userRole === "seller" && photo.sellerId === currentSellerId && (
                    <div className="flex space-x-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenForm(photo);
                        }}
                        className="h-8 w-8 text-white hover:bg-white/20 p-0"
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
                        className="h-8 w-8 text-white hover:bg-white/20 p-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Heart 
                  className={`h-5 w-5 cursor-pointer ${isLiked[photo.id] ? 'text-red-500 fill-red-500' : 'text-white'}`} 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLike(photo.id);
                  }} 
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Photo Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[500px] bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-playfair font-bold text-center">
              {editingPhoto ? "Edit Foto Kolase" : "Tambah Foto Baru ke Kolase"}
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-gray-600 font-poppins text-center dark:text-gray-400 mb-6">
              Tambahkan atau perbarui foto untuk kolase inspirasi gaya Anda.
            </p>
            <form onSubmit={handleSubmit} className="space-y-5">
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
                    setImageFile(null);
                  }}
                  placeholder="https://example.com/image.jpg"
                  className="mt-2 border-soft-pink focus:ring-soft-pink font-poppins dark:bg-gray-700 dark:text-gray-100 dark:border-gold-rose"
                />
              </div>
              
              {imagePreviewUrl && (
                <div className="flex justify-center">
                  <div className="relative">
                    <img 
                      src={imagePreviewUrl} 
                      alt="Preview" 
                      className="h-40 w-40 object-cover rounded-xl border-2 border-soft-pink shadow-md"
                    />
                    <Button 
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-soft-pink text-white hover:bg-rose-600"
                      onClick={() => {
                        setImagePreviewUrl(null);
                        setImageUrl("");
                        setImageFile(null);
                      }}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
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
                  className="bg-soft-pink hover:bg-rose-600 text-white font-poppins transition-all duration-300 hover:scale-105 px-6 py-3"
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
        <DialogContent className="sm:max-w-[95vw] sm:max-h-[95vh] bg-black/90 backdrop-blur-sm text-white p-0 overflow-hidden border-0 rounded-2xl max-w-none h-[90vh]">
          <div className="flex flex-col h-full">
            {selectedPhoto && (
              <>
                <div className="flex justify-between items-center p-4 bg-black/50">
                  <h3 className="text-2xl font-playfair font-bold">{selectedPhoto.altText}</h3>
                  <div className="flex space-x-3">
                    <Button variant="ghost" size="sm" onClick={handleZoomOut} className="text-white hover:bg-white/20">
                      <ZoomOut className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleResetZoom} className="text-white hover:bg-white/20">
                      <RotateCw className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleZoomIn} className="text-white hover:bg-white/20">
                      <ZoomIn className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleCloseView} className="text-white hover:bg-white/20">
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                
                <div 
                  className="flex-1 flex items-center justify-center overflow-hidden relative cursor-move bg-black"
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onWheel={handleWheel}
                >
                  <img 
                    src={selectedPhoto.imageUrl} 
                    alt={selectedPhoto.altText} 
                    className="max-w-none transition-transform duration-200 select-none"
                    style={{ 
                      transform: `scale(${zoomLevel}) rotate(${rotation}deg) translate(${position.x}px, ${position.y}px)`,
                      cursor: isDragging ? 'grabbing' : 'grab'
                    }}
                    draggable="false"
                  />
                </div>
                
                <div className="p-4 bg-black/50 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12" />
                    <div className="ml-4">
                      <p className="font-playfair font-bold text-lg">By.Lunova Official</p>
                      <p className="text-sm text-gray-300 font-poppins">Penjual Terpercaya</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center bg-black/30 backdrop-blur-sm rounded-full px-4 py-2">
                      <Heart 
                        className={`h-6 w-6 cursor-pointer ${isLiked[selectedPhoto.id] ? 'text-red-500 fill-red-500' : 'text-white'}`} 
                        onClick={() => handleLike(selectedPhoto.id)} 
                      />
                      <span className="ml-2 font-poppins text-lg">{likeCount[selectedPhoto.id] || 0}</span>
                    </div>
                    {selectedPhoto.productId ? (
                      <Button asChild className="bg-soft-pink hover:bg-rose-600 text-white font-poppins px-6 py-3">
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