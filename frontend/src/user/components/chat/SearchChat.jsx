"use client";

import { useState, useRef, useEffect } from "react";
import { X, Search, ChevronUp, ChevronDown } from "lucide-react";

export default function SearchChat({ messages, onClose, onHighlight }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setCurrentIndex(0);
      onHighlight(null);
      return;
    }
    const found = messages
      .filter((m) => m.text && m.text.toLowerCase().includes(query.toLowerCase()))
      .map((m) => m.id);
    setResults(found);
    setCurrentIndex(0);
    if (found.length > 0) {
      onHighlight(found[0]);
    } else {
      onHighlight(null);
    }
  }, [query, messages]);

  const goNext = () => {
    if (results.length === 0) return;
    const next = (currentIndex + 1) % results.length;
    setCurrentIndex(next);
    onHighlight(results[next]);
  };

  const goPrev = () => {
    if (results.length === 0) return;
    const prev = (currentIndex - 1 + results.length) % results.length;
    setCurrentIndex(prev);
    onHighlight(results[prev]);
  };

  return (
    <div className="flex items-center gap-2 p-3 px-5 bg-white border-b border-[#50df20]/10 animate-in slide-in-from-top duration-200">
      <Search className="w-4 h-4 text-slate-400 shrink-0" />
      <input
        ref={inputRef}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search in conversation..."
        className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
      />
      {results.length > 0 && (
        <span className="text-[10px] font-bold text-slate-400 shrink-0">
          {currentIndex + 1} of {results.length}
        </span>
      )}
      {query && results.length === 0 && (
        <span className="text-[10px] font-bold text-slate-400 shrink-0">No results</span>
      )}
      <div className="flex items-center gap-0.5">
        <button
          onClick={goPrev}
          disabled={results.length === 0}
          className="p-1.5 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 disabled:opacity-30 transition-colors"
          aria-label="Previous result"
        >
          <ChevronUp className="w-4 h-4" />
        </button>
        <button
          onClick={goNext}
          disabled={results.length === 0}
          className="p-1.5 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 disabled:opacity-30 transition-colors"
          aria-label="Next result"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
      <button
        onClick={onClose}
        className="p-1.5 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        aria-label="Close search"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
