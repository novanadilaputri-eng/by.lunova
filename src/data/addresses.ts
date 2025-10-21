import { Address } from "@/types/address";

export let mockAddresses: Address[] = [
  {
    id: "addr1",
    recipientName: "Jane Doe",
    phoneNumber: "081234567890",
    fullAddress: "Jl. Contoh No. 123, RT 01/RW 02, Kel. Menteng, Kec. Menteng",
    city: "Jakarta Pusat",
    province: "DKI Jakarta",
    postalCode: "10310",
    latitude: -6.175392,
    longitude: 106.827153,
    isMain: true,
  },
  {
    id: "addr2",
    recipientName: "Jane Doe",
    phoneNumber: "081298765432",
    fullAddress: "Gedung Perkantoran, Lt. 5, Jl. Sudirman No. 45",
    city: "Jakarta Selatan",
    province: "DKI Jakarta",
    postalCode: "12190",
    latitude: -6.222222,
    longitude: 106.808889,
    isMain: false,
  },
];

export const addAddress = (newAddress: Omit<Address, 'id'>) => {
  const addressWithId: Address = {
    ...newAddress,
    id: `addr-${Date.now()}`,
  };
  if (addressWithId.isMain) {
    mockAddresses = mockAddresses.map(addr => ({ ...addr, isMain: false }));
  }
  mockAddresses.push(addressWithId);
  return addressWithId;
};

export const updateAddress = (updatedAddress: Address) => {
  const index = mockAddresses.findIndex(addr => addr.id === updatedAddress.id);
  if (index !== -1) {
    if (updatedAddress.isMain) {
      mockAddresses = mockAddresses.map(addr => ({ ...addr, isMain: false }));
    }
    mockAddresses[index] = updatedAddress;
  }
};

export const deleteAddress = (addressId: string) => {
  mockAddresses = mockAddresses.filter(addr => addr.id !== addressId);
  // If the main address was deleted, set the first remaining address as main
  if (mockAddresses.length > 0 && !mockAddresses.some(addr => addr.isMain)) {
    mockAddresses[0].isMain = true;
  }
};

export const setMainAddress = (addressId: string) => {
  mockAddresses = mockAddresses.map(addr => ({
    ...addr,
    isMain: addr.id === addressId,
  }));
};