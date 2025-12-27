import { BankAccount } from "@/types/bankAccount";

const BANK_ACCOUNTS_STORAGE_KEY = "bylunova_bank_accounts";

const initialBankAccounts: BankAccount[] = [
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

// Helper to load data from localStorage
const loadBankAccounts = (): BankAccount[] => {
  if (typeof window !== "undefined") {
    const storedAccounts = localStorage.getItem(BANK_ACCOUNTS_STORAGE_KEY);
    if (storedAccounts) {
      return JSON.parse(storedAccounts);
    }
  }
  return initialBankAccounts;
};

// Helper to save data to localStorage
const saveBankAccounts = (currentAccounts: BankAccount[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(BANK_ACCOUNTS_STORAGE_KEY, JSON.stringify(currentAccounts));
  }
};

export let mockBankAccounts: BankAccount[] = loadBankAccounts();

export const addBankAccount = (newAccount: Omit<BankAccount, 'id'>) => {
  const accountWithId: BankAccount = {
    ...newAccount,
    id: `bank-${Date.now()}`,
  };
  if (accountWithId.isMain) {
    mockBankAccounts = mockBankAccounts.map(acc => ({ ...acc, isMain: false }));
  }
  mockBankAccounts.push(accountWithId);
  saveBankAccounts(mockBankAccounts);
  return accountWithId;
};

export const updateBankAccount = (updatedAccount: BankAccount) => {
  const index = mockBankAccounts.findIndex(acc => acc.id === updatedAccount.id);
  if (index !== -1) {
    if (updatedAccount.isMain) {
      mockBankAccounts = mockBankAccounts.map(acc => ({ ...acc, isMain: false }));
    }
    mockBankAccounts[index] = updatedAccount;
    saveBankAccounts(mockBankAccounts);
  }
};

export const deleteBankAccount = (accountId: string) => {
  mockBankAccounts = mockBankAccounts.filter(acc => acc.id !== accountId);
  // If the main account was deleted, set the first remaining account as main
  if (mockBankAccounts.length > 0 && !mockBankAccounts.some(acc => acc.isMain)) {
    mockBankAccounts[0].isMain = true;
  }
  saveBankAccounts(mockBankAccounts);
};

export const setMainBankAccount = (accountId: string) => {
  mockBankAccounts = mockBankAccounts.map(acc => ({
    ...acc,
    isMain: acc.id === accountId,
  }));
  saveBankAccounts(mockBankAccounts);
};