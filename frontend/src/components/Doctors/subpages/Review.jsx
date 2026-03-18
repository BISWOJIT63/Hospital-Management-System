import { ChevronLeft, ChevronRight, Reply, Star, ThumbsUp } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const Review = ({ DOCTOR }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  if (!DOCTOR?.reviews?.length) return null;

  return (
    <div>
      <section
        id="reviews"
        className="bg-white dark:bg-slate-950 dark:border-slate-700 p-6 md:p-8 rounded-xl border border-slate-200 shadow-sm scroll-mt-36"
      >
        <div className="flex items-start justify-between mb-8">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Reviews ({DOCTOR.reviewsCount})
          </h2>
          <button
            onClick={() => navigate(`/reviews/doctor/${id}`)}
            className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
          >
            View All Reviews
          </button>
        </div>
        <div className="space-y-8">
          {DOCTOR.reviews.map((review, idx) => (
            <div
              key={idx}
              className="border-b border-slate-100 pb-8 last:border-0 last:pb-0"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-4">
                  <img
                    src={review.avatar}
                    alt={review.author}
                    className="w-12 h-12 rounded-full border border-slate-200"
                  />
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-slate-200">
                      {review.author}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex text-green-500">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {review.date}
                      </span>
                    </div>
                  </div>
                </div>
                {review.recommended && (
                  <div className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-green-700 bg-green-50 px-3 py-1.5 rounded-full border border-green-200">
                    <ThumbsUp className="w-3.5 h-3.5" />
                    Recommended for Appointment
                  </div>
                )}
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                {review.text}
              </p>
              <button className="flex items-center gap-1.5 text-sm text-green-600 font-medium hover:underline">
                <Reply className="w-4 h-4" /> Reply
              </button>

              {review.reply && (
                <div className="mt-6 ml-10 p-4 bg-slate-50 dark:bg-slate-800 dark:border-slate-700 border border-slate-100 rounded-xl flex gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shrink-0 font-bold text-green-700">
                    {review.reply.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-slate-200 text-sm">
                      {review.reply.author}
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                      {review.reply.text}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
          <div className="flex justify-center pt-4">
            <div className="flex items-center gap-2 text-sm">
              <button className="p-2 text-slate-400 hover:text-slate-900">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 rounded-full bg-green-600 text-white font-medium flex items-center justify-center">
                1
              </button>
              <button className="w-8 h-8 rounded-full hover:bg-slate-100 text-slate-600 font-medium flex items-center justify-center">
                2
              </button>
              <button className="w-8 h-8 rounded-full hover:bg-slate-100 text-slate-600 font-medium flex items-center justify-center">
                3
              </button>
              <span className="text-slate-400">...</span>
              <button className="w-8 h-8 rounded-full hover:bg-slate-100 text-slate-600 font-medium flex items-center justify-center">
                10
              </button>
              <button className="p-2 text-slate-900 font-medium flex items-center gap-1 hover:underline">
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Review;
