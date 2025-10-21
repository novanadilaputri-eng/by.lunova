import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Package, Heart, Gift, MapPin, Settings, HelpCircle, LogOut,
  Wallet, Truck, CheckCircle, XCircle, Clock, User as UserIcon // Renamed User to UserIcon to avoid conflict
} from "lucide-react";
import HomePageHeader from "@/components/HomePageHeader";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { showSuccess, showError } from "@/utils/toast";

interface ProfileMenuItemProps {
  icon: React.ElementType;
  label: string;
  to: string;
  className?: string;
}

const ProfileMenuItem: React.FC<ProfileMenuItemProps> = ({ icon: Icon, label, to, className }) => (
  <Link to={to} className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:bg-beige transition-colors">
    <Icon className="h-5 w-5 text-soft-pink mr-4" />
    <span className="font-poppins text-gray-800">{label}</span>
  </Link>
);

const ProfilePage: React.FC = () => {
  const [username, setUsername] = useState("LunovaUser123"); // Placeholder
  const [profilePicture, setProfilePicture] = useState("https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"); // Placeholder
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [tempUsername, setTempUsername] = useState(username);
  const [tempProfilePicture, setTempProfilePicture] = useState(profilePicture);

  const handleSaveProfile = () => {
    if (!tempUsername.trim()) {
      showError("Nama pengguna tidak boleh kosong.");
      return;
    }
    setUsername(tempUsername);
    setProfilePicture(tempProfilePicture);
    setIsEditDialogOpen(false);
    showSuccess("Profil berhasil diperbarui!");
  };

  return (
    <>
      <HomePageHeader />
      <div className="container mx-auto p-4 md:p-8">
        <h1 className="text-4xl font-playfair font-bold text-center mb-10 text-gray-900">Akun Saya</h1>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8 flex flex-col items-center">
          <Avatar className="h-24 w-24 mb-4 border-4 border-soft-pink">
            <AvatarImage src={profilePicture} alt={username} />
            <AvatarFallback className="bg-soft-pink/20 text-soft-pink text-3xl font-playfair">{username.charAt(0)}</AvatarFallback>
          </Avatar>
          <h2 className="text-2xl font-playfair font-bold text-gray-900">{username}</h2>
          <p className="text-md text-gray-600 font-poppins">lunova.user@example.com</p>
          <Button
            variant="outline"
            className="mt-4 border-gold-rose text-gold-rose hover:bg-gold-rose hover:text-white font-poppins"
            onClick={() => setIsEditDialogOpen(true)}
          >
            Edit Profil
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-playfair font-bold text-gray-900 mb-4">Pesanan Saya</h3>
            <div className="grid grid-cols-2 gap-2">
              <Link to="/profile/orders/BYLNV-20231225-001" className="flex flex-col items-center p-3 bg-beige rounded-lg hover:bg-soft-pink/20 transition-colors">
                <Package className="h-6 w-6 text-soft-pink mb-1" />
                <span className="text-sm font-poppins text-gray-700">Semua</span>
              </Link>
              <Link to="/profile/orders?status=pending-payment" className="flex flex-col items-center p-3 bg-beige rounded-lg hover:bg-soft-pink/20 transition-colors">
                <Wallet className="h-6 w-6 text-soft-pink mb-1" />
                <span className="text-sm font-poppins text-gray-700">Belum Bayar</span>
              </Link>
              <Link to="/profile/orders?status=shipped" className="flex flex-col items-center p-3 bg-beige rounded-lg hover:bg-soft-pink/20 transition-colors">
                <Truck className="h-6 w-6 text-soft-pink mb-1" />
                <span className="text-sm font-poppins text-gray-700">Dikirim</span>
              </Link>
              <Link to="/profile/orders?status=completed" className="flex flex-col items-center p-3 bg-beige rounded-lg hover:bg-soft-pink/20 transition-colors">
                <CheckCircle className="h-6 w-6 text-soft-pink mb-1" />
                <span className="text-sm font-poppins text-gray-700">Selesai</span>
              </Link>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-playfair font-bold text-gray-900 mb-4">LunoPoints & Voucher</h3>
            <div className="flex items-center justify-between mb-4">
              <span className="font-poppins text-lg text-gray-700">LunoPoints Anda:</span>
              <span className="font-playfair text-xl font-bold text-gold-rose">1200 Poin</span>
            </div>
            <Button className="w-full bg-gold-rose hover:bg-gold-rose/80 text-white font-poppins">
              Tukar Poin
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <ProfileMenuItem icon={Heart} label="Wishlist" to="/profile/wishlist" />
          <ProfileMenuItem icon={Gift} label="Voucher Saya" to="/profile/vouchers" />
          <ProfileMenuItem icon={MapPin} label="Alamat Saya" to="/profile/addresses" />
          <ProfileMenuItem icon={Settings} label="Pengaturan Aplikasi" to="/profile/settings" />
          <ProfileMenuItem icon={HelpCircle} label="Pusat Bantuan" to="/profile/help" />
          <ProfileMenuItem icon={UserIcon} label="Dashboard Penjual" to="/seller/dashboard" /> {/* New link for seller dashboard */}
          <ProfileMenuItem icon={LogOut} label="Logout" to="/logout" className="text-red-500 hover:bg-red-50" />
        </div>
      </div>

      {/* Edit Profile Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="font-playfair">Edit Profil</DialogTitle>
            <DialogDescription className="font-poppins">
              Perbarui informasi profil Anda di sini. Klik simpan setelah selesai.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right font-poppins">
                Nama
              </Label>
              <Input
                id="name"
                value={tempUsername}
                onChange={(e) => setTempUsername(e.target.value)}
                className="col-span-3 font-poppins"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="picture" className="text-right font-poppins">
                Foto Profil
              </Label>
              <Input
                id="picture"
                value={tempProfilePicture}
                onChange={(e) => setTempProfilePicture(e.target.value)}
                placeholder="URL Gambar"
                className="col-span-3 font-poppins"
              />
            </div>
            {tempProfilePicture && (
              <div className="col-span-full flex justify-center mt-2">
                <img src={tempProfilePicture} alt="Preview" className="h-24 w-24 rounded-full object-cover border" />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="button" onClick={handleSaveProfile} className="bg-soft-pink hover:bg-rose-600 text-white font-poppins">
              Simpan Perubahan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProfilePage;