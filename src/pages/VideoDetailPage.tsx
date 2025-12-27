import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import HomePageHeader from "@/components/HomePageHeader";
import { Button } from "@/components/ui/button";
import { mockVideos, Video } from "@/data/videos";
import { Play, Heart, Share2, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { showSuccess } from "@/utils/toast";

const VideoDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [video, setVideo] = useState<Video | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    const foundVideo = mockVideos.find((v) => v.id === id);
    if (foundVideo) {
      setVideo(foundVideo);
      setLikeCount(foundVideo.views); // Using views as initial like count for demo
    } else {
      navigate("/videos");
    }
  }, [id, navigate]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    showSuccess(isLiked ? "Batal menyukai video" : "Video disukai!");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: video?.title,
        url: window.location.href,
      }).catch(console.error);
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      showSuccess("Tautan video telah disalin ke clipboard!");
    }
  };

  const handleDownload = () => {
    showSuccess("Fitur download akan segera tersedia!");
  };

  if (!video) {
    return (
      <div className="min-h-screen bg-beige dark:bg-gray-900">
        <HomePageHeader />
        <div className="container mx-auto p-4 text-center">
          <h1 className="text-2xl font-playfair font-bold mb-4 dark:text-gray-100">Video tidak ditemukan</h1>
          <Button asChild className="bg-soft-pink hover:bg-rose-600 text-white font-poppins">
            <Link to="/videos">Kembali ke Daftar Video</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <HomePageHeader />
      <div className="container mx-auto p-4 md:p-8">
        <Button 
          onClick={() => navigate("/videos")} 
          variant="outline" 
          className="mb-6 border-soft-pink text-soft-pink hover:bg-soft-pink hover:text-white dark:border-gold-rose dark:text-gold-rose dark:hover:bg-gold-rose dark:hover:text-white"
        >
          &larr; Kembali ke Daftar Video
        </Button>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          {/* Video Player */}
          <div className="relative pt-[56.25%]"> {/* 16:9 Aspect Ratio */}
            <iframe
              src={video.videoUrl}
              className="absolute top-0 left-0 w-full h-full"
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          
          <div className="p-6">
            <h1 className="text-3xl font-playfair font-bold text-gray-900 dark:text-gray-100 mb-2">
              {video.title}
            </h1>
            
            <div className="flex flex-wrap items-center justify-between mb-6">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12" />
                <div className="ml-3">
                  <p className="font-poppins font-medium text-gray-800 dark:text-gray-200">
                    {video.sellerName}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(video.uploadDate).toLocaleDateString('id-ID', { 
                      day: 'numeric', 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-gray-600 dark:text-gray-400">
                  {video.views.toLocaleString()} views
                </span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button 
                onClick={handleLike}
                variant="ghost"
                className={`flex items-center space-x-2 ${isLiked ? 'text-red-500' : 'text-gray-600 dark:text-gray-400'}`}
              >
                <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                <span>{likeCount.toLocaleString()}</span>
              </Button>
              
              <Button 
                onClick={handleShare}
                variant="ghost"
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-400"
              >
                <Share2 className="h-5 w-5" />
                <span>Bagikan</span>
              </Button>
              
              <Button 
                onClick={handleDownload}
                variant="ghost"
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-400"
              >
                <Download className="h-5 w-5" />
                <span>Unduh</span>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Related Videos Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-playfair font-bold text-gray-900 dark:text-gray-100 mb-6">
            Video Terkait
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockVideos
              .filter(v => v.id !== video.id)
              .slice(0, 3)
              .map((relatedVideo) => (
                <Card 
                  key={relatedVideo.id} 
                  className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-beige dark:border-gray-700 bg-white dark:bg-gray-800 cursor-pointer"
                  onClick={() => navigate(`/videos/${relatedVideo.id}`)}
                >
                  <div className="relative">
                    <img 
                      src={relatedVideo.thumbnailUrl} 
                      alt={relatedVideo.title} 
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <Play className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-poppins font-medium text-gray-800 dark:text-gray-200 line-clamp-2 mb-2">
                      {relatedVideo.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {relatedVideo.sellerName}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      {relatedVideo.views.toLocaleString()} views
                    </p>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoDetailPage;