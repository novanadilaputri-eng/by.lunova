import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import HomePageHeader from "@/components/HomePageHeader";
import { HelpCircle, Mail, Phone, MessageSquare, MessageCircle } from "lucide-react";

const HelpPage: React.FC = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = '6281234567890'; // Format internasional tanpa tanda +
    const message = 'Halo admin By.Lunova, saya ingin bertanya tentang...';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      <HomePageHeader />
      <div className="container mx-auto p-4 md:p-8">
        <h1 className="text-4xl font-playfair font-bold text-center mb-10 text-gray-900">Pusat Bantuan</h1>
        <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto space-y-6">
          <p className="text-gray-700 font-poppins mb-4">
            Selamat datang di Pusat Bantuan By.Lunova. Kami siap membantu Anda dengan pertanyaan atau masalah yang mungkin Anda miliki.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center p-4 border rounded-lg bg-beige">
              <Mail className="h-6 w-6 text-soft-pink mr-4" />
              <div>
                <p className="font-poppins font-semibold text-gray-800">Email Kami</p>
                <p className="text-gray-700">support@bylunova.com</p>
              </div>
            </div>
            
            <div className="flex items-center p-4 border rounded-lg bg-beige">
              <Phone className="h-6 w-6 text-soft-pink mr-4" />
              <div>
                <p className="font-poppins font-semibold text-gray-800">Hubungi Kami</p>
                <p className="text-gray-700">+62 812-3456-7890</p>
              </div>
            </div>
            
            <div 
              className="flex items-center p-4 border rounded-lg bg-beige cursor-pointer hover:bg-soft-pink/20 transition-colors"
              onClick={handleWhatsAppClick}
            >
              <MessageCircle className="h-6 w-6 text-green-500 mr-4" />
              <div>
                <p className="font-poppins font-semibold text-gray-800">Chat via WhatsApp</p>
                <p className="text-gray-700">Klik untuk chat langsung dengan admin</p>
              </div>
            </div>
            
            <div className="flex items-center p-4 border rounded-lg bg-beige">
              <MessageSquare className="h-6 w-6 text-soft-pink mr-4" />
              <div>
                <p className="font-poppins font-semibold text-gray-800">Live Chat</p>
                <p className="text-gray-700">Tersedia 24/7</p>
              </div>
            </div>
          </div>
          
          <h2 className="text-2xl font-playfair font-bold text-gray-900 mt-8 mb-4">Pertanyaan Umum (FAQ)</h2>
          <ul className="list-disc list-inside text-gray-700 font-poppins space-y-2">
            <li>Bagaimana cara melacak pesanan saya?</li>
            <li>Bagaimana cara mengajukan pengembalian barang?</li>
            <li>Metode pembayaran apa saja yang tersedia?</li>
            <li>Bagaimana cara menggunakan voucher?</li>
          </ul>
        </div>
        
        <div className="text-center mt-8">
          <Button 
            asChild 
            variant="outline" 
            className="border-soft-pink text-soft-pink hover:bg-soft-pink hover:text-white font-poppins"
          >
            <Link to="/profile">Kembali ke Akun Saya</Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default HelpPage;