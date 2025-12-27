import { Product } from "@/types/product";

const PRODUCTS_STORAGE_KEY = "bylunova_products";

const commonDescription = "Kemeja wanita kekinian dengan bahan nyaman, cocok untuk aktivitas santai maupun kerja.";
const commonSizes = ["S", "M", "L", "XL"];
const commonColors = ["BlackWhite", "Peach", "Ocean Blue", "Pastel Green", "Ivory", "Soft Grey", "Soft Purple"];

const colorImageMap = {
  "BlackWhite": "https://images.unsplash.com/photo-1591047139829-f96f700860c6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Black shirt
  "Peach": "https://images.unsplash.com/photo-1581044777550-4cfa607037dc?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Pink/Peach blouse
  "Ocean Blue": "https://images.unsplash.com/photo-1571867552700-22329921294c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Blue shirt
  "Pastel Green": "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Green shirt
  "Ivory": "https://images.unsplash.com/photo-1521572178477-fff92947c229?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // White/Cream shirt
  "Soft Grey": "https://images.unsplash.com/photo-1583743814966-fafea78985f6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Grey shirt
  "Soft Purple": "https://images.unsplash.com/photo-1594633313472-01737179227f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Lavender/Purple top
};

const generateColorImages = (colors: string[]) => {
  return colors.map(color => ({
    color,
    imageUrl: colorImageMap[color as keyof typeof colorImageMap] || "https://via.placeholder.com/400x400?text=No+Image",
  }));
};

// Daftar ID produk yang akan dihapus
const PRODUCTS_TO_REMOVE = ["3", "5"];

const initialProducts: Product[] = [
  {
    id: "1",
    name: "Blouse Katun Motif Bunga",
    category: "Atasan Wanita",
    price: 125000,
    mainImageUrl: "https://images.unsplash.com/photo-1581044777550-4cfa607037dc?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    colorImages: [
      { color: "Putih", imageUrl: "https://images.unsplash.com/photo-1521572178477-fff92947c229?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { color: "Biru", imageUrl: "https://images.unsplash.com/photo-1571867552700-22329921294c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { color: "Pink", imageUrl: "https://images.unsplash.com/photo-1581044777550-4cfa607037dc?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    ],
    description: "Blouse katun lembut dengan motif bunga yang elegan, cocok untuk tampilan kasual maupun semi-formal. Tersedia dalam berbagai ukuran dan warna.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Putih", "Biru", "Pink"],
    stock: 50,
    rating: 4.8,
    reviewsCount: 24,
    storeName: "Fashionista Store",
    storeReputation: "Gold Seller",
    isFeatured: true,
    sellerId: "seller1",
  },
  {
    id: "2",
    name: "Kemeja Linen Oversize",
    category: "Atasan Wanita",
    price: 180000,
    mainImageUrl: "https://images.unsplash.com/photo-1571867552700-22329921294c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    colorImages: [
      { color: "Beige", imageUrl: "https://images.unsplash.com/photo-1521572178477-fff92947c229?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { color: "Hijau Sage", imageUrl: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { color: "Hitam", imageUrl: "https://images.unsplash.com/photo-1591047139829-f96f700860c6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    ],
    description: "Kemeja linen oversize yang nyaman dan stylish, sempurna untuk gaya santai. Bahan adem dan tidak mudah kusut.",
    sizes: ["M", "L", "XL"],
    colors: ["Beige", "Hijau Sage", "Hitam"],
    stock: 30,
    rating: 4.6,
    reviewsCount: 18,
    storeName: "Trendy Threads",
    storeReputation: "Platinum Seller",
    isFeatured: false,
    sellerId: "seller1",
  },
  {
    id: "4",
    name: "Kaos Polos Basic",
    category: "Atasan Wanita",
    price: 75000,
    mainImageUrl: "https://images.unsplash.com/photo-1521572178477-fff92947c229?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    colorImages: [
      { color: "Hitam", imageUrl: "https://images.unsplash.com/photo-1591047139829-f96f700860c6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { color: "Putih", imageUrl: "https://images.unsplash.com/photo-1521572178477-fff92947c229?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { color: "Abu-abu", imageUrl: "https://images.unsplash.com/photo-1583743814966-fafea78985f6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { color: "Navy", imageUrl: "https://images.unsplash.com/photo-1571867552700-22329921294c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    ],
    description: "Kaos polos basic dari bahan katun combed 30s, sangat nyaman dan cocok untuk sehari-hari. Pilihan warna lengkap.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Hitam", "Putih", "Abu-abu", "Navy"],
    stock: 100,
    rating: 4.5,
    reviewsCount: 32,
    storeName: "Daily Wear",
    storeReputation: "Silver Seller",
    isFeatured: false,
    sellerId: "seller1",
  },
  // New products
  {
    id: "6",
    name: "Kemeja Stripe Rempel Feat Body Wanita Atasan",
    category: "Atasan Wanita",
    price: 195000,
    mainImageUrl: "https://images.unsplash.com/photo-1622470000000-000000000000?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    colorImages: generateColorImages(commonColors),
    description: commonDescription,
    sizes: commonSizes,
    colors: commonColors,
    stock: 25,
    rating: 4.7,
    reviewsCount: 15,
    storeName: "By.Lunova Official",
    storeReputation: "New Seller",
    isFeatured: false,
    sellerId: "seller1",
  },
  {
    id: "7",
    name: "Sasha Fitted Shirt",
    category: "Atasan Wanita",
    price: 210000,
    mainImageUrl: "https://images.unsplash.com/photo-1603252109303-275144df1862?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    colorImages: generateColorImages(commonColors),
    description: commonDescription,
    sizes: commonSizes,
    colors: commonColors,
    stock: 20,
    rating: 4.4,
    reviewsCount: 12,
    storeName: "By.Lunova Official",
    storeReputation: "New Seller",
    isFeatured: false,
    sellerId: "seller1",
  },
  {
    id: "8",
    name: "Kemeja Linen Wanita Oversize",
    category: "Atasan Wanita",
    price: 185000,
    mainImageUrl: "https://images.unsplash.com/photo-1571867552700-22329921294c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    colorImages: generateColorImages(commonColors),
    description: commonDescription,
    sizes: commonSizes,
    colors: commonColors,
    stock: 35,
    rating: 4.6,
    reviewsCount: 19,
    storeName: "By.Lunova Official",
    storeReputation: "New Seller",
    isFeatured: false,
    sellerId: "seller1",
  },
  {
    id: "9",
    name: "MSR Elsira Kemeja Wanita Kerja Kantor",
    category: "Atasan Wanita",
    price: 230000,
    mainImageUrl: "https://images.unsplash.com/photo-1591047139829-f96f700860c6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    colorImages: generateColorImages(commonColors),
    description: commonDescription,
    sizes: commonSizes,
    colors: commonColors,
    stock: 15,
    rating: 4.8,
    reviewsCount: 22,
    storeName: "By.Lunova Official",
    storeReputation: "New Seller",
    isFeatured: true,
    sellerId: "seller1",
  },
  {
    id: "10",
    name: "Kemeja Wanita Luna Top",
    category: "Atasan Wanita",
    price: 170000,
    mainImageUrl: "https://images.unsplash.com/photo-1581044777550-4cfa607037dc?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    colorImages: generateColorImages(commonColors),
    description: commonDescription,
    sizes: commonSizes,
    colors: commonColors,
    stock: 40,
    rating: 4.3,
    reviewsCount: 17,
    storeName: "By.Lunova Official",
    storeReputation: "New Seller",
    isFeatured: false,
    sellerId: "seller1",
  },
  {
    id: "11",
    name: "Mochi Shirt Kemeja Wanita",
    category: "Atasan Wanita",
    price: 160000,
    mainImageUrl: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    colorImages: generateColorImages(commonColors),
    description: commonDescription,
    sizes: commonSizes,
    colors: commonColors,
    stock: 30,
    rating: 4.5,
    reviewsCount: 14,
    storeName: "By.Lunova Official",
    storeReputation: "New Seller",
    isFeatured: false,
    sellerId: "seller1",
  },
  {
    id: "12",
    name: "Denim Shirt Julia",
    category: "Atasan Wanita",
    price: 240000,
    mainImageUrl: "https://images.unsplash.com/photo-1543087900-a4536600639b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    colorImages: generateColorImages(commonColors),
    description: commonDescription,
    sizes: commonSizes,
    colors: commonColors,
    stock: 20,
    rating: 4.7,
    reviewsCount: 20,
    storeName: "By.Lunova Official",
    storeReputation: "New Seller",
    isFeatured: false,
    sellerId: "seller1",
  },
];

// Helper to load data from localStorage
const loadProducts = (): Product[] => {
  if (typeof window !== "undefined") {
    const storedProducts = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    if (storedProducts) {
      try {
        const parsedProducts = JSON.parse(storedProducts);
        // Filter out products that should be removed
        return parsedProducts.filter((p: Product) => !PRODUCTS_TO_REMOVE.includes(p.id));
      } catch (e) {
        console.error("Error parsing stored products, using initial products", e);
      }
    }
  }
  return initialProducts;
};

// Helper to save data to localStorage
const saveProducts = (currentProducts: Product[]) => {
  if (typeof window !== "undefined") {
    // Filter out products that should be removed sebelum menyimpan
    const filteredProducts = currentProducts.filter(p => !PRODUCTS_TO_REMOVE.includes(p.id));
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(filteredProducts));
  }
};

// Bersihkan produk yang dihapus dari localStorage jika ada
if (typeof window !== "undefined") {
  const storedProducts = localStorage.getItem(PRODUCTS_STORAGE_KEY);
  if (storedProducts) {
    try {
      const parsedProducts = JSON.parse(storedProducts);
      const filteredProducts = parsedProducts.filter((p: Product) => !PRODUCTS_TO_REMOVE.includes(p.id));
      if (filteredProducts.length !== parsedProducts.length) {
        localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(filteredProducts));
        console.log("Removed old products from localStorage");
      }
    } catch (e) {
      console.error("Error cleaning stored products", e);
    }
  }
}

export let products: Product[] = loadProducts();

export const addProduct = (newProduct: Omit<Product, 'id' | 'rating' | 'reviewsCount' | 'storeName' | 'storeReputation'>) => {
  const productWithDefaults: Product = {
    ...newProduct,
    id: `prod-${Date.now()}`,
    rating: 0,
    reviewsCount: 0,
    storeName: "By.Lunova Official", // Default for new products
    storeReputation: "New Seller", // Default for new products
    isFeatured: false, // Default to not featured
  };
  products.push(productWithDefaults);
  saveProducts(products);
  console.log("Produk baru ditambahkan:", productWithDefaults); // Debug log
  return productWithDefaults;
};

export const updateProduct = (updatedProduct: Product) => {
  const index = products.findIndex(p => p.id === updatedProduct.id);
  if (index !== -1) {
    products[index] = updatedProduct;
    saveProducts(products);
  }
};

export const deleteProduct = (productId: string) => {
  products = products.filter(p => p.id !== productId);
  saveProducts(products);
};

export const reduceProductStock = (productId: string, quantity: number) => {
  const productIndex = products.findIndex(p => p.id === productId);
  if (productIndex !== -1) {
    products[productIndex].stock = Math.max(0, products[productIndex].stock - quantity);
    saveProducts(products);
    console.log(`Stok produk ${productId} berkurang menjadi ${products[productIndex].stock}`);
  }
};

export const updateProductStats = (productId: string, newRating: number, newReviewsCount: number) => {
  const productIndex = products.findIndex(p => p.id === productId);
  if (productIndex !== -1) {
    products[productIndex].rating = newRating;
    products[productIndex].reviewsCount = newReviewsCount;
    saveProducts(products);
    console.log(`Product ${productId} stats updated: Rating ${newRating}, Reviews ${newReviewsCount}`);
  }
};

// Fungsi untuk mendapatkan produk berdasarkan sellerId
export const getSellerProducts = (sellerId: string) => {
  return products.filter(p => p.sellerId === sellerId);
};