export interface CollagePhoto {
  id: string;
  imageUrl: string;
  altText: string;
  productId?: string; // Optional: link to a specific product
  sellerId: string; // To restrict editing to sellers
}

export let mockCollagePhotos: CollagePhoto[] = [
  {
    id: "collage1",
    imageUrl: "https://images.unsplash.com/photo-1581044777550-4cfa607037dc?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    altText: "Blouse Katun Motif Bunga",
    productId: "1",
    sellerId: "seller1",
  },
  {
    id: "collage2",
    imageUrl: "https://images.unsplash.com/photo-1571867552700-22329921294c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    altText: "Kemeja Linen Oversize",
    productId: "2",
    sellerId: "seller1",
  },
  {
    id: "collage3",
    imageUrl: "https://images.unsplash.com/photo-1607082348824-0a968821957e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    altText: "Tunik Batik Modern",
    productId: "3",
    sellerId: "seller1",
  },
  {
    id: "collage4",
    imageUrl: "https://images.unsplash.com/photo-1521572178477-fff92947c229?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    altText: "Kaos Polos Basic",
    productId: "4",
    sellerId: "seller1",
  },
  {
    id: "collage5",
    imageUrl: "https://images.unsplash.com/photo-1594633313472-01737179227f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    altText: "Cardigan Rajut Korea",
    productId: "5",
    sellerId: "seller1",
  },
];

export const addCollagePhoto = (newPhoto: Omit<CollagePhoto, 'id'>) => {
  const photoWithId: CollagePhoto = {
    ...newPhoto,
    id: `collage-${Date.now()}`,
  };
  mockCollagePhotos.unshift(photoWithId); // Add to the beginning
  return photoWithId;
};

export const updateCollagePhoto = (updatedPhoto: CollagePhoto) => {
  const index = mockCollagePhotos.findIndex(p => p.id === updatedPhoto.id);
  if (index !== -1) {
    mockCollagePhotos[index] = updatedPhoto;
  }
};

export const deleteCollagePhoto = (photoId: string) => {
  mockCollagePhotos = mockCollagePhotos.filter(p => p.id !== photoId);
};