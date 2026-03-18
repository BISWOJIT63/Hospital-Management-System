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
      className={`w-full max-w-[260px] md:max-w-[280px] lg:max-w-[320px] h-full flex flex-col shrink-0 font-sans bg-white dark:bg-slate-800 rounded-3xl shadow-xl shadow-emerald-900/10 overflow-hidden border border-emerald-100 dark:border-slate-700 transition-all duration-300 hover:shadow-4xl hover:-translate-y-4 ${className}`}
    >
      <div className="relative w-full p-5 md:p-8 pr-12 md:pr-14 pb-0">
        <div className="absolute top-6 right-4 md:right-8 text-emerald-100 dark:text-emerald-900/30">
          <Quote size={30} fill="currentColor" />
        </div>

        <div className="flex items-center gap-4 relative z-10 w-full">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-emerald-600 flex items-center justify-center text-white text-xl font-bold border-4 dark:border-emerald-500/20 border-slate-800 shadow-inner">
            <User />
          </div>
          <div>
            <h3 className="text-gray-900 dark:text-white font-bold text-lg leading-tight">
              {rev.name}
            </h3>
            <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 mt-1">
              <CheckCircle size={14} />
              <span className="text-xs font-semibold uppercase tracking-wider">
                Verified Patient
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 md:p-8 pt-6">
        <div className="flex gap-1 mb-4">
          {[...Array(rev.star)].map((_, i) => (
            <Star
              key={i}
              size={18}
              className={
                i < rev.star ? "fill-emerald-500 text-emerald-500" : "text-gray-200 dark:text-gray-600"
              }
            />
          ))
          }
          <span className="ml-2 text-sm font-medium text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 rounded-full">
            {rev.star}
          </span>
        </div>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">{rev.fb}</p>
      </div>

      <div className="px-5 mt-auto md:px-8 py-5 bg-emerald-50/50 dark:bg-slate-900/50 flex items-center justify-between border-t border-emerald-100 dark:border-slate-700">
        <button
          onClick={handleLike}
          className={`flex items-center gap-0.5 text-xs font-bold transition-colors ${liked
            ? "text-emerald-600 dark:text-emerald-400"
            : "text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400"
            }`}
        >
          <ThumbsUp size={14} className={liked ? "fill-emerald-600 dark:fill-emerald-400" : ""} />
          <span className="mt-0.5">Helpful ({likeCount})</span>
        </button>
        <span className="text-xs font-bold text-emerald-400 dark:text-emerald-500 uppercase tracking-widest leading-none">
          {rev.date}
        </span>
      </div>
    </div>
  );
};

export default ReviewCard;
