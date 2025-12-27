import { Promotion } from "@/types/promotion";

const PROMOTIONS_STORAGE_KEY = "bylunova_promotions";

const initialPromotions: Promotion[] = [
  {
    id: "promo1",
    title: "Diskon Spesial Awal Bulan!",
    message: "Dapatkan diskon 20% untuk semua atasan wanita. Berlaku hingga akhir minggu ini!",
    imageUrl: "https://images.unsplash.com/photo-1581044777550-4cfa607037dc?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isActive: true,
    startDate: "2024-01-01",
    endDate: "2024-01-31",
    sellerId: "By.Lunova Official", // Example seller ID
  },
  {
    id: "promo2",
    title: "Gratis Ongkir Seluruh Indonesia",
    message: "Nikmati gratis ongkir tanpa minimum pembelian untuk semua produk!",
    imageUrl: "https://images.unsplash.com/photo-1607082348824-0a968821957e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isActive: true,
    startDate: "2024-01-10",
    endDate: "2024-02-10",
    sellerId: "By.Lunova Official",
  },
  {
    id: "promo3",
    title: "Flash Sale Tunik Batik",
    message: "Diskon 30% untuk Tunik Batik Modern. Stok terbatas!",
    imageUrl: "https://images.unsplash.com/photo-1607082348824-0a968821957e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isActive: false, // Inactive promotion
    startDate: "2023-12-01",
    endDate: "2023-12-07",
    sellerId: "Batik Nusantara",
  },
];

// Helper to load data from localStorage
const loadPromotions = (): Promotion[] => {
  if (typeof window !== "undefined") {
    const storedPromotions = localStorage.getItem(PROMOTIONS_STORAGE_KEY);
    if (storedPromotions) {
      return JSON.parse(storedPromotions);
    }
  }
  return initialPromotions;
};

// Helper to save data to localStorage
const savePromotions = (currentPromotions: Promotion[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(PROMOTIONS_STORAGE_KEY, JSON.stringify(currentPromotions));
  }
};

export let mockPromotions: Promotion[] = loadPromotions();

export const addPromotion = (newPromotion: Omit<Promotion, 'id'>) => {
  const promotionWithId: Promotion = {
    ...newPromotion,
    id: `promo-${Date.now()}`,
  };
  mockPromotions.push(promotionWithId);
  savePromotions(mockPromotions);
  return promotionWithId;
};

export const updatePromotion = (updatedPromotion: Promotion) => {
  const index = mockPromotions.findIndex(p => p.id === updatedPromotion.id);
  if (index !== -1) {
    mockPromotions[index] = updatedPromotion;
    savePromotions(mockPromotions);
  }
};

export const deletePromotion = (promotionId: string) => {
  mockPromotions = mockPromotions.filter(p => p.id !== promotionId);
  savePromotions(mockPromotions);
};