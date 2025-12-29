import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

const WhatsAppContact: React.FC = () => {
  const handleWhatsAppClick = () => {
    // Nomor WhatsApp admin (ganti dengan nomor yang sebenarnya)
    const phoneNumber = '+6281234567890';
    const message = 'Halo admin By.Lunova, saya ingin bertanya tentang...';
    
    // Membuka WhatsApp Web dengan pesan otomatis
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="fixed bottom-24 right-4 z-50">
      <Button
        onClick={handleWhatsAppClick}
        className="bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
        aria-label="Hubungi Admin via WhatsApp"
      >
        <MessageCircle className="h-8 w-8" />
      </Button>
    </div>
  );
};

export default WhatsAppContact;