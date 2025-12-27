"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Banknote, PlusCircle, Edit, Trash2, CheckCircle } from "lucide-react";
import { showSuccess, showError } from "@/utils/toast";
import { BankAccount } from "@/types/bankAccount";
import { mockBankAccounts, addBankAccount, updateBankAccount, deleteBankAccount, setMainBankAccount } from "@/data/bankAccounts";

interface SellerBankAccountManagementProps {
  sellerId: string;
}

const SellerBankAccountManagement: React.FC<SellerBankAccountManagementProps> = ({ sellerId }) => {
  const [accounts, setAccounts] = useState<BankAccount[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<BankAccount | null>(null);

  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountHolderName, setAccountHolderName] = useState("");
  const [isMain, setIsMain] = useState(false);

  useEffect(() => {
    // Filter accounts for the current seller
    setAccounts(mockBankAccounts.filter(acc => acc.sellerId === sellerId));
  }, [sellerId, mockBankAccounts]); // Re-run when mockBankAccounts changes

  useEffect(() => {
    if (editingAccount) {
      setBankName(editingAccount.bankName);
      setAccountNumber(editingAccount.accountNumber);
      setAccountHolderName(editingAccount.accountHolderName);
      setIsMain(editingAccount.isMain);
    } else {
      // Reset form for new account
      setBankName("");
      setAccountNumber("");
      setAccountHolderName("");
      setIsMain(accounts.length === 0); // First account is main by default
    }
  }, [editingAccount, isFormOpen, accounts.length]);

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
      const updated: BankAccount = { ...editingAccount, ...newOrUpdatedAccount };
      updateBankAccount(updated);
      showSuccess("Rekening bank berhasil diperbarui!");
    } else {
      addBankAccount(newOrUpdatedAccount);
      showSuccess("Rekening bank baru berhasil ditambahkan!");
    }
    setAccounts([...mockBankAccounts.filter(acc => acc.sellerId === sellerId)]); // Update local state
    handleCloseForm();
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus rekening bank ini?")) {
      deleteBankAccount(id);
      setAccounts([...mockBankAccounts.filter(acc => acc.sellerId === sellerId)]);
      showSuccess("Rekening bank berhasil dihapus.");
    }
  };

  const handleSetMain = (id: string) => {
    setMainBankAccount(id);
    setAccounts([...mockBankAccounts.filter(acc => acc.sellerId === sellerId)]);
    showSuccess("Rekening utama berhasil diubah.");
  };

  const currentMainAccount = accounts.find(acc => acc.isMain);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between border-b pb-4 mb-4 border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-playfair font-bold text-gray-900 dark:text-gray-100">Rekening Bank Saya</h2>
        {!currentMainAccount && ( // Only allow adding if no main account exists
          <Button onClick={() => handleOpenForm()} className="bg-soft-pink hover:bg-rose-600 text-white font-poppins">
            <PlusCircle className="h-4 w-4 mr-2" /> Tambah Rekening
          </Button>
        )}
      </div>

      {accounts.length === 0 ? (
        <div className="text-center py-8">
          <Banknote className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-lg text-gray-600 font-poppins dark:text-gray-400">Anda belum menambahkan rekening bank.</p>
          <Button onClick={() => handleOpenForm()} className="mt-4 bg-soft-pink hover:bg-rose-600 text-white font-poppins">
            <PlusCircle className="h-4 w-4 mr-2" /> Tambah Rekening Bank
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {accounts.map((account) => (
            <div key={account.id} className={`border p-4 rounded-lg relative ${account.isMain ? "bg-beige dark:bg-gray-700 border-soft-pink" : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"}`}>
              {account.isMain && (
                <span className="absolute top-2 right-2 bg-soft-pink text-white text-xs px-2 py-1 rounded-full font-poppins">Utama</span>
              )}
              <p className="font-poppins font-semibold text-gray-800 dark:text-gray-200">{account.bankName}</p>
              <p className="text-gray-700 dark:text-gray-300">No. Rekening: {account.accountNumber}</p>
              <p className="text-gray-700 dark:text-gray-300">Atas Nama: {account.accountHolderName}</p>
              <div className="flex space-x-2 mt-3">
                <Button variant="outline" size="sm" onClick={() => handleOpenForm(account)} className="border-gold-rose text-gold-rose hover:bg-gold-rose hover:text-white font-poppins dark:border-gold-rose dark:text-gold-rose dark:hover:bg-gold-rose dark:hover:text-white">
                  <Edit className="h-4 w-4 mr-1" /> Edit
                </Button>
                {!account.isMain && (
                  <Button variant="outline" size="sm" onClick={() => handleSetMain(account.id)} className="border-soft-pink text-soft-pink hover:bg-soft-pink hover:text-white font-poppins dark:border-soft-pink dark:text-soft-pink dark:hover:bg-soft-pink dark:hover:text-white">
                    <CheckCircle className="h-4 w-4 mr-1" /> Atur Utama
                  </Button>
                )}
                <Button variant="destructive" size="sm" onClick={() => handleDelete(account.id)} className="font-poppins">
                  <Trash2 className="h-4 w-4 mr-1" /> Hapus
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bank Account Form Dialog */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-playfair font-bold text-gray-900 dark:text-gray-100 mb-4">
              {editingAccount ? "Edit Rekening Bank" : "Tambah Rekening Bank Baru"}
            </h3>
            <p className="font-poppins text-gray-600 dark:text-gray-400 mb-4">
              Lengkapi detail rekening bank Anda.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="bankName" className="font-poppins text-gray-800 dark:text-gray-200">Nama Bank</Label>
                <Select value={bankName} onValueChange={setBankName}>
                  <SelectTrigger id="bankName" className="w-full mt-1 border-soft-pink focus:ring-soft-pink dark:bg-gray-700 dark:text-gray-100 dark:border-gold-rose">
                    <SelectValue placeholder="Pilih Bank" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-800 dark:text-gray-100 dark:border-gold-rose">
                    <SelectItem value="BCA">BCA</SelectItem>
                    <SelectItem value="Mandiri">Mandiri</SelectItem>
                    <SelectItem value="BRI">BRI</SelectItem>
                    <SelectItem value="BNI">BNI</SelectItem>
                    <SelectItem value="CIMB Niaga">CIMB Niaga</SelectItem>
                    <SelectItem value="Permata Bank">Permata Bank</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="accountNumber" className="font-poppins text-gray-800 dark:text-gray-200">Nomor Rekening</Label>
                <Input id="accountNumber" type="text" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} className="mt-1 border-soft-pink focus:ring-soft-pink font-poppins dark:bg-gray-700 dark:text-gray-100 dark:border-gold-rose" required />
              </div>
              <div>
                <Label htmlFor="accountHolderName" className="font-poppins text-gray-800 dark:text-gray-200">Nama Pemilik Rekening</Label>
                <Input id="accountHolderName" type="text" value={accountHolderName} onChange={(e) => setAccountHolderName(e.target.value)} className="mt-1 border-soft-pink focus:ring-soft-pink font-poppins dark:bg-gray-700 dark:text-gray-100 dark:border-gold-rose" required />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="isMainAccount" checked={isMain} onCheckedChange={(checked: boolean) => setIsMain(checked)} className="border-soft-pink data-[state=checked]:bg-soft-pink data-[state=checked]:text-white" />
                <Label htmlFor="isMainAccount" className="font-poppins text-gray-800 dark:text-gray-200">Atur sebagai Rekening Utama</Label>
              </div>
              <div className="flex justify-end space-x-2 mt-6">
                <Button type="button" variant="outline" onClick={handleCloseForm} className="border-gray-300 text-gray-700 hover:bg-gray-100 font-poppins dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700">
                  Batal
                </Button>
                <Button type="submit" className="bg-soft-pink hover:bg-rose-600 text-white font-poppins">
                  {editingAccount ? "Simpan Perubahan" : "Tambah Rekening"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerBankAccountManagement;