import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import HomePageHeader from "@/components/HomePageHeader";
import { MapPin, PlusCircle, Edit, Trash2, CheckCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { showSuccess, showError } from "@/utils/toast";
import { Address } from "@/types/address";
import { mockAddresses, addAddress, updateAddress, deleteAddress, setMainAddress } from "@/data/addresses";

const AddressPage: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>(mockAddresses);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  const [recipientName, setRecipientName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [latitude, setLatitude] = useState<number | undefined>(undefined);
  const [longitude, setLongitude] = useState<number | undefined>(undefined);
  const [isMain, setIsMain] = useState(false);

  useEffect(() => {
    if (editingAddress) {
      setRecipientName(editingAddress.recipientName);
      setPhoneNumber(editingAddress.phoneNumber);
      setFullAddress(editingAddress.fullAddress);
      setCity(editingAddress.city);
      setProvince(editingAddress.province);
      setPostalCode(editingAddress.postalCode);
      setLatitude(editingAddress.latitude);
      setLongitude(editingAddress.longitude);
      setIsMain(editingAddress.isMain);
    } else {
      // Reset form for new address
      setRecipientName("");
      setPhoneNumber("");
      setFullAddress("");
      setCity("");
      setProvince("");
      setPostalCode("");
      setLatitude(undefined);
      setLongitude(undefined);
      setIsMain(false);
    }
  }, [editingAddress, isFormOpen]);

  const handleOpenForm = (address: Address | null = null) => {
    setEditingAddress(address);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingAddress(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientName || !phoneNumber || !fullAddress || !city || !province || !postalCode) {
      showError("Mohon lengkapi semua bidang wajib.");
      return;
    }

    const newOrUpdatedAddress: Omit<Address, 'id'> = {
      recipientName,
      phoneNumber,
      fullAddress,
      city,
      province,
      postalCode,
      latitude,
      longitude,
      isMain,
    };

    if (editingAddress) {
      const updated: Address = { ...editingAddress, ...newOrUpdatedAddress };
      updateAddress(updated);
      showSuccess("Alamat berhasil diperbarui!");
    } else {
      addAddress(newOrUpdatedAddress);
      showSuccess("Alamat baru berhasil ditambahkan!");
    }
    setAddresses([...mockAddresses]); // Update local state from mock data
    handleCloseForm();
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus alamat ini?")) {
      deleteAddress(id);
      setAddresses([...mockAddresses]);
      showSuccess("Alamat berhasil dihapus.");
    }
  };

  const handleSetMain = (id: string) => {
    setMainAddress(id);
    setAddresses([...mockAddresses]);
    showSuccess("Alamat utama berhasil diubah.");
  };

  return (
    <>
      <HomePageHeader />
      <div className="container mx-auto p-4 md:p-8">
        <h1 className="text-4xl font-playfair font-bold text-center mb-10 text-gray-900 dark:text-gray-100">Alamat Saya</h1>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-2xl mx-auto">
          <div className="flex items-center justify-between border-b pb-4 mb-4 border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-playfair font-bold text-gray-900 dark:text-gray-100">Daftar Alamat</h2>
            <Button onClick={() => handleOpenForm()} className="bg-soft-pink hover:bg-rose-600 text-white font-poppins">
              <PlusCircle className="h-4 w-4 mr-2" /> Tambah Alamat Baru
            </Button>
          </div>

          {addresses.length === 0 ? (
            <div className="text-center py-8">
              <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-lg text-gray-600 font-poppins dark:text-gray-400">Anda belum menambahkan alamat pengiriman.</p>
              <Button onClick={() => handleOpenForm()} className="mt-4 bg-soft-pink hover:bg-rose-600 text-white font-poppins">
                <PlusCircle className="h-4 w-4 mr-2" /> Tambah Alamat Baru
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {addresses.map((address) => (
                <div key={address.id} className={`border p-4 rounded-lg relative ${address.isMain ? "bg-beige dark:bg-gray-700 border-soft-pink" : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"}`}>
                  {address.isMain && (
                    <span className="absolute top-2 right-2 bg-soft-pink text-white text-xs px-2 py-1 rounded-full font-poppins">Utama</span>
                  )}
                  <p className="font-poppins font-semibold text-gray-800 dark:text-gray-200">{address.recipientName}</p>
                  <p className="text-gray-700 dark:text-gray-300">No. Telepon: {address.phoneNumber}</p>
                  <p className="text-gray-700 dark:text-gray-300">{address.fullAddress}, {address.city}, {address.province}, {address.postalCode}</p>
                  {address.latitude && address.longitude && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">Koordinat: {address.latitude}, {address.longitude}</p>
                  )}
                  <div className="flex space-x-2 mt-3">
                    <Button variant="outline" size="sm" onClick={() => handleOpenForm(address)} className="border-gold-rose text-gold-rose hover:bg-gold-rose hover:text-white font-poppins dark:border-gold-rose dark:text-gold-rose dark:hover:bg-gold-rose dark:hover:text-white">
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </Button>
                    {!address.isMain && (
                      <Button variant="outline" size="sm" onClick={() => handleSetMain(address.id)} className="border-soft-pink text-soft-pink hover:bg-soft-pink hover:text-white font-poppins dark:border-soft-pink dark:text-soft-pink dark:hover:bg-soft-pink dark:hover:text-white">
                        <CheckCircle className="h-4 w-4 mr-1" /> Atur Utama
                      </Button>
                    )}
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(address.id)} className="font-poppins">
                      <Trash2 className="h-4 w-4 mr-1" /> Hapus
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="text-center mt-8">
          <Button asChild variant="outline" className="border-soft-pink text-soft-pink hover:bg-soft-pink hover:text-white font-poppins dark:border-gold-rose dark:text-gold-rose dark:hover:bg-gold-rose dark:hover:text-white">
            <Link to="/profile">Kembali ke Akun Saya</Link>
          </Button>
        </div>
      </div>

      {/* Address Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[500px] bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <DialogHeader>
            <DialogTitle className="font-playfair">{editingAddress ? "Edit Alamat" : "Tambah Alamat Baru"}</DialogTitle>
            <DialogDescription className="font-poppins text-gray-600 dark:text-gray-400">
              Lengkapi detail alamat pengiriman Anda.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="recipientName" className="text-right font-poppins text-gray-800 dark:text-gray-200">Nama Penerima</Label>
              <Input id="recipientName" value={recipientName} onChange={(e) => setRecipientName(e.target.value)} className="col-span-3 font-poppins border-soft-pink focus:ring-soft-pink dark:bg-gray-700 dark:text-gray-100 dark:border-gold-rose" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phoneNumber" className="text-right font-poppins text-gray-800 dark:text-gray-200">No. Telepon</Label>
              <Input id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="col-span-3 font-poppins border-soft-pink focus:ring-soft-pink dark:bg-gray-700 dark:text-gray-100 dark:border-gold-rose" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fullAddress" className="text-right font-poppins text-gray-800 dark:text-gray-200">Alamat Lengkap</Label>
              <Textarea id="fullAddress" value={fullAddress} onChange={(e) => setFullAddress(e.target.value)} rows={3} className="col-span-3 font-poppins border-soft-pink focus:ring-soft-pink dark:bg-gray-700 dark:text-gray-100 dark:border-gold-rose" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="city" className="text-right font-poppins text-gray-800 dark:text-gray-200">Kota</Label>
              <Input id="city" value={city} onChange={(e) => setCity(e.target.value)} className="col-span-3 font-poppins border-soft-pink focus:ring-soft-pink dark:bg-gray-700 dark:text-gray-100 dark:border-gold-rose" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="province" className="text-right font-poppins text-gray-800 dark:text-gray-200">Provinsi</Label>
              <Input id="province" value={province} onChange={(e) => setProvince(e.target.value)} className="col-span-3 font-poppins border-soft-pink focus:ring-soft-pink dark:bg-gray-700 dark:text-gray-100 dark:border-gold-rose" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="postalCode" className="text-right font-poppins text-gray-800 dark:text-gray-200">Kode Pos</Label>
              <Input id="postalCode" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} className="col-span-3 font-poppins border-soft-pink focus:ring-soft-pink dark:bg-gray-700 dark:text-gray-100 dark:border-gold-rose" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="latitude" className="text-right font-poppins text-gray-800 dark:text-gray-200">Latitude (Opsional)</Label>
              <Input id="latitude" type="number" step="any" value={latitude ?? ""} onChange={(e) => setLatitude(Number(e.target.value))} placeholder="-6.175392" className="col-span-3 font-poppins border-soft-pink focus:ring-soft-pink dark:bg-gray-700 dark:text-gray-100 dark:border-gold-rose" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="longitude" className="text-right font-poppins text-gray-800 dark:text-gray-200">Longitude (Opsional)</Label>
              <Input id="longitude" type="number" step="any" value={longitude ?? ""} onChange={(e) => setLongitude(Number(e.target.value))} placeholder="106.827153" className="col-span-3 font-poppins border-soft-pink focus:ring-soft-pink dark:bg-gray-700 dark:text-gray-100 dark:border-gold-rose" />
            </div>
            <div className="flex items-center justify-end col-span-4 gap-2">
              <Checkbox id="isMain" checked={isMain} onCheckedChange={(checked: boolean) => setIsMain(checked)} className="border-soft-pink data-[state=checked]:bg-soft-pink data-[state=checked]:text-white" />
              <Label htmlFor="isMain" className="font-poppins text-gray-800 dark:text-gray-200">Atur sebagai Alamat Utama</Label>
            </div>
            <DialogFooter className="col-span-4 mt-4">
              <Button type="submit" className="bg-soft-pink hover:bg-rose-600 text-white font-poppins">
                {editingAddress ? "Simpan Perubahan" : "Tambah Alamat"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddressPage;