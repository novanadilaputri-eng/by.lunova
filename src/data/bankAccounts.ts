import { BankAccount } from "@/types/bankAccount";

export let mockBankAccounts: BankAccount[] = [
  {
    id: "bank1",
    sellerId: "seller1", // Assuming a seller ID
    bankName: "BCA",
    accountNumber: "1234567890",
    accountHolderName: "PT By.Lunova Indonesia",
    isMain: true,
  },
  {
    id: "bank2",
    sellerId: "seller1",
    bankName: "Mandiri",
    accountNumber: "0987654321",
    accountHolderName: "PT By.Lunova Indonesia",
    isMain: false,
  },
];

export const addBankAccount = (newAccount: Omit<BankAccount, 'id'>) => {
  const accountWithId: BankAccount = {
    ...newAccount,
    id: `bank-${Date.now()}`,
  };
  if (accountWithId.isMain) {
    mockBankAccounts = mockBankAccounts.map(acc => ({ ...acc, isMain: false }));
  }
  mockBankAccounts.push(accountWithId);
  return accountWithId;
};

export const updateBankAccount = (updatedAccount: BankAccount) => {
  const index = mockBankAccounts.findIndex(acc => acc.id === updatedAccount.id);
  if (index !== -1) {
    if (updatedAccount.isMain) {
      mockBankAccounts = mockBankAccounts.map(acc => ({ ...acc, isMain: false }));
    }
    mockBankAccounts[index] = updatedAccount;
  }
};

export const deleteBankAccount = (accountId: string) => {
  mockBankAccounts = mockBankAccounts.filter(acc => acc.id !== accountId);
  // If the main account was deleted, set the first remaining account as main
  if (mockBankAccounts.length > 0 && !mockBankAccounts.some(acc => acc.isMain)) {
    mockBankAccounts[0].isMain = true;
  }
};

export const setMainBankAccount = (accountId: string) => {
  mockBankAccounts = mockBankAccounts.map(acc => ({
    ...acc,
    isMain: acc.id === accountId,
  }));
};