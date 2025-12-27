export interface Video {
  id: string;
  title: string;
  thumbnailUrl: string;
  videoUrl: string; // Placeholder for actual video URL
  sellerName: string;
  views: number;
  uploadDate: string;
}

const VIDEOS_STORAGE_KEY = "bylunova_videos";

const initialVideos: Video[] = [
  {
    id: "vid1",
    title: "Review Blouse Katun Motif Bunga Terbaru!",
    thumbnailUrl: "https://images.unsplash.com/photo-1581044777550-4cfa607037dc?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Example YouTube embed
    sellerName: "Fashionista Store",
    views: 1500,
    uploadDate: "2023-11-01",
  },
  {
    id: "vid2",
    title: "Mix & Match Kemeja Linen Oversize untuk Daily Outfit",
    thumbnailUrl: "https://images.unsplash.com/photo-1571867552700-22329921294c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    sellerName: "Trendy Threads",
    views: 2300,
    uploadDate: "2023-10-25",
  },
  {
    id: "vid3",
    title: "Tunik Batik Modern: Elegan dan Nyaman",
    thumbnailUrl: "https://images.unsplash.com/photo-1607082348824-0a968821957e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    sellerName: "Batik Nusantara",
    views: 980,
    uploadDate: "2023-11-15",
  },
  {
    id: "vid4",
    title: "Basic T-Shirt Must-Haves for Your Wardrobe",
    thumbnailUrl: "https://images.unsplash.com/photo-1521572178477-fff92947c229?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    sellerName: "Daily Wear",
    views: 3100,
    uploadDate: "2023-12-01",
  },
  {
    id: "vid5",
    title: "Cardigan Rajut Korea: Tampil Stylish di Musim Dingin",
    thumbnailUrl: "https://images.unsplash.com/photo-1594633313472-01737179227f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    sellerName: "K-Fashion Hub",
    views: 1800,
    uploadDate: "2023-11-20",
  },
];

// Helper to load data from localStorage
const loadVideos = (): Video[] => {
  if (typeof window !== "undefined") {
    const storedVideos = localStorage.getItem(VIDEOS_STORAGE_KEY);
    if (storedVideos) {
      return JSON.parse(storedVideos);
    }
  }
  return initialVideos;
};

// Helper to save data to localStorage
const saveVideos = (currentVideos: Video[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(VIDEOS_STORAGE_KEY, JSON.stringify(currentVideos));
  }
};

export let mockVideos: Video[] = loadVideos();

export const addVideo = (newVideo: Omit<Video, 'id'>) => {
  const videoWithId: Video = {
    ...newVideo,
    id: `vid-${Date.now()}`,
  };
  mockVideos.unshift(videoWithId); // Add to the beginning
  saveVideos(mockVideos);
  return videoWithId;
};

export const updateVideo = (updatedVideo: Video) => {
  const index = mockVideos.findIndex(v => v.id === updatedVideo.id);
  if (index !== -1) {
    mockVideos[index] = updatedVideo;
    saveVideos(mockVideos);
  }
};

export const deleteVideo = (videoId: string) => {
  mockVideos = mockVideos.filter(v => v.id !== videoId);
  saveVideos(mockVideos);
};