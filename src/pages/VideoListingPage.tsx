"use client";

import React from "react";
import { Link } from "react-router-dom";
import HomePageHeader from "@/components/HomePageHeader";
import { mockVideos, Video } from "@/data/videos";
import { Card, CardContent } from "@/components/ui/card";
import { PlayCircle } from "lucide-react";

const VideoListingPage: React.FC = () => {
  return (
    <>
      <HomePageHeader />
      <div className="container mx-auto p-4 md:p-8">
        <h1 className="text-4xl font-playfair font-bold text-center mb-10 text-gray-900 dark:text-gray-100">Video Inspirasi Fashion</h1>

        {mockVideos.length === 0 ? (
          <div className="text-center p-10 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <PlayCircle className="h-20 w-20 text-gray-400 mx-auto mb-6" />
            <p className="text-xl text-gray-600 dark:text-gray-400 font-poppins mb-6">Belum ada video yang tersedia saat ini.</p>
            <Link to="/">
              <Button className="px-8 py-3 text-lg bg-soft-pink hover:bg-rose-600 text-white font-poppins">
                Kembali ke Beranda
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockVideos.map((video: Video) => (
              <Card key={video.id} className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-beige dark:border-gray-700 bg-white dark:bg-gray-800">
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
                  <p className="text-sm text-gray-500 font-poppins dark:text-gray-500">{video.views.toLocaleString()} views • {new Date(video.uploadDate).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default VideoListingPage;