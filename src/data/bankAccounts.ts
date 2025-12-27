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
    // If new account is main, set all other accounts for this seller to not main
    mockBankAccounts = mockBankAccounts.map(acc =>
      acc.sellerId === newAccount.sellerId ? { ...acc, isMain: false } : acc
    );
  }
  mockBankAccounts.push(accountWithId);
  return accountWithId;
};

export const updateBankAccount = (updatedAccount: BankAccount) => {
  const index = mockBankAccounts.findIndex(acc => acc.id === updatedAccount.id);
  if (index !== -1) {
    if (updatedAccount.isMain) {
      // If updated account is main, set all other accounts for this seller to not main
      mockBankAccounts = mockBankAccounts.map(acc =>
        acc.sellerId === updatedAccount.sellerId && acc.id !== updatedAccount.id ? { ...acc, isMain: false } : acc
      );
    }
    mockBankAccounts[index] = updatedAccount;
  }
};

export const deleteBankAccount = (accountId: string) => {
  const deletedAccount = mockBankAccounts.find(acc => acc.id === accountId);
  if (!deletedAccount) return;

  mockBankAccounts = mockBankAccounts.filter(acc => acc.id !== accountId);

  // If the main account was deleted, and there are other accounts for this seller,
  // set the first remaining account for that seller as main.
  if (deletedAccount.isMain) {
    const remainingSellerAccounts = mockBankAccounts.filter(acc => acc.sellerId === deletedAccount.sellerId);
    if (remainingSellerAccounts.length > 0 && !remainingSellerAccounts.some(acc => acc.isMain)) {
      remainingSellerAccounts[0].isMain = true;
      // Update the original mockBankAccounts array
      const firstRemainingIndex = mockBankAccounts.findIndex(acc => acc.id === remainingSellerAccounts[0].id);
      if (firstRemainingIndex !== -1) {
        mockBankAccounts[firstRemainingIndex].isMain = true;
      }
    }
  }
};

export const setMainBankAccount = (accountId: string) => {
  const targetAccount = mockBankAccounts.find(acc => acc.id === accountId);
  if (!targetAccount) return;

  mockBankAccounts = mockBankAccounts.map(acc => ({
    ...acc,
    isMain: acc.id === accountId ? true : (acc.sellerId === targetAccount.sellerId ? false : acc.isMain),
  }));
};