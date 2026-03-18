import React, { useState, useEffect, useContext } from "react";
import { Star, MessageSquare, Send, User, ChevronRight } from "lucide-react";
import { api } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ReviewSection = ({
  entityId,
  entityType,
  initialRating = 0,
  initialCount = 0,
}) => {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const isPatient = user?.role?.toLowerCase() === "patient";

  const fetchReviews = async () => {
    try {
      setLoading(true);
      let data = [];
      if (entityType === "Doctor") {
        data = await api.getDoctorReviews(entityId);
      } else if (entityType === "Facility") {
        data = await api.getFacilityReviews(entityId);
      } else if (entityType === "Service") {
        data = await api.getServiceReviews(entityId);
      }
      setReviews(data || []);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (entityId) fetchReviews();
  }, [entityId, entityType]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please login to submit a review.");
      return;
    }
    if (!isPatient) {
      alert("Only patients can submit reviews.");
      return;
    }

    try {
      setIsSubmitting(true);
      const reviewData = {
        rating,
        text,
        entityType,
      };

      if (entityType === "Doctor") reviewData.doctorId = entityId;
      else if (entityType === "Facility") reviewData.facilityId = entityId;
      else if (entityType === "Service") reviewData.serviceId = entityId;

      await api.addReview(reviewData);
      setText("");
      setRating(5);
      setShowForm(false);
      fetchReviews();
      alert("Review submitted successfully!");
    } catch (error) {
      alert(error.message || "Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (count, size = 16, interactive = false) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star
            key={s}
            size={size}
            fill={s <= count ? "#fbbf24" : "none"}
            className={s <= count ? "text-yellow-400" : "text-gray-300"}
            style={interactive ? { cursor: "pointer" } : {}}
            onClick={interactive ? () => setRating(s) : undefined}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-8">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <MessageSquare className="text-blue-600" size={24} />
            Patient Reviews
          </h2>
          <div className="flex items-center gap-3 mt-1">
            {renderStars(Math.round(initialRating))}
            <span className="text-sm font-medium text-gray-700">
              {initialRating} ({initialCount} reviews)
            </span>
          </div>
        </div>
        {isPatient ? (
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-md shadow-blue-100 flex items-center gap-2 text-sm"
          >
            {showForm ? "Cancel" : "Write a Review"}
          </button>
        ) : (
          <div className="text-xs text-gray-400 font-medium bg-gray-50 px-3 py-2 rounded-lg border border-gray-100 italic">
            {user ? "Only patients can write reviews" : "Login as a patient to review"}
          </div>
        )}
      </div>

      {showForm && isPatient && (
        <form
          onSubmit={handleSubmit}
          className="mb-10 bg-blue-50/50 p-6 rounded-2xl border border-blue-100 animate-in fade-in slide-in-from-top-4 duration-300"
        >
          <h3 className="font-bold text-gray-900 mb-4">
            How was your experience?
          </h3>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rating
            </label>
            {renderStars(rating, 24, true)}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Comment
            </label>
            <textarea
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none min-h-[120px]"
              placeholder="Tell us about your experience..."
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              "Submitting..."
            ) : (
              <>
                <Send size={18} /> Post Review
              </>
            )}
          </button>
        </form>
      )}

      <div className="space-y-6">
        {loading ? (
          <div className="flex justify-center py-10">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : reviews.length > 0 ? (
          <>
            {reviews.slice(0, 3).map((review) => (
              <div
                key={review._id}
                className="pb-6 border-b border-gray-100 last:border-0"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                      {review.authorId?.avatar ? (
                        <img
                          src={review.authorId.avatar}
                          alt=""
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <User size={20} />
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">
                        {review.authorId?.name || "Anonymous Patient"}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  {renderStars(review.rating, 14)}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed italic">
                  "{review.text}"
                </p>
              </div>
            ))}
            {reviews.length > 3 && (
              <button
                onClick={() =>
                  navigate(
                    `/reviews/${entityType.toLowerCase()}/${entityId}`,
                  )
                }
                className="w-full py-3 text-blue-600 font-bold text-sm hover:bg-blue-50 rounded-xl transition-all flex items-center justify-center gap-2 mt-4"
              >
                See all {reviews.length} reviews <ChevronRight size={18} />
              </button>
            )}
          </>
        ) : (
          <div className="text-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            <MessageSquare className="mx-auto text-gray-300 mb-2" size={32} />
            <p className="text-gray-500 font-medium">
              No reviews yet. Be the first to share your experience!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
