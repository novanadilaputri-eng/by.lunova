import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import HomePageHeader from "@/components/HomePageHeader";
import { Video, mockVideos, addVideo, updateVideo } from "@/data/videos";
import { showSuccess, showError } from "@/utils/toast";
import { useAuth } from "@/hooks/use-auth";

const EditVideoPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { userRole } = useAuth();
  const isNewVideo = id === "new";

  const [title, setTitle] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [sellerName, setSellerName] = useState("By.Lunova Official"); // Default seller name
  const [views, setViews] = useState(0);

  useEffect(() => {
    if (userRole !== "seller") {
      showError("Anda tidak memiliki akses untuk mengelola video.");
      navigate("/profile");
    }
  }, [userRole, navigate]);

  useEffect(() => {
    if (!isNewVideo) {
      const foundVideo = mockVideos.find((v) => v.id === id);
      if (foundVideo) {
        setTitle(foundVideo.title);
        setThumbnailUrl(foundVideo.thumbnailUrl);
        setVideoUrl(foundVideo.videoUrl);
        setSellerName(foundVideo.sellerName);
        setViews(foundVideo.views);
      } else {
        showError("Video tidak ditemukan.");
        navigate("/videos");
      }
    } else {
      // Initialize for new video
      setTitle("");
      setThumbnailUrl("");
      setVideoUrl("");
      setSellerName("By.Lunova Official");
      setViews(0);
    }
  }, [id, isNewVideo, navigate]);

  const handleSaveVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !thumbnailUrl.trim() || !videoUrl.trim()) {
      showError("Mohon lengkapi semua bidang wajib.");
      return;
    }

    const videoData: Omit<Video, 'id' | 'uploadDate'> = {
      title: title.trim(),
      thumbnailUrl: thumbnailUrl.trim(),
      videoUrl: videoUrl.trim(),
      sellerName: sellerName.trim(),
      views: views,
    };

    if (isNewVideo) {
      const newVideo = addVideo({ ...videoData, uploadDate: new Date().toISOString().split('T')[0] });
      showSuccess(`Video "${newVideo.title}" berhasil ditambahkan!`);
    } else {
      const existingVideo = mockVideos.find(v => v.id === id);
      if (existingVideo) {
        const updatedVideo: Video = {
          ...existingVideo,
          ...videoData,
          id: id!,
        };
        updateVideo(updatedVideo);
        showSuccess(`Video "${updatedVideo.title}" berhasil diperbarui!`);
      }
    }

    navigate("/videos");
  };

  if (userRole !== "seller") {
    return null; // Or a loading spinner
  }

  return (
    <>
      <HomePageHeader />
      <div className="container mx-auto p-4 md:p-8">
        <h1 className="text-4xl font-playfair font-bold text-center mb-10 text-gray-900 dark:text-gray-100">
          {isNewVideo ? "Tambah Video Baru" : `Edit Video: ${title}`}
        </h1>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-3xl mx-auto">
          <form onSubmit={handleSaveVideo} className="space-y-6">
            <div>
              <Label htmlFor="video-title" className="text-base font-poppins font-medium text-gray-800 dark:text-gray-200">Judul Video</Label>
              <Input
                id="video-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Masukkan judul video"
                className="mt-2 border-soft-pink focus:ring-soft-pink font-poppins dark:bg-gray-700 dark:text-gray-100 dark:border-gold-rose"
                required
              />
            </div>

            <div>
              <Label htmlFor="thumbnail-url" className="text-base font-poppins font-medium text-gray-800 dark:text-gray-200">URL Thumbnail</Label>
              <Input
                id="thumbnail-url"
                type="url"
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
                placeholder="https://example.com/thumbnail.jpg"
                className="mt-2 border-soft-pink focus:ring-soft-pink font-poppins dark:bg-gray-700 dark:text-gray-100 dark:border-gold-rose"
                required
              />
              {thumbnailUrl && (
                <img src={thumbnailUrl} alt="Thumbnail Preview" className="mt-4 w-48 h-auto object-cover rounded-md border border-soft-pink dark:border-gold-rose" />
              )}
            </div>

            <div>
              <Label htmlFor="video-url" className="text-base font-poppins font-medium text-gray-800 dark:text-gray-200">URL Video (Embed)</Label>
              <Input
                id="video-url"
                type="url"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://www.youtube.com/embed/VIDEO_ID"
                className="mt-2 border-soft-pink focus:ring-soft-pink font-poppins dark:bg-gray-700 dark:text-gray-100 dark:border-gold-rose"
                required
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                (Gunakan URL embed dari platform seperti YouTube, e.g., `https://www.youtube.com/embed/dQw4w9WgXcQ`)
              </p>
            </div>

            <div>
              <Label htmlFor="seller-name" className="text-base font-poppins font-medium text-gray-800 dark:text-gray-200">Nama Penjual</Label>
              <Input
                id="seller-name"
                type="text"
                value={sellerName}
                onChange={(e) => setSellerName(e.target.value)}
                placeholder="Nama Penjual"
                className="mt-2 bg-gray-100 border-soft-pink focus:ring-soft-pink font-poppins dark:bg-gray-700 dark:text-gray-100 dark:border-gold-rose"
                readOnly // For demo, seller name is fixed
              />
            </div>

            <div>
              <Label htmlFor="views" className="text-base font-poppins font-medium text-gray-800 dark:text-gray-200">Jumlah Tayangan (Opsional)</Label>
              <Input
                id="views"
                type="number"
                value={views}
                onChange={(e) => setViews(Number(e.target.value))}
                min="0"
                className="mt-2 border-soft-pink focus:ring-soft-pink font-poppins dark:bg-gray-700 dark:text-gray-100 dark:border-gold-rose"
              />
            </div>

            <Button type="submit" className="w-full py-3 text-lg bg-soft-pink hover:bg-rose-600 text-white font-poppins">
              {isNewVideo ? "Tambah Video" : "Simpan Perubahan"}
            </Button>
          </form>
        </div>

        <div className="text-center mt-8">
          <Button asChild variant="outline" className="border-soft-pink text-soft-pink hover:bg-soft-pink hover:text-white font-poppins dark:border-gold-rose dark:text-gold-rose dark:hover:bg-gold-rose dark:hover:text-white">
            <Link to="/videos">Kembali ke Daftar Video</Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default EditVideoPage;