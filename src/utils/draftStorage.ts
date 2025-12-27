// File untuk menyimpan dan memuat draft produk secara lokal

const DRAFT_STORAGE_KEY = "product_draft";

export interface ProductDraft {
  id?: string;
  name: string;
  description: string;
  price: number | string;
  stock: number | string;
  category: string;
  mainImageUrl: string;
  colors: string[];
  sizes: string[];
  colorImages: { color: string; imageUrl: string }[];
  isFeatured: boolean;
}

// Menyimpan draft ke localStorage
export const saveProductDraft = (draft: ProductDraft): void => {
  try {
    localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
  } catch (error) {
    console.error("Gagal menyimpan draft produk:", error);
  }
};

// Memuat draft dari localStorage
export const loadProductDraft = (): ProductDraft | null => {
  try {
    const draft = localStorage.getItem(DRAFT_STORAGE_KEY);
    return draft ? JSON.parse(draft) : null;
  } catch (error) {
    console.error("Gagal memuat draft produk:", error);
    return null;
  }
};

// Menghapus draft dari localStorage
export const clearProductDraft = (): void => {
  try {
    localStorage.removeItem(DRAFT_STORAGE_KEY);
  } catch (error) {
    console.error("Gagal menghapus draft produk:", error);
  }
};