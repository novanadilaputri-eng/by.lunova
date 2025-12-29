"use client";

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import HomePageHeader from "@/components/HomePageHeader";
import { mockVideos, Video, deleteVideo } from "@/data/videos";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { PlayCircle, PlusCircle, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { showSuccess, showError } from "@/utils/toast";

const VideoListingPage: React.FC = () => {
  const { userRole } = useAuth();
  const navigate = useNavigate();
  const [currentVideos, setCurrentVideos] = useState<Video[]>(mockVideos);

  useEffect(() => {
    setCurrentVideos([...mockVideos]);
  }, [mockVideos]);

  const handleDeleteVideo = (videoId: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus video ini?")) {
      deleteVideo(videoId);
      setCurrentVideos([...mockVideos]);
      showSuccess("Video berhasil dihapus!");
    }
  };

  return (
    <>
      <HomePageHeader />
      <div className="container mx-auto p-4 md:p-8">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-playfair font-bold text-gray-900 dark:text-gray-100">Video Inspirasi Fashion</h1>
          {userRole === "seller" && (
            <Button 
              onClick={() => navigate("/seller/videos/new")} 
              className="bg-soft-pink hover:bg-rose-600 text-white font-poppins"
            >
              <PlusCircle className="h-4 w-4 mr-2" /> Tambah Video Baru
            </Button>
          )}
        </div>
        
        {currentVideos.length === 0 ? (
          <div className="text-center p-10 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <PlayCircle className="h-20 w-20 text-gray-400 mx-auto mb-6" />
            <p className="text-xl text-gray-600 dark:text-gray-400 font-poppins mb-6">Belum ada video yang tersedia saat ini.</p>
            {userRole === "seller" && (
              <Button 
                onClick={() => navigate("/seller/videos/new")} 
                className="px-8 py-3 text-lg bg-soft-pink hover:bg-rose-600 text-white font-poppins"
              >
                Tambah Video Pertama Anda
              </Button>
            )}
            <Link to="/">
              <Button 
                variant="outline" 
                className="mt-4 px-8 py-3 text-lg border-soft-pink text-soft-pink hover:bg-soft-pink hover:text-white font-poppins"
              >
                Kembali ke Beranda
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentVideos.map((video: Video) => (
              <Card 
                key={video.id} 
                className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-beige dark:border-gray-700 bg-white dark:bg-gray-800"
              >
                <Link to={`/videos/${video.id}`} className="relative block">
                  <img 
                    src={video.thumbnailUrl} 
                    alt={video.title} 
                    className="w-full h-48 object-cover" 
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <PlayCircle className="h-12 w-12 text-white" />
                  </div>
                </Link>
                <CardContent className="p-4">
                  <Link to={`/videos/${video.id}`}>
                    <h3 className="text-lg font-semibold text-gray-800 hover:text-soft-pink transition-colors duration-200 font-poppins dark:text-gray-200 dark:hover:text-gold-rose">
                      {video.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-600 mt-1 font-poppins dark:text-gray-400">Oleh: {video.sellerName}</p>
                  <p className="text-sm text-gray-500 font-poppins dark:text-gray-500">
                    {video.views.toLocaleString()} views • {new Date(video.uploadDate).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </p>
                </CardContent>
                {userRole === "seller" && (
                  <CardFooter className="p-4 pt-0 flex justify-end space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => navigate(`/seller/videos/edit/${video.id}`)}
                      className="border-gold-rose text-gold-rose hover:bg-gold-rose hover:text-white font-poppins dark:border-gold-rose dark:text-gold-rose dark:hover:bg-gold-rose dark:hover:text-white"
                    >
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={() => handleDeleteVideo(video.id)}
                      className="font-poppins"
                    >
                      <Trash2 className="h-4 w-4 mr-1" /> Hapus
                    </Button>
                  </CardFooter>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default VideoListingPage;