export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export const reviews: Review[] = [
  {
    id: "rev1",
    productId: "1",
    userName: "Anna Wijaya",
    rating: 5,
    comment: "Blouse-nya cantik banget, motif bunganya elegan dan bahannya adem. Suka!",
    date: "2023-10-26",
  },
  {
    id: "rev2",
    productId: "1",
    userName: "Budi Santoso",
    rating: 4,
    comment: "Kualitas bagus, sesuai harga. Pengiriman cepat.",
    date: "2023-10-20",
  },
  {
    id: "rev3",
    productId: "2",
    userName: "Citra Dewi",
    rating: 5,
    comment: "Kemeja linen oversize ini nyaman banget buat sehari-hari. Warnanya juga kalem.",
    date: "2023-11-01",
  },
  {
    id: "rev4",
    productId: "3",
    userName: "Dewi Lestari",
    rating: 4,
    comment: "Tunik batiknya modern, cocok buat acara kantor. Sedikit kebesaran di saya.",
    date: "2023-09-15",
  },
  {
    id: "rev5",
    productId: "4",
    userName: "Eka Putra",
    rating: 5,
    comment: "Kaos polos basic yang wajib punya! Bahannya lembut dan tidak panas.",
    date: "2023-12-05",
  },
  {
    id: "rev6",
    productId: "5",
    userName: "Fani Amelia",
    rating: 4,
    comment: "Cardigan rajutnya lucu, tapi agak tipis. Cocok buat cuaca tidak terlalu dingin.",
    date: "2023-11-10",
  },
];