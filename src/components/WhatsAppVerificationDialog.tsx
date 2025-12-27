"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { showSuccess, showError } from "@/utils/toast";
import { Phone } from "lucide-react";

interface WhatsAppVerificationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onVerified: () => void;
}

const WhatsAppVerificationDialog: React.FC<WhatsAppVerificationDialogProps> = ({ isOpen, onClose, onVerified }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendCode = () => {
    if (!phoneNumber.trim()) {
      showError("Mohon masukkan nomor WhatsApp Anda.");
      return;
    }
    setIsLoading(true);
    // Simulate sending code (frontend-only)
    setTimeout(() => {
      setIsCodeSent(true);
      setIsLoading(false);
      showSuccess("Kode verifikasi telah dikirim ke WhatsApp Anda (simulasi).");
      // In a real app, this would involve a backend call to send the code
    }, 1500);
  };

  const handleVerifyCode = () => {
    if (!verificationCode.trim()) {
      showError("Mohon masukkan kode verifikasi.");
      return;
    }
    setIsLoading(true);
    // Simulate code verification (frontend-only)
    setTimeout(() => {
      if (verificationCode === "123456") { // Simple mock code
        onVerified();
        setPhoneNumber("");
        setVerificationCode("");
        setIsCodeSent(false);
      } else {
        showError("Kode verifikasi salah. Mohon coba lagi.");
      }
      setIsLoading(false);
      // In a real app, this would involve a backend call to verify the code
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <DialogHeader>
          <DialogTitle className="font-playfair">Verifikasi WhatsApp</DialogTitle>
          <DialogDescription className="font-poppins text-gray-600 dark:text-gray-400">
            Untuk keamanan, login sebagai penjual memerlukan verifikasi nomor WhatsApp Anda.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {!isCodeSent ? (
            <div className="space-y-2">
              <Label htmlFor="whatsapp-number" className="font-poppins text-gray-800 dark:text-gray-200">Nomor WhatsApp</Label>
              <Input
                id="whatsapp-number"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="e.g., +6281234567890"
                className="font-poppins border-soft-pink focus:ring-soft-pink dark:bg-gray-700 dark:text-gray-100 dark:border-gold-rose"
                disabled={isLoading}
              />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                (Ini adalah simulasi. Dalam aplikasi nyata, kode akan dikirim ke nomor ini.)
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="verification-code" className="font-poppins text-gray-800 dark:text-gray-200">Kode Verifikasi</Label>
              <Input
                id="verification-code"
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="Masukkan 6 digit kode"
                maxLength={6}
                className="font-poppins border-soft-pink focus:ring-soft-pink dark:bg-gray-700 dark:text-gray-100 dark:border-gold-rose"
                disabled={isLoading}
              />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                (Kode simulasi: 123456)
              </p>
            </div>
          )}
        </div>
        <DialogFooter>
          {!isCodeSent ? (
            <Button onClick={handleSendCode} disabled={isLoading} className="bg-soft-pink hover:bg-rose-600 text-white font-poppins">
              {isLoading ? "Mengirim..." : <><Phone className="h-4 w-4 mr-2" /> Kirim Kode</>}
            </Button>
          ) : (
            <Button onClick={handleVerifyCode} disabled={isLoading} className="bg-soft-pink hover:bg-rose-600 text-white font-poppins">
              {isLoading ? "Memverifikasi..." : "Verifikasi Kode"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WhatsAppVerificationDialog;