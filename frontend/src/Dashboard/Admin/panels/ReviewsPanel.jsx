import React, { useState, useEffect } from "react";
import {
  Star,
  MessageSquare,
  Reply,
  HeartPulse,
  Send,
  X,
  Edit,
  Trash2,
  Loader2,
} from "lucide-react";
import {
  Card,
  SectionHdr,
  SearchBar,
  StatCard,
  Chip,
} from "../components/AdminUI";
import { GRADS } from "../adminData";
import { api } from "../../../utils/api";

export default function ReviewsPanel({ fac }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replyId, setReplyId] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [search, setSearch] = useState("");

  // Fetch Reviews from DB
  const fetchReviews = async () => {
    if (!fac || !fac._id) return;
    try {
      setLoading(true);
      const data = await api.getFacilityReviews(fac._id);
      setReviews(data);
    } catch (err) {
      console.error("Failed to load reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [fac]);

  const filtered = reviews.filter(
    (r) =>
      !search ||
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.dept.toLowerCase().includes(search.toLowerCase()) ||
      r.text.toLowerCase().includes(search.toLowerCase()),
  );
  const avg =
    reviews.length > 0
      ? (reviews.reduce((a, b) => a + b.rating, 0) / reviews.length).toFixed(1)
      : "0.0";

  
  const del = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await api.deleteReview(id, token);
      setReviews((rr) => rr.filter((r) => r._id !== id));
    } catch (error) {
      console.error("Failed to delete review:", error);
    }
  };

  
  const sendReply = async (id) => {
    if (!replyText.trim()) return;
    try {
      const token = localStorage.getItem("token");
      const updatedReview = await api.replyToReview(id, replyText, token);
      setReviews((rr) => rr.map((r) => (r._id === id ? updatedReview : r)));
      setReplyId(null);
      setReplyText("");
    } catch (error) {
      console.error("Failed to post reply:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 size={32} className="animate-spin text-green-500" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-3 gap-4">
        <StatCard
          icon={Star}
          label="Average Rating"
          value={avg}
          sub={`${reviews.length} reviews`}
          color="green"
        />
        <StatCard
          icon={MessageSquare}
          label="Total Reviews"
          value={reviews.length}
          sub="All time"
          color="green"
        />
        <StatCard
          icon={Reply}
          label="Replied"
          value={reviews.filter((r) => r.reply).length}
          sub="Have responses"
          color="teal"
        />
      </div>

      <Card>
        <SectionHdr
          icon={MessageSquare}
          title="Patient Reviews"
          sub={`${filtered.length} reviews`}
        >
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search reviews…"
          />
        </SectionHdr>
        <div className="flex flex-col gap-4">
          {filtered.map((r) => (
            <div
              key={r._id}
              className="border border-slate-100 dark:border-slate-800 rounded-2xl p-5 hover:border-green-200 dark:hover:border-green-500/30 transition-all bg-white dark:bg-slate-900"
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-10 h-10 bg-gradient-to-br ${GRADS[r._id % GRADS.length]} rounded-xl flex items-center justify-center text-white font-black text-sm shrink-0`}
                >
                  {r.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
                    <div className="flex items-center gap-2">
                      <p className="font-black text-slate-800 dark:text-slate-200 text-sm">
                        {r.name}
                      </p>
                      <Chip label={r.dept} color="green" />
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-slate-400 dark:text-slate-500">
                        {r.date}
                      </p>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star
                            key={i}
                            size={11}
                            className={
                              i <= r.rating
                                ? "text-green-400 fill-green-400"
                                : "text-slate-200 dark:text-slate-700 fill-slate-200 dark:fill-slate-700"
                            }
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {r.text}
                  </p>

                  {r.reply && (
                    <div className="mt-3 bg-green-50 dark:bg-green-500/10 border border-green-100 dark:border-green-500/20 rounded-xl p-3 flex gap-2">
                      <div className="w-7 h-7 bg-green-600 rounded-lg flex items-center justify-center shrink-0">
                        <HeartPulse size={13} className="text-white" />
                      </div>
                      <div>
                        <p className="text-xs font-black text-green-700 dark:text-green-400 mb-0.5">
                          Official Response
                        </p>
                        <p className="text-xs text-green-600 dark:text-green-300 leading-relaxed">
                          {r.reply}
                        </p>
                      </div>
                    </div>
                  )}

                  {replyId === r._id && (
                    <div className="mt-3 flex gap-2">
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Write your response…"
                        rows={2}
                        className="flex-1 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-green-500 resize-none bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500"
                      />
                      <div className="flex flex-col gap-1">
                        <button
                          onClick={() => sendReply(r._id)}
                          className="w-9 h-9 bg-green-600 hover:bg-green-500 rounded-xl flex items-center justify-center text-white transition"
                        >
                          <Send size={13} />
                        </button>
                        <button
                          onClick={() => {
                            setReplyId(null);
                            setReplyText("");
                          }}
                          className="w-9 h-9 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl flex items-center justify-center text-slate-500 dark:text-slate-400 transition"
                        >
                          <X size={13} />
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2 mt-3">
                    {!r.reply && (
                      <button
                        onClick={() => {
                          setReplyId(r._id);
                          setReplyText(r.reply || "");
                        }}
                        className="flex items-center gap-1.5 text-xs font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-lg px-3 py-1.5 hover:bg-green-100 dark:hover:bg-green-500/20 transition"
                      >
                        <Reply size={11} />
                        Reply
                      </button>
                    )}
                    {r.reply && (
                      <button
                        onClick={() => {
                          setReplyId(r._id);
                          setReplyText(r.reply);
                        }}
                        className="flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                      >
                        <Edit size={11} />
                        Edit Reply
                      </button>
                    )}
                    <button
                      onClick={() => del(r._id)}
                      className="flex items-center gap-1.5 text-xs font-bold text-rose-500 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 rounded-lg px-3 py-1.5 hover:bg-rose-100 dark:hover:bg-rose-500/20 transition"
                    >
                      <Trash2 size={11} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-10 text-slate-400 dark:text-slate-500">
              <MessageSquare size={32} className="mx-auto mb-2 opacity-30" />
              <p className="text-sm">No reviews found</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
