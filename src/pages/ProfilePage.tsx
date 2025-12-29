import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Package, Heart, Gift, MapPin, Settings, HelpCircle, LogOut, Wallet, Truck, CheckCircle, User as UserIcon, Bell } from "lucide-react";
import HomePageHeader from "@/components/HomePageHeader";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { showSuccess, showError } from "@/utils/toast";
import { useAuth } from "@/hooks/use-auth";
import WhatsAppVerificationDialog from "@/components/WhatsAppVerificationDialog";

interface ProfileMenuItemProps {
  icon: React.ElementType;
  label: string;
  to: string;
  className?: string;
}

const ProfileMenuItem: React.FC<ProfileMenuItemProps> = ({ icon: Icon, label, to, className }) => (
  <Link to={to} className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:bg-beige dark:hover:bg-gray-700 transition-colors">
    <Icon className="h-5 w-5 text-soft-pink mr-4" />
    <span className="font-poppins text-gray-800 dark:text-gray-200">{label}</span>
  </Link>
);

const ProfilePage: React.FC = () => {
  const { userRole, loginAsBuyer, loginAsSeller, logout } = useAuth();
  const [username, setUsername] = useState(() => localStorage.getItem("profileUsername") || "Pengguna");
  const [profilePicture, setProfilePicture] = useState(() => localStorage.getItem("profilePictureUrl") || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isWhatsAppVerificationOpen, setIsWhatsAppVerificationOpen] = useState(false);
  const [tempUsername, setTempUsername] = useState(username);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(profilePicture);

  useEffect(() => {
    if (isEditDialogOpen) {
      setTempUsername(username);
      setFilePreviewUrl(profilePicture);
      setSelectedFile(null);
    }
  }, [isEditDialogOpen, username, profilePicture]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedFile(null);
      setFilePreviewUrl(profilePicture);
    }
  };

  const handleSaveProfile = () => {
    if (!tempUsername.trim()) {
      showError("Nama pengguna tidak boleh kosong.");
      return;
    }
    setUsername(tempUsername);
    localStorage.setItem("profileUsername", tempUsername);

    if (selectedFile) {
      setProfilePicture(filePreviewUrl!);
      localStorage.setItem("profilePictureUrl", filePreviewUrl!);
      showSuccess("Profil berhasil diperbarui! (Foto akan diunggah ke server di aplikasi nyata)");
    } else if (filePreviewUrl !== profilePicture) {
      setProfilePicture(filePreviewUrl || "");
      localStorage.setItem("profilePictureUrl", filePreviewUrl || "");
      showSuccess("Profil berhasil diperbarui!");
    } else {
      showSuccess("Profil berhasil diperbarui!");
    }
    setIsEditDialogOpen(false);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <HomePageHeader />
      <div className="container mx-auto p-4 md:p-8">
        <h1 className="text-4xl font-playfair font-bold text-center mb-10 text-gray-900 dark:text-gray-100">Akun Saya</h1>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8 flex flex-col items-center">
          <Avatar className="h-24 w-24 mb-4 border-4 border-soft-pink">
            <AvatarImage src={profilePicture} alt={username} />
            <AvatarFallback className="bg-soft-pink/20 text-soft-pink text-3xl font-playfair">{username.charAt(0)}</AvatarFallback>
          </Avatar>
          <h2 className="text-2xl font-playfair font-bold text-gray-900 dark:text-gray-100">{username}</h2>
          <Button variant="outline" className="mt-4 border-gold-rose text-gold-rose hover:bg-gold-rose hover:text-white font-poppins dark:border-gold-rose dark:text-gold-rose dark:hover:bg-gold-rose dark:hover:text-white" onClick={() => setIsEditDialogOpen(true)}>
            Edit Profil
          </Button>
          <div className="mt-4 flex space-x-2">
            {userRole === "buyer" && (
              <Button onClick={() => setIsWhatsAppVerificationOpen(true)} className="bg-gold-rose hover:bg-gold-rose/80 text-white font-poppins">
                Login sebagai Penjual
              </Button>
            )}
            {userRole === "seller" && (
              <Button onClick={loginAsBuyer} className="bg-soft-pink hover:bg-rose-600 text-white font-poppins">
                Login sebagai Pembeli
              </Button>
            )}
            {!userRole && (
              <>
                <Button onClick={loginAsBuyer} className="bg-soft-pink hover:bg-rose-600 text-white font-poppins">
                  Login sebagai Pembeli
                </Button>
                <Button onClick={() => setIsWhatsAppVerificationOpen(true)} className="bg-gold-rose hover:bg-gold-rose/80 text-white font-poppins">
                  Login sebagai Penjual
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-playfair font-bold text-gray-900 dark:text-gray-100 mb-4">Pesanan Saya</h3>
            <div className="grid grid-cols-2 gap-2">
              <Link to="/profile/orders" className="flex flex-col items-center p-3 bg-beige dark:bg-gray-700 rounded-lg hover:bg-soft-pink/20 transition-colors">
                <Package className="h-6 w-6 text-soft-pink mb-1" />
                <span className="text-sm font-poppins text-gray-700 dark:text-gray-300">Semua (0)</span>
              </Link>
              <Link to="/profile/orders?status=pending-payment" className="flex flex-col items-center p-3 bg-beige dark:bg-gray-700 rounded-lg hover:bg-soft-pink/20 transition-colors">
                <Wallet className="h-6 w-6 text-soft-pink mb-1" />
                <span className="text-sm font-poppins text-gray-700 dark:text-gray-300">Belum Bayar (0)</span>
              </Link>
              <Link to="/profile/orders?status=shipped" className="flex flex-col items-center p-3 bg-beige dark:bg-gray-700 rounded-lg hover:bg-soft-pink/20 transition-colors">
                <Truck className="h-6 w-6 text-soft-pink mb-1" />
                <span className="text-sm font-poppins text-gray-700 dark:text-gray-300">Dikirim (0)</span>
              </Link>
              <Link to="/profile/orders?status=completed" className="flex flex-col items-center p-3 bg-beige dark:bg-gray-700 rounded-lg hover:bg-soft-pink/20 transition-colors">
                <CheckCircle className="h-6 w-6 text-soft-pink mb-1" />
                <span className="text-sm font-poppins text-gray-700 dark:text-gray-300">Selesai (0)</span>
              </Link>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-playfair font-bold text-gray-900 dark:text-gray-100 mb-4">LunoPoints & Voucher</h3>
            <div className="flex items-center justify-between mb-4">
              <span className="font-poppins text-lg text-gray-700 dark:text-gray-300">LunoPoints Anda:</span>
              <span className="font-playfair text-xl font-bold text-gold-rose">1200 Poin</span>
            </div>
            <Button asChild className="w-full bg-gold-rose hover:bg-gold-rose/80 text-white font-poppins">
              <Link to="/profile/lunopoints">Tukar Poin</Link>
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <ProfileMenuItem icon={Heart} label="Wishlist" to="/profile/wishlist" />
          <ProfileMenuItem icon={Gift} label="Voucher Saya" to="/profile/vouchers" />
          <ProfileMenuItem icon={MapPin} label="Alamat Saya" to="/profile/addresses" />
          <ProfileMenuItem icon={Bell} label="Pemberitahuan" to="/notifications" />
          <ProfileMenuItem icon={Settings} label="Pengaturan Aplikasi" to="/profile/settings" />
          <ProfileMenuItem icon={HelpCircle} label="Pusat Bantuan" to="/profile/help" />
          {userRole === "seller" && (
            <>
              <ProfileMenuItem icon={UserIcon} label="Dashboard Penjual" to="/seller/dashboard" />
              <ProfileMenuItem icon={Package} label="Tambah Produk" to="/seller/products/new" />
            </>
          )}
          <Button onClick={handleLogout} className="w-full flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">
            <LogOut className="h-5 w-5 mr-4" />
            <span className="font-poppins">Logout</span>
          </Button>
        </div>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <DialogHeader>
            <DialogTitle className="font-playfair">Edit Profil</DialogTitle>
            <DialogDescription className="font-poppins text-gray-600 dark:text-gray-400">
              Perbarui informasi profil Anda di sini. Klik simpan setelah selesai.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right font-poppins text-gray-800 dark:text-gray-200">
                Nama
              </Label>
              <Input
                id="name"
                value={tempUsername}
                onChange={(e) => setTempUsername(e.target.value)}
                className="col-span-3 font-poppins border-soft-pink focus:ring-soft-pink dark:bg-gray-700 dark:text-gray-100 dark:border-gold-rose"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="picture" className="text-right font-poppins text-gray-800 dark:text-gray-200">
                Foto Profil
              </Label>
              <Input
                id="picture"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="col-span-3 font-poppins border-soft-pink focus:ring-soft-pink dark:bg-gray-700 dark:text-gray-100 dark:border-gold-rose"
              />
            </div>
            {filePreviewUrl && (
              <div className="col-span-full flex justify-center mt-2">
                <img src={filePreviewUrl} alt="Preview" className="h-24 w-24 rounded-full object-cover border border-soft-pink dark:border-gold-rose" />
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

      <WhatsAppVerificationDialog
        isOpen={isWhatsAppVerificationOpen}
        onClose={() => setIsWhatsAppVerificationOpen(false)}
        onVerified={() => {
          loginAsSeller();
          setIsWhatsAppVerificationOpen(false);
          showSuccess("Verifikasi WhatsApp berhasil! Anda sekarang login sebagai Penjual.");
        }}
      />
    </>
  );
};

export default ProfilePage;