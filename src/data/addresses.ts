import { Address } from "@/types/address";

const ADDRESSES_STORAGE_KEY = "bylunova_addresses";

// Inisialisasi dengan array kosong
export let mockAddresses: Address[] = [];

// Helper to load data from localStorage
const loadAddresses = (): Address[] => {
  if (typeof window !== "undefined") {
    const storedAddresses = localStorage.getItem(ADDRESSES_STORAGE_KEY);
    if (storedAddresses) {
      return JSON.parse(storedAddresses);
    }
  }
  return mockAddresses; // Use initial mock data if nothing in localStorage
};

// Helper to save data to localStorage
const saveAddresses = (currentAddresses: Address[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(ADDRESSES_STORAGE_KEY, JSON.stringify(currentAddresses));
  }
};

// Initialize mockAddresses from localStorage or initial data
mockAddresses = loadAddresses();

export const addAddress = (newAddress: Omit<Address, 'id'>) => {
  const addressWithId: Address = {
    ...newAddress,
    id: `addr-${Date.now()}`,
  };
  if (addressWithId.isMain) {
    mockAddresses = mockAddresses.map(addr => ({ ...addr, isMain: false }));
  }
  mockAddresses.push(addressWithId);
  saveAddresses(mockAddresses);
  return addressWithId;
};

export const updateAddress = (updatedAddress: Address) => {
  const index = mockAddresses.findIndex(addr => addr.id === updatedAddress.id);
  if (index !== -1) {
    if (updatedAddress.isMain) {
      mockAddresses = mockAddresses.map(addr => ({ ...addr, isMain: false }));
    }
    mockAddresses[index] = updatedAddress;
    saveAddresses(mockAddresses);
  }
};

export const deleteAddress = (addressId: string) => {
  mockAddresses = mockAddresses.filter(addr => addr.id !== addressId);
  // If the main address was deleted, set the first remaining address as main
  if (mockAddresses.length > 0 && !mockAddresses.some(addr => addr.isMain)) {
    mockAddresses[0].isMain = true;
  }
  saveAddresses(mockAddresses);
};

export const setMainAddress = (addressId: string) => {
  mockAddresses = mockAddresses.map(addr => ({
    ...addr,
    isMain: addr.id === addressId,
  }));
  saveAddresses(mockAddresses);
};