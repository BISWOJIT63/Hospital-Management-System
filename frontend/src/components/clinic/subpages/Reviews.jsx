import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Star } from "lucide-react";

const Reviews = ({ clinicData }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  if (!clinicData?.reviews?.length) return null;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
          Patient Experiences
        </h2>
        <button
          onClick={() => navigate(`/reviews/clinic/${id}`)}
          className="text-green-600 dark:text-green-400 text-sm font-semibold hover:underline transition-colors duration-300"
        >
          View All Reviews
        </button>
      </div>
      {clinicData.reviews.map((review) => (
        <div
          key={review.id}
          className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm transition-colors duration-300"
        >
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 dark:bg-slate-800 rounded-full flex items-center justify-center font-bold text-gray-600 dark:text-slate-300">
                {review.user.charAt(0)}
              </div>
              <div>
                <div className="font-bold text-sm text-gray-900 dark:text-white">
                  {review.user}
                </div>
                <div className="text-xs text-gray-400 dark:text-slate-500">
                  {review.date}
                </div>
              </div>
            </div>
            <div className="flex text-green-400 dark:text-green-500">
              {[...Array(review.rating)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-current" />
              ))}
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-slate-400 leading-relaxed italic">
            "{review.comment}"
          </p>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
