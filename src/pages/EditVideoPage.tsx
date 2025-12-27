import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import HomePageHeader from "@/components/HomePageHeader";
import { Video, mockVideos, addVideo, updateVideo } from "@/data/videos";
import { showSuccess, showError } from "@/utils/toast";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent } from "@/components/ui/card";

const EditVideoPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { userRole } = useAuth();
  const isNewVideo = id === "new";
  
  const [title, setTitle] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [sellerName, setSellerName] = useState("By.Lunova Official");
  const [views, setViews] = useState(0);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  const [thumbnailPreviewUrl, setThumbnailPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (userRole !== "seller") {
      showError("Hanya penjual yang dapat mengelola video.");
      navigate("/videos");
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
        setThumbnailPreviewUrl(foundVideo.thumbnailUrl);
        setVideoPreviewUrl(foundVideo.videoUrl);
      } else {
        showError("Video tidak ditemukan.");
        navigate("/videos");
      }
    } else {
      setTitle("");
      setThumbnailUrl("");
      setVideoUrl("");
      setSellerName("By.Lunova Official");
      setViews(0);
      setVideoFile(null);
      setThumbnailFile(null);
      setVideoPreviewUrl(null);
      setThumbnailPreviewUrl(null);
    }
  }, [id, isNewVideo, navigate]);

  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith("video/")) {
        setVideoFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setVideoPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        showError("File yang dipilih bukan video. Mohon pilih file video.");
      }
    } else {
      setVideoFile(null);
      setVideoPreviewUrl(isNewVideo ? null : mockVideos.find(v => v.id === id)?.videoUrl || null);
    }
  };

  const handleThumbnailFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith("image/")) {
        setThumbnailFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setThumbnailPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        showError("File yang dipilih bukan gambar. Mohon pilih file gambar.");
      }
    } else {
      setThumbnailFile(null);
      setThumbnailPreviewUrl(isNewVideo ? null : mockVideos.find(v => v.id === id)?.thumbnailUrl || null);
    }
  };

  const handleSaveVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      showError("Mohon masukkan judul video.");
      return;
    }

    // Validasi input
    const hasVideoFile = videoFile !== null;
    const hasVideoUrl = videoUrl.trim() !== "";
    const hasThumbnailFile = thumbnailFile !== null;
    const hasThumbnailUrl = thumbnailUrl.trim() !== "";

    if (!hasVideoFile && !hasVideoUrl) {
      showError("Mohon unggah file video atau masukkan URL video.");
      return;
    }

    if (!hasThumbnailFile && !hasThumbnailUrl) {
      showError("Mohon unggah file thumbnail atau masukkan URL thumbnail.");
      return;
    }

    try {
      let finalVideoUrl = videoUrl;
      let finalThumbnailUrl = thumbnailUrl;

      // Jika ada file video yang diunggah, gunakan data URL
      if (hasVideoFile && videoFile) {
        finalVideoUrl = videoPreviewUrl || videoUrl;
      }

      // Jika ada file thumbnail yang diunggah, gunakan data URL
      if (hasThumbnailFile && thumbnailFile) {
        finalThumbnailUrl = thumbnailPreviewUrl || thumbnailUrl;
      }

      const videoData: Omit<Video, 'id' | 'uploadDate'> = {
        title: title.trim(),
        thumbnailUrl: finalThumbnailUrl.trim(),
        videoUrl: finalVideoUrl.trim(),
        sellerName: sellerName.trim(),
        views: views,
      };

      if (isNewVideo) {
        const newVideo = addVideo({ 
          ...videoData, 
          uploadDate: new Date().toISOString().split('T')[0] 
        });
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
    } catch (error) {
      showError("Terjadi kesalahan saat menyimpan video.");
      console.error("Error saving video:", error);
    }
  };

  if (userRole !== "seller") {
    return null;
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
              <Label htmlFor="video-title" className="text-base font-poppins font-medium text-gray-800 dark:text-gray-200">
                Judul Video
              </Label>
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
              <Label className="text-base font-poppins font-medium text-gray-800 dark:text-gray-200">
                Unggah Video
              </Label>
              <Input
                type="file"
                accept="video/*"
                onChange={handleVideoFileChange}
                className="mt-2 border-soft-pink focus:ring-soft-pink font-poppins dark:bg-gray-700 dark:text-gray-100 dark:border-gold-rose"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Pilih file video dari perangkat Anda atau masukkan URL di bawah
              </p>
            </div>

            <div>
              <Label htmlFor="video-url" className="text-base font-poppins font-medium text-gray-800 dark:text-gray-200">
                URL Video (Embed)
              </Label>
              <Input
                id="video-url"
                type="url"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://www.youtube.com/embed/VIDEO_ID"
                className="mt-2 border-soft-pink focus:ring-soft-pink font-poppins dark:bg-gray-700 dark:text-gray-100 dark:border-gold-rose"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                (Gunakan URL embed dari platform seperti YouTube)
              </p>
            </div>

            {(videoPreviewUrl || videoUrl) && (
              <Card className="mt-4">
                <CardContent className="p-4">
                  <h3 className="font-poppins font-medium text-gray-800 dark:text-gray-200 mb-2">Pratinjau Video:</h3>
                  <video 
                    src={videoPreviewUrl || videoUrl} 
                    controls 
                    className="w-full max-h-64 object-contain rounded-md border border-soft-pink dark:border-gold-rose"
                  />
                </CardContent>
              </Card>
            )}

            <div>
              <Label className="text-base font-poppins font-medium text-gray-800 dark:text-gray-200">
                Unggah Thumbnail
              </Label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleThumbnailFileChange}
                className="mt-2 border-soft-pink focus:ring-soft-pink font-poppins dark:bg-gray-700 dark:text-gray-100 dark:border-gold-rose"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Pilih gambar thumbnail dari perangkat Anda atau masukkan URL di bawah
              </p>
            </div>

            <div>
              <Label htmlFor="thumbnail-url" className="text-base font-poppins font-medium text-gray-800 dark:text-gray-200">
                URL Thumbnail
              </Label>
              <Input
                id="thumbnail-url"
                type="url"
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
                placeholder="https://example.com/thumbnail.jpg"
                className="mt-2 border-soft-pink focus:ring-soft-pink font-poppins dark:bg-gray-700 dark:text-gray-100 dark:border-gold-rose"
              />
            </div>

            {(thumbnailPreviewUrl || thumbnailUrl) && (
              <div>
                <h3 className="font-poppins font-medium text-gray-800 dark:text-gray-200 mb-2">Pratinjau Thumbnail:</h3>
                <img 
                  src={thumbnailPreviewUrl || thumbnailUrl} 
                  alt="Thumbnail Preview" 
                  className="w-48 h-auto object-cover rounded-md border border-soft-pink dark:border-gold-rose" 
                />
              </div>
            )}

            <div>
              <Label htmlFor="seller-name" className="text-base font-poppins font-medium text-gray-800 dark:text-gray-200">
                Nama Penjual
              </Label>
              <Input
                id="seller-name"
                type="text"
                value={sellerName}
                onChange={(e) => setSellerName(e.target.value)}
                placeholder="Nama Penjual"
                className="mt-2 bg-gray-100 border-soft-pink focus:ring-soft-pink font-poppins dark:bg-gray-700 dark:text-gray-100 dark:border-gold-rose"
                readOnly
              />
            </div>

            <div>
              <Label htmlFor="views" className="text-base font-poppins font-medium text-gray-800 dark:text-gray-200">
                Jumlah Tayangan (Opsional)
              </Label>
              <Input
                id="views"
                type="number"
                value={views}
                onChange={(e) => setViews(Number(e.target.value))}
                min="0"
                className="mt-2 border-soft-pink focus:ring-soft-pink font-poppins dark:bg-gray-700 dark:text-gray-100 dark:border-gold-rose"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full py-3 text-lg bg-soft-pink hover:bg-rose-600 text-white font-poppins"
            >
              {isNewVideo ? "Tambah Video" : "Simpan Perubahan"}
            </Button>
          </form>
        </div>
        <div className="text-center mt-8">
          <Button 
            asChild 
            variant="outline" 
            className="border-soft-pink text-soft-pink hover:bg-soft-pink hover:text-white font-poppins dark:border-gold-rose dark:text-gold-rose dark:hover:bg-gold-rose dark:hover:text-white"
          >
            <Link to="/videos">Kembali ke Daftar Video</Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default EditVideoPage;