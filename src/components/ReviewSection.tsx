import React, { useState } from "react";
import { Review, reviews as mockReviews } from "@/data/reviews";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { showSuccess, showError } from "@/utils/toast";

interface ReviewSectionProps {
  productId: string;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ productId }) => {
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState("");
  const [userName, setUserName] = useState("");
  const [currentReviews, setCurrentReviews] = useState<Review[]>(
    mockReviews.filter((review) => review.productId === productId)
  );

  const handleStarClick = (rating: number) => {
    setUserRating(rating);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !userComment.trim() || userRating === 0) {
      showError("Mohon lengkapi nama, rating, dan ulasan Anda.");
      return;
    }

    const newReview: Review = {
      id: `rev${Date.now()}`, // Simple unique ID
      productId,
      userName: userName.trim(),
      rating: userRating,
      comment: userComment.trim(),
      date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
    };

    setCurrentReviews((prev) => [newReview, ...prev]);
    showSuccess("Ulasan Anda berhasil ditambahkan!");
    setUserName("");
    setUserComment("");
    setUserRating(0);
  };

  return (
    <div className="mt-10">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Ulasan Pelanggan</h2>

      {currentReviews.length === 0 ? (
        <p className="text-gray-600 mb-6">Belum ada ulasan untuk produk ini.</p>
      ) : (
        <div className="space-y-6 mb-8">
          {currentReviews.map((review) => (
            <div key={review.id} className="border-b pb-4 last:border-b-0">
              <div className="flex items-center mb-2">
                <span className="font-semibold text-gray-800 mr-2">{review.userName}</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500 ml-auto">{review.date}</span>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 p-6 border rounded-lg bg-gray-50">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Berikan Ulasan Anda</h3>
        <form onSubmit={handleSubmitReview} className="space-y-4">
          <div>
            <Label htmlFor="reviewer-name" className="text-base font-medium">Nama Anda</Label>
            <Input
              id="reviewer-name"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Masukkan nama Anda"
              className="mt-2"
            />
          </div>
          <div>
            <Label className="text-base font-medium">Rating</Label>
            <div className="flex mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-6 w-6 cursor-pointer ${
                    star <= userRating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                  }`}
                  onClick={() => handleStarClick(star)}
                />
              ))}
            </div>
          </div>
          <div>
            <Label htmlFor="review-comment" className="text-base font-medium">Ulasan</Label>
            <Textarea
              id="review-comment"
              value={userComment}
              onChange={(e) => setUserComment(e.target.value)}
              placeholder="Tulis ulasan Anda di sini..."
              rows={4}
              className="mt-2"
            />
          </div>
          <Button type="submit" className="w-full py-3 text-lg">
            Kirim Ulasan
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ReviewSection;