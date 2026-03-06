import React, { useState, useEffect } from 'react';
import { Hexagon, Star, AlertTriangle } from 'lucide-react';
import { T } from './Helpers';

export const ReviewsSection = ({ data, refresh }) => {
    const [revs, setRevs] = useState([]);

    useEffect(() => {
        if (data && data.reviewsData) {
            setRevs(data.reviewsData);
        }
    }, [data]);

    const Stars = ({ n }) => (
        <span style={{ color: "#ffb700", display: "flex", gap: 2 }}>
            {[...Array(5)].map((_, i) => <Star key={i} size={12} fill={i < n ? "#ffb700" : "transparent"} strokeWidth={i < n ? 0 : 2} stroke="#ffb700" />)}
        </span>
    );

    const handleDelete = (id) => {
        setRevs(x => x.filter(v => v.id !== id));
        if (refresh) setTimeout(refresh, 1000);
    };

    return (
        <div className="fade-in">
            <T icon={Hexagon} c="WEBSITE REVIEWS" />
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {revs.length === 0 && <div style={{ color: '#5a8a84', padding: '20px 0' }}>No reviews found in the database.</div>}
                {revs.map(r => (
                    <div key={r.id} className="card" style={{ padding: "13px 15px", borderColor: r.flag ? "rgba(255,59,107,0.3)" : "rgba(0,245,212,0.1)" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap", marginBottom: 5 }}>
                                    <span style={{ fontWeight: 700, fontSize: 14 }}>{r.author}</span>
                                    <Stars n={r.rating} />
                                    {r.flag && <span className="tag tag-red" style={{ display: "flex", alignItems: "center", gap: 4 }}><AlertTriangle size={10} /> FLAGGED</span>}
                                    <span className="mono" style={{ fontSize: 9, color: "#5a8a84" }}>{r.date}</span>
                                </div>
                                <div style={{ fontSize: 12, color: "#aaa", marginBottom: 4 }}>on <span style={{ color: "#00f5d4" }}>{r.entity}</span></div>
                                <div style={{ fontSize: 13, color: "#ccc" }}>{r.text}</div>
                            </div>
                            <button className="btn-danger" style={{ flexShrink: 0 }} onClick={() => handleDelete(r.id)}>DELETE</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
