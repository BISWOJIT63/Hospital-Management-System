import React, { useState } from "react";
import { Star, MessageCircle, User, ThumbsUp, Calendar, X } from "lucide-react";

const INITIAL_REVIEWS = [
  {
    id: "1",
    author: "Sarah Jenkins",
    rating: 5,
    date: "2026-03-02",
    content:
      "Absolutely fantastic! The quality exceeded my expectations and the customer service was top-notch. Highly recommend to everyone.",
    replies: [
      {
        id: "r1",
        author: "Store Owner",
        date: "2026-03-03",
        content:
          "Thank you so much for the kind words, Sarah! We are thrilled you loved it.",
        isOwner: true,
      },
    ],
  },
  {
    id: "2",
    author: "Michael Chen",
    rating: 4,
    date: "2026-02-28",
    content:
      "Really good product overall. It took a little longer to arrive than expected, but the item itself is great.",
    replies: [],
  },
  {
    id: "3",
    author: "Emily Rodriguez",
    rating: 3,
    date: "2026-02-15",
    content:
      "It is okay. Does what it says on the tin, but I feel like it could be slightly more durable for the price point.",
    replies: [
      {
        id: "r2",
        author: "Store Owner",
        date: "2026-02-16",
        content:
          "Hi Emily, thank you for your feedback. We are always looking to improve our durability and have passed your comments to our product team.",
        isOwner: true,
      },
      {
        id: "r3",
        author: "Alex D.",
        date: "2026-02-18",
        content:
          "I actually found it quite durable! Maybe you got a defective unit?",
        isOwner: false,
      },
    ],
  },
];

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export default function App() {
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [isWritingReview, setIsWritingReview] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null); // ID of the review being replied to

  const [newReview, setNewReview] = useState({
    author: "",
    rating: 0,
    content: "",
  });
  const [hoveredRating, setHoveredRating] = useState(0);

  const [replyContent, setReplyContent] = useState("");
  const [replyAuthor, setReplyAuthor] = useState("");

  const totalReviews = reviews.length;
  const averageRating =
    totalReviews > 0
      ? (
          reviews.reduce((acc, rev) => acc + rev.rating, 0) / totalReviews
        ).toFixed(1)
      : 0;

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (
      newReview.rating === 0 ||
      !newReview.author.trim() ||
      !newReview.content.trim()
    )
      return;

    const review = {
      id: Date.now().toString(),
      author: newReview.author,
      rating: newReview.rating,
      date: new Date().toISOString().split("T")[0],
      content: newReview.content,
      replies: [],
    };

    setReviews([review, ...reviews]);
    setNewReview({ author: "", rating: 0, content: "" });
    setIsWritingReview(false);
  };

  const handleReplySubmit = (reviewId, e) => {
    e.preventDefault();
    if (!replyContent.trim() || !replyAuthor.trim()) return;

    const newReply = {
      id: `reply-${Date.now()}`,
      author: replyAuthor,
      date: new Date().toISOString().split("T")[0],
      content: replyContent,
      isOwner: false,
    };

    const updatedReviews = reviews.map((rev) => {
      if (rev.id === reviewId) {
        return { ...rev, replies: [...rev.replies, newReply] };
      }
      return rev;
    });

    setReviews(updatedReviews);
    setReplyContent("");
    setReplyAuthor("");
    setReplyingTo(null);
  };

  return (
    <div className="min-h-screen df bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Your <span className="text-primary">Feedback</span>
            </h1>
            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="flex items-center text-green-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-6 h-6 ${star <= Math.round(averageRating) ? "fill-current" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <span className="text-2xl font-semibold text-gray-900">
                {averageRating}
              </span>
              <span className="text-gray-500">
                out of 5 ({totalReviews} reviews)
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsWritingReview(!isWritingReview)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-sm focus:ring-4 focus:ring-green-100 outline-none"
          >
            {isWritingReview ? "Cancel Review" : "Write a Review"}
          </button>
        </div>

        {isWritingReview && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Share Your Experience
              </h2>
              <button
                onClick={() => setIsWritingReview(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Overall Rating *
                </label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      className="focus:outline-none transition-transform hover:scale-110"
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      onClick={() =>
                        setNewReview({ ...newReview, rating: star })
                      }
                    >
                      <Star
                        className={`w-10 h-10 ${
                          star <= (hoveredRating || newReview.rating)
                            ? "text-green-400 fill-current"
                            : "text-gray-200"
                        } transition-colors`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label
                  htmlFor="author"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Your Name *
                </label>
                <input
                  type="text"
                  id="author"
                  required
                  value={newReview.author}
                  onChange={(e) =>
                    setNewReview({ ...newReview, author: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-shadow"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Your Review *
                </label>
                <textarea
                  id="content"
                  required
                  rows="4"
                  value={newReview.content}
                  onChange={(e) =>
                    setNewReview({ ...newReview, content: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-shadow resize-none"
                  placeholder="What did you like or dislike? What is this product used for?"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={
                    newReview.rating === 0 ||
                    !newReview.author ||
                    !newReview.content
                  }
                  className="bg-gray-900 hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-medium transition-colors"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="space-y-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-bold text-xl">
                    {review.author.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">
                      {review.author}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                      <div className="flex text-green-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < review.rating ? "fill-current" : "text-gray-200"}`}
                          />
                        ))}
                      </div>
                      <span className="hidden sm:inline">•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(review.date)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6 whitespace-pre-line">
                {review.content}
              </p>

              <div className="flex items-center gap-4 border-t border-gray-100 pt-4">
                <button
                  onClick={() =>
                    setReplyingTo(replyingTo === review.id ? null : review.id)
                  }
                  className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-green-600 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  {replyingTo === review.id ? "Cancel Reply" : "Reply"}
                </button>
              </div>

              {replyingTo === review.id && (
                <div className="mt-6 bg-gray-50 p-5 rounded-xl animate-in fade-in slide-in-from-top-2 duration-200">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Write a reply to {review.author}
                  </h4>
                  <form
                    onSubmit={(e) => handleReplySubmit(review.id, e)}
                    className="space-y-4"
                  >
                    <textarea
                      required
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder="Type your reply here..."
                      rows="3"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none resize-none text-sm"
                    />
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={!replyContent }
                        className="bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        Post Reply
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {review.replies.length > 0 && (
                <div className="mt-6 pl-4 md:pl-8 border-l-2 border-gray-100 space-y-4">
                  {review.replies.map((reply) => (
                    <div
                      key={reply.id}
                      className="bg-gray-50 rounded-xl p-4 md:p-5"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${reply.isOwner ? "bg-teal-100 text-teal-700" : "bg-gray-200 text-gray-700"}`}
                          >
                            {reply.isOwner
                              ? "SO"
                              : reply.author.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <span className="font-semibold text-gray-900 text-sm flex items-center gap-2">
                              {reply.author}
                              {reply.isOwner && (
                                <span className="bg-teal-100 text-teal-800 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-bold">
                                  Store Owner
                                </span>
                              )}
                            </span>
                          </div>
                        </div>
                        <span className="text-xs text-gray-500">
                          {formatDate(reply.date)}
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm ml-10">
                        {reply.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {reviews.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
            <MessageCircle className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No reviews yet
            </h3>
            <p className="text-gray-500 mb-6">
              Be the first to share your thoughts!
            </p>
            <button
              onClick={() => setIsWritingReview(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-xl font-medium transition-colors"
            >
              Write a Review
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
