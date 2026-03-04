import React from "react";
import { Star } from "lucide-react";

export default function Reviews({ HOSPITAL }) {
  return (
    <section
      id="reviews"
      className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm scroll-mt-36 text-slate-800 dark:text-slate-200"
    >
      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-2">
        Reviews ({HOSPITAL.reviewsCount})
      </h2>
      <div className="space-y-6">
        {HOSPITAL.reviews.map((review, idx) => (
          <div
            key={idx}
            className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-xl border border-slate-100 dark:border-slate-700"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex gap-3">
                <img
                  src={review.avatar}
                  alt={review.author}
                  className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-600"
                />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                    {review.author}
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="flex text-green-400">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {review.date}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {review.text}
            </p>
          </div>
        ))}
      </div>
      <button className="w-full mt-6 py-3 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition">
        View All Reviews
      </button>
    </section>
  );
}
