import React, { useState } from "react";
import { User } from 'lucide-react';
import {
  Star,
  CheckCircle,
  Quote,
  ThumbsUp,
  MessageSquare,
} from "lucide-react";

const ReviewCard = ({ className, rev }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(24);
  const handleLike = () => {
    if (liked) {
      setLikeCount((prev) => prev - 1);
    } else {
      setLikeCount((prev) => prev + 1);
    }
    setLiked(!liked);
  };

  return (
    <div
      className={`max-w-md font-sans w-full bg-white dark:bg-slate-800 rounded-3xl shadow-xl shadow-emerald-900/10 overflow-hidden border border-emerald-100 transition-all duration-300 hover:shadow-4xl hover:-translate-y-4 ${className}`}
    >
      <div className="relative w-full p-8 pb-0">
        <div className="absolute top-6 right-8 text-emerald-100">
          <Quote size={48} fill="currentColor" />
        </div>

        <div className="flex items-center gap-4 relative z-10">
          <div className="w-14 h-14 rounded-full bg-emerald-600 flex items-center justify-center text-white text-xl font-bold border-4 dark:border-emerald-50 border-slate-800 shadow-inner">
            <User />
          </div>
          <div>
            <h3 className="text-gray-900 dark:text-white font-bold text-lg leading-tight">
              {rev.name}
            </h3>
            <div className="flex items-center gap-1 text-emerald-600 mt-1">
              <CheckCircle size={14} />
              <span className="text-xs font-semibold uppercase tracking-wider">
                Verified Patient
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 pt-6">
        <div className="flex gap-1 mb-4">
          {[...Array(rev.star)].map((_, i) => (
            <Star
              key={i}
              size={18}
              className={
                i < rev.star ? "fill-emerald-500 text-emerald-500" : "text-gray-200"
              }
            />
          ))
          }
          <span className="ml-2 text-sm font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
            {rev.star}
          </span>
        </div>
        <p className="text-gray-600 leading-relaxed text-sm">{rev.fb}</p>
      </div>

      <div className="px-8 py-5 bg-emerald-50/50 dark:bg-slate-800 flex items-center justify-between border-t border-emerald-100">
        <div className="flex items-center gap-4">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 text-xs font-bold transition-colors ${
              liked
                ? "text-emerald-600"
                : "text-gray-500 hover:text-emerald-600"
            }`}
          >
            <ThumbsUp size={16} className={liked ? "fill-emerald-600" : ""} />
            <span>Helpful ({likeCount})</span>
          </button>
          <button className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-emerald-600 transition-colors">
            <MessageSquare size={16} />
            <span>Comment</span>
          </button>
        </div>
        <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
          {rev.date}
        </span>
      </div>
    </div>
  );
};

export default ReviewCard;
