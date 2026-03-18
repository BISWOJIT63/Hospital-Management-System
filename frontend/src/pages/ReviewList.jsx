import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../utils/api";
import ReviewCard from "../components/ReviewCard";

function capitalize(str = "") {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function ReviewList() {
  const { entity, id } = useParams();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      setError(null);
      try {
        let res;
        if (entity === "doctor") {
          res = await api.getDoctorReviews(id);
        } else if (
          entity === "hospital" ||
          entity === "clinic" ||
          entity === "facility"
        ) {
          res = await api.getFacilityReviews(id);
        } else if (entity === "service") {
          res = await api.getServiceReviews(id);
        } else {
          throw new Error(`Unknown review entity: ${entity}`);
        }
        setReviews(Array.isArray(res) ? res : []);
      } catch (err) {
        setError(err.message || "Failed to fetch reviews");
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetch();
  }, [entity, id]);

  const title = `Reviews for ${capitalize(entity)} ${id}`;

  const mappedReviews = (reviews || []).map((r) => ({
    id: r._id,
    name: r.authorId?.name || "Anonymous",
    star: r.rating || 0,
    fb: r.text || "",
    date: r.createdAt ? new Date(r.createdAt).toLocaleDateString() : "",
  }));

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12">
      <div className="max-w-5xl mx-auto px-4">
        <button
          onClick={() => navigate(-1)}
          className="text-sm font-semibold text-slate-600 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white"
        >
          ← Back
        </button>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mt-6 mb-6">
          {title}
        </h1>

        {loading && <p className="text-slate-500">Loading reviews…</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && mappedReviews.length === 0 && (
          <p className="text-slate-500">No reviews yet for this {entity}.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {mappedReviews.map((rev) => (
            <ReviewCard key={rev.id} rev={rev} />
          ))}
        </div>
      </div>
    </div>
  );
}
