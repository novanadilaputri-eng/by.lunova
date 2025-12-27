"use client";

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import HomePageHeader from "@/components/HomePageHeader";
import { PlusCircle, Edit, Trash2, Megaphone } from "lucide-react";
import { showSuccess, showError } from "@/utils/toast";
import { Promotion } from "@/types/promotion";
import { mockPromotions, addPromotion, updatePromotion, deletePromotion } from "@/data/promotions";
import { useAuth } from "@/hooks/use-auth";

const SellerPromotionManagementPage: React.FC = () => {
  const { userRole } = useAuth();
  const navigate = useNavigate();
  const [promotions, setPromotions] = useState<Promotion[]>(mockPromotions);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPromotion, setEditingPromotion] = useState<Promotion | null>(null);

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // For demo, assume current seller is "By.Lunova Official"
  const currentSellerId = "By.Lunova Official";

  useEffect(() => {
    if (userRole !== "seller") {
      showError("Anda tidak memiliki akses ke halaman Manajemen Promosi.");
      navigate("/profile");
    }
  }, [userRole, navigate]);

  useEffect(() => {
    if (editingPromotion) {
      setTitle(editingPromotion.title);
      setMessage(editingPromotion.message);
      setImageUrl(editingPromotion.imageUrl || "");
      setIsActive(editingPromotion.isActive);
      setStartDate(editingPromotion.startDate);
      setEndDate(editingPromotion.endDate);
    } else {
      setTitle("");
      setMessage("");
      setImageUrl("");
      setIsActive(true);
      setStartDate(new Date().toISOString().split('T')[0]); // Default to today
      setEndDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]); // Default to 7 days from now
    }
  }, [editingPromotion, isFormOpen]);

  const handleOpenForm = (promotion: Promotion | null = null) => {
    setEditingPromotion(promotion);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingPromotion(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !message.trim() || !startDate || !endDate) {
      showError("Mohon lengkapi semua bidang wajib.");
      return;
    }

    const newOrUpdatedPromotion: Omit<Promotion, 'id'> = {
      title: title.trim(),
      message: message.trim(),
      imageUrl: imageUrl.trim() || undefined,
      isActive,
      startDate,
      endDate,
      sellerId: currentSellerId,
    };

    if (editingPromotion) {
      const updated: Promotion = { ...editingPromotion, ...newOrUpdatedPromotion };
      updatePromotion(updated);
      showSuccess("Promosi berhasil diperbarui!");
    } else {
      addPromotion(newOrUpdatedPromotion);
      showSuccess("Promosi baru berhasil ditambahkan!");
    }
    setPromotions([...mockPromotions]); // Update local state from mock data
    handleCloseForm();
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus promosi ini?")) {
      deletePromotion(id);
      setPromotions([...mockPromotions]);
      showSuccess("Promosi berhasil dihapus.");
    }
  };

  const filteredSellerPromotions = promotions.filter(p => p.sellerId === currentSellerId);

  if (userRole !== "seller") {
    return null;
  }

  return (
    <>
      <HomePageHeader />
      <div className="container mx-auto p-4 md:p-8">
        <h1 className="text-4xl font-playfair font-bold text-center mb-10 text-gray-900 dark:text-gray-100">Manajemen Promosi</h1>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-3xl mx-auto">
          <div className="flex items-center justify-between border-b pb-4 mb-4 border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-playfair font-bold text-gray-900 dark:text-gray-100">Daftar Promosi Anda</h2>
            <Button onClick={() => handleOpenForm()} className="bg-soft-pink hover:bg-rose-600 text-white font-poppins">
              <PlusCircle className="h-4 w-4 mr-2" /> Tambah Promosi Baru
            </Button>
          </div>

          {filteredSellerPromotions.length === 0 ? (
            <div className="text-center py-8">
              <Megaphone className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-lg text-gray-600 font-poppins dark:text-gray-400">Anda belum memiliki promosi aktif.</p>
              <Button onClick={() => handleOpenForm()} className="mt-4 bg-soft-pink hover:bg-rose-600 text-white font-poppins">
                <PlusCircle className="h-4 w-4 mr-2" /> Buat Promosi Pertama Anda
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredSellerPromotions.map((promo) => (
                <Card key={promo.id} className={`border p-4 rounded-lg ${promo.isActive ? "border-soft-pink bg-beige dark:bg-gray-700" : "border-gray-200 bg-white dark:bg-gray-800 opacity-70"}`}>
                  <CardContent className="p-0">
                    <div className="flex items-start space-x-4">
                      {promo.imageUrl && (
                        <img src={promo.imageUrl} alt={promo.title} className="w-24 h-24 object-cover rounded-md flex-shrink-0" />
                      )}
                      <div className="flex-grow">
                        <h3 className="font-poppins font-semibold text-lg text-gray-800 dark:text-gray-200">{promo.title}</h3>
                        <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">{promo.message}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                          {promo.startDate} - {promo.endDate}
                        </p>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full mt-2 inline-block ${promo.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                          {promo.isActive ? "Aktif" : "Tidak Aktif"}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-0 pt-4 flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleOpenForm(promo)} className="border-gold-rose text-gold-rose hover:bg-gold-rose hover:text-white font-poppins dark:border-gold-rose dark:text-gold-rose dark:hover:bg-gold-rose dark:hover:text-white">
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(promo.id)} className="font-poppins">
                      <Trash2 className="h-4 w-4 mr-1" /> Hapus
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

      {/* Promotion Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[500px] bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <DialogHeader>
            <DialogTitle className="font-playfair">{editingPromotion ? "Edit Promosi" : "Tambah Promosi Baru"}</DialogTitle>
            <DialogDescription className="font-poppins text-gray-600 dark:text-gray-400">
              Buat atau perbarui detail promosi Anda.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right font-poppins text-gray-800 dark:text-gray-200">Judul</Label>
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="col-span-3 font-poppins border-soft-pink focus:ring-soft-pink dark:bg-gray-700 dark:text-gray-100 dark:border-gold-rose" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="message" className="text-right font-poppins text-gray-800 dark:text-gray-200">Pesan</Label>
              <Textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} rows={3} className="col-span-3 font-poppins border-soft-pink focus:ring-soft-pink dark:bg-gray-700 dark:text-gray-100 dark:border-gold-rose" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="imageUrl" className="text-right font-poppins text-gray-800 dark:text-gray-200">URL Gambar (Opsional)</Label>
              <Input id="imageUrl" type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://example.com/banner.jpg" className="col-span-3 font-poppins border-soft-pink focus:ring-soft-pink dark:bg-gray-700 dark:text-gray-100 dark:border-gold-rose" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="startDate" className="text-right font-poppins text-gray-800 dark:text-gray-200">Tanggal Mulai</Label>
              <Input id="startDate" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="col-span-3 font-poppins border-soft-pink focus:ring-soft-pink dark:bg-gray-700 dark:text-gray-100 dark:border-gold-rose" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="endDate" className="text-right font-poppins text-gray-800 dark:text-gray-200">Tanggal Berakhir</Label>
              <Input id="endDate" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="col-span-3 font-poppins border-soft-pink focus:ring-soft-pink dark:bg-gray-700 dark:text-gray-100 dark:border-gold-rose" required />
            </div>
            <div className="flex items-center justify-end col-span-4 gap-2">
              <Checkbox id="isActive" checked={isActive} onCheckedChange={(checked: boolean) => setIsActive(checked)} className="border-soft-pink data-[state=checked]:bg-soft-pink data-[state=checked]:text-white" />
              <Label htmlFor="isActive" className="font-poppins text-gray-800 dark:text-gray-200">Aktifkan Promosi</Label>
            </div>
            <DialogFooter className="col-span-4 mt-4">
              <Button type="submit" className="bg-soft-pink hover:bg-rose-600 text-white font-poppins">
                {editingPromotion ? "Simpan Perubahan" : "Tambah Promosi"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SellerPromotionManagementPage;