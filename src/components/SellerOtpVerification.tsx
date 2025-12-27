"use client";

import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { showSuccess, showError } from "@/utils/toast";
import { MessageSquareText, CheckCircle2, XCircle } from "lucide-react";

interface SellerOtpVerificationProps {
  isOpen: boolean;
  onClose: () => void;
}

const SellerOtpVerification: React.FC<SellerOtpVerificationProps> = ({ isOpen, onClose }) => {
  const { initiateSellerOtp, verifySellerOtp, cancelSellerOtp } = useAuth();
  const [otpInput, setOtpInput] = useState("");
  const [sentOtp, setSentOtp] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(0); // Countdown for resend OTP
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleSendOtp = () => {
    setIsSending(true);
    // Simulate network delay
    setTimeout(() => {
      const newOtp = initiateSellerOtp();
      setSentOtp(newOtp);
      setCountdown(60); // 60 seconds countdown for resend
      showSuccess(`Kode verifikasi telah dikirim ke WhatsApp Anda. (Kode: ${newOtp})`);
      setIsSending(false);
    }, 1500);
  };

  const handleVerifyOtp = () => {
    if (!otpInput.trim()) {
      showError("Mohon masukkan kode verifikasi.");
      return;
    }
    if (verifySellerOtp(otpInput)) {
      showSuccess("Verifikasi berhasil! Anda sekarang login sebagai penjual.");
      onClose();
    } else {
      showError("Kode verifikasi salah atau kedaluwarsa.");
    }
  };

  const handleClose = () => {
    cancelSellerOtp();
    setOtpInput("");
    setSentOtp(null);
    setCountdown(0);
    setIsSending(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <DialogHeader>
          <DialogTitle className="font-playfair flex items-center">
            <MessageSquareText className="h-6 w-6 mr-2 text-soft-pink" /> Verifikasi WhatsApp Penjual
          </DialogTitle>
          <DialogDescription className="font-poppins text-gray-600 dark:text-gray-400">
            Untuk keamanan, masukkan kode verifikasi 6 digit yang dikirim ke nomor WhatsApp Anda.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="otp" className="text-right font-poppins text-gray-800 dark:text-gray-200">
              Kode OTP
            </Label>
            <Input
              id="otp"
              type="text"
              maxLength={6}
              value={otpInput}
              onChange={(e) => setOtpInput(e.target.value)}
              placeholder="******"
              className="col-span-3 font-poppins border-soft-pink focus:ring-soft-pink dark:bg-gray-700 dark:text-gray-100 dark:border-gold-rose"
            />
          </div>
          <div className="col-span-full flex justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={handleSendOtp}
              disabled={countdown > 0 || isSending}
              className="border-gold-rose text-gold-rose hover:bg-gold-rose hover:text-white font-poppins dark:border-gold-rose dark:text-gold-rose dark:hover:bg-gold-rose dark:hover:text-white"
            >
              {isSending ? "Mengirim..." : countdown > 0 ? `Kirim Ulang (${countdown}s)` : "Kirim Kode"}
            </Button>
          </div>
          {sentOtp && (
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              Kode telah dikirim. Cek WhatsApp Anda.
            </p>
          )}
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={handleClose} className="border-gray-300 text-gray-700 hover:bg-gray-100 font-poppins dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700">
            <XCircle className="h-4 w-4 mr-2" /> Batal
          </Button>
          <Button type="button" onClick={handleVerifyOtp} className="bg-soft-pink hover:bg-rose-600 text-white font-poppins">
            <CheckCircle2 className="h-4 w-4 mr-2" /> Verifikasi
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SellerOtpVerification;