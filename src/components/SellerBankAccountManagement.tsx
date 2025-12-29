"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { BankAccount } from "@/types/bankAccount";
import { mockBankAccounts, addBankAccount, updateBankAccount, deleteBankAccount, setMainBankAccount } from "@/data/bankAccounts";
import { showSuccess, showError } from "@/utils/toast";
import { PlusCircle, Edit, Trash2, CheckCircle, Banknote } from "lucide-react";

interface SellerBankAccountManagementProps {
  sellerId: string;
}

const SellerBankAccountManagement: React.FC<SellerBankAccountManagementProps> = ({ sellerId }) => {
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<BankAccount | null>(null);
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountHolderName, setAccountHolderName] = useState("");
  const [isMain, setIsMain] = useState(false);

  useEffect(() => {
    setBankAccounts(mockBankAccounts.filter(acc => acc.sellerId === sellerId));
  }, [sellerId, mockBankAccounts]);

  useEffect(() => {
    if (editingAccount) {
      setBankName(editingAccount.bankName);
      setAccountNumber(editingAccount.accountNumber);
      setAccountHolderName(editingAccount.accountHolderName);
      setIsMain(editingAccount.isMain);
    } else {
      setBankName("");
      setAccountNumber("");
      setAccountHolderName("");
      setIsMain(false);
    }
  }, [editingAccount, isFormOpen]);

  const handleOpenForm = (account: BankAccount | null = null) => {
    setEditingAccount(account);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingAccount(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bankName || !accountNumber || !accountHolderName) {
      showError("Mohon lengkapi semua bidang wajib.");
      return;
    }
    const newOrUpdatedAccount: Omit<BankAccount, 'id'> = {
      sellerId,
      bankName,
      accountNumber,
      accountHolderName,
      isMain,
    };
    if (editingAccount) {
      const updated: BankAccount = {
        ...editingAccount,
        ...newOrUpdatedAccount,
      };
      updateBankAccount(updated);
      showSuccess("Rekening bank berhasil diperbarui!");
    } else {
      addBankAccount(newOrUpdatedAccount);
      showSuccess("Rekening bank baru berhasil ditambahkan!");
    }
    handleCloseForm();
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus rekening bank ini?")) {
      deleteBankAccount(id);
      showSuccess("Rekening bank berhasil dihapus.");
    }
  };

  const handleSetMain = (id: string) => {
    setMainBankAccount(id);
    showSuccess("Rekening bank utama berhasil diubah.");
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between border-b pb-4 mb-4 border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-playfair font-bold text-gray-900 dark:text-gray-100">Rekening Bank Saya</h2>
        <Button onClick={() => handleOpenForm()} className="bg-soft-pink hover:bg-rose-600 text-white font-poppins">
          <PlusCircle className="h-4 w-4 mr-2" />
          Tambah Rekening
        </Button>
      </div>
      {bankAccounts.length === 0 ? (
        <div className="text-center py-8">
          <Banknote className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-lg text-gray-600 font-poppins dark:text-gray-400">Anda belum menambahkan rekening bank.</p>
          <Button onClick={() => handleOpenForm()} className="mt-4 bg-soft-pink hover:bg-rose-600 text-white font-poppins">
            <PlusCircle className="h-4 w-4 mr-2" />
            Tambah Rekening Bank
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {bankAccounts.map((account) => (
            <div key={account.id} className={`border p-4 rounded-lg relative ${account.isMain ? "bg-beige dark:bg-gray-700 border-soft-pink" : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"}`}>
              {account.isMain && (
                <span className="absolute top-2 right-2 bg-soft-pink text-white text-xs px-2 py-1 rounded-full font-poppins">Utama</span>
              )}
              <p className="font-poppins font-semibold text-gray-800 dark:text-gray-200">{account.bankName}</p>
              <p className="text-gray-700 dark:text-gray-300">No. Rekening: {account.accountNumber}</p>
              <p className="text-gray-700 dark:text-gray-300">Atas Nama: {account.accountHolderName}</p>
              <div className="flex space-x-2 mt-3">
                <Button variant="outline" size="sm" onClick={() => handleOpenForm(account)} className="border-gold-rose text-gold-rose hover:bg-gold-rose hover:text-white font-poppins dark:border-gold-rose dark:text-gold-rose dark:hover:bg-gold-rose dark:hover:text-white">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                {!account.isMain && (
                  <Button variant="outline" size="sm" onClick={() => handleSetMain(account.id)} className="border-soft-pink text-soft-pink hover:bg-soft-pink hover:text-white font-poppins dark:border-soft-pink dark:text-soft-pink dark:hover:bg-soft-pink dark:hover:text-white">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Atur Utama
                  </Button>
                )}
                <Button variant="destructive" size="sm" onClick={() => handleDelete(account.id)} className="font-poppins">
                  <Trash2 className="h-4 w-4 mr-1" />
                  Hapus
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[500px] bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <DialogHeader>
            <DialogTitle className="font-playfair">{editingAccount ? "Edit Rekening Bank" : "Tambah Rekening Bank Baru"}</DialogTitle>
            <DialogDescription className="font-poppins text-gray-600 dark:text-gray-400">
              Lengkapi detail rekening bank Anda.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bankName" className="text-right font-poppins text-gray-800 dark:text-gray-200">Nama Bank</Label>
              <Select value={bankName} onValueChange={setBankName}>
                <SelectTrigger id="bankName" className="col-span-3 font-poppins border-soft-pink focus:ring-soft-pink dark:bg-gray-700 dark:text-gray-100 dark:border-gold-rose">
                  <SelectValue placeholder="Pilih Bank" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-800 dark:text-gray-100 dark:border-gold-rose">
                  <SelectItem value="BCA">BCA</SelectItem>
                  <SelectItem value="Mandiri">Mandiri</SelectItem>
                  <SelectItem value="BRI">BRI</SelectItem>
                  <SelectItem value="BNI">BNI</SelectItem>
                  <SelectItem value="CIMB Niaga">CIMB Niaga</SelectItem>
                  <SelectItem value="Permata Bank">Permata Bank</SelectItem>
                  <SelectItem value="Dana">Dana (E-Wallet)</SelectItem>
                  <SelectItem value="Bank BTN">Bank BTN</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="accountNumber" className="text-right font-poppins text-gray-800 dark:text-gray-200">Nomor Rekening</Label>
              <Input 
                id="accountNumber" 
                value={accountNumber} 
                onChange={(e) => setAccountNumber(e.target.value)} 
                className="col-span-3 font-poppins border-soft-pink focus:ring-soft-pink dark:bg-gray-700 dark:text-gray-100 dark:border-gold-rose" 
                required 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="accountHolderName" className="text-right font-poppins text-gray-800 dark:text-gray-200">Nama Pemilik</Label>
              <Input 
                id="accountHolderName" 
                value={accountHolderName} 
                onChange={(e) => setAccountHolderName(e.target.value)} 
                className="col-span-3 font-poppins border-soft-pink focus:ring-soft-pink dark:bg-gray-700 dark:text-gray-100 dark:border-gold-rose" 
                required 
              />
            </div>
            <DialogFooter className="col-span-4 mt-4">
              <Button type="submit" className="bg-soft-pink hover:bg-rose-600 text-white font-poppins">
                {editingAccount ? "Simpan Perubahan" : "Tambah Rekening"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SellerBankAccountManagement;