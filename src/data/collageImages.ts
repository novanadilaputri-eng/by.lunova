export interface CollageImage {
  id: string;
  imageUrl: string;
  altText: string;
  uploadDate: string;
  sellerId: string; // To link image to a specific seller
}

export let mockCollageImages: CollageImage[] = [
  {
    id: "collage1",
    imageUrl: "https://images.unsplash.com/photo-1581044777550-4cfa607037dc?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    altText: "Blouse Katun Motif Bunga",
    uploadDate: "2024-01-01",
    sellerId: "seller1",
  },
  {
    id: "collage2",
    imageUrl: "https://images.unsplash.com/photo-1571867552700-22329921294c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    altText: "Kemeja Linen Oversize",
    uploadDate: "2024-01-05",
    sellerId: "seller1",
  },
  {
    id: "collage3",
    imageUrl: "https://images.unsplash.com/photo-1607082348824-0a968821957e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    altText: "Tunik Batik Modern",
    uploadDate: "2024-01-10",
    sellerId: "seller1",
  },
  {
    id: "collage4",
    imageUrl: "https://images.unsplash.com/photo-1521572178477-fff92947c229?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    altText: "Kaos Polos Basic",
    uploadDate: "2024-01-15",
    sellerId: "seller1",
  },
  {
    id: "collage5",
    imageUrl: "https://images.unsplash.com/photo-1594633313472-01737179227f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    altText: "Cardigan Rajut Korea",
    uploadDate: "2024-01-20",
    sellerId: "seller1",
  },
];

export const addCollageImage = (newImage: Omit<CollageImage, 'id'>) => {
  const imageWithId: CollageImage = {
    ...newImage,
    id: `collage-${Date.now()}`,
  };
  mockCollageImages.unshift(imageWithId); // Add to the beginning
  return imageWithId;
};

export const updateCollageImage = (updatedImage: CollageImage) => {
  const index = mockCollageImages.findIndex(img => img.id === updatedImage.id);
  if (index !== -1) {
    mockCollageImages[index] = updatedImage;
  }
};

export const deleteCollageImage = (imageId: string) => {
  mockCollageImages = mockCollageImages.filter(img => img.id !== imageId);
};