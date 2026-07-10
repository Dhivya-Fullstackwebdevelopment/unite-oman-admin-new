import React, { useState } from 'react';

const REVIEWS = [
  {
    id: 'r1',
    stars: 5,
    aiTag: { label: '🤖 Likely Fake', tone: 'bg-rose-100 text-rose-500' },
    borderColor: '#EF4444',
    text: '"Best service ever! Mohammed is absolutely perfect and amazing in every way!!"',
    meta: 'New account · 0 bookings',
    state: 'pending',
  },
  {
    id: 'r2',
    stars: 1,
    aiTag: { label: '🤖 Abuse + Competitor', tone: 'bg-amber-100 text-amber-600' },
    borderColor: '#F59E0B',
    text: '"[abusive text] worst company, use [competitor] instead!!"',
    meta: 'Khalid M. · 8 bookings',
    state: 'pending',
  },
  {
    id: 'r3',
    stars: 5,
    aiTag: { label: '🤖 Genuine', tone: 'bg-emerald-100 text-emerald-600' },
    borderColor: '#10B981',
    text: '"Mohammed arrived on time, professional, AC works perfectly. Will rebook."',
    meta: 'Ahmed R. · 12 bookings',
    state: 'published',
  },
];

const Reviews = () => {
  const [reviews, setReviews] = useState(REVIEWS);

  const setState = (id, state) =>
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, state } : r)));

  return (
    <div className="flex-1 overflow-y-auto bg-[#F4F5F8] p-[24px]">
      <div className="flex items-center justify-between mb-[18px]">
        <div>
          <div className="font-extrabold text-[22px] leading-none text-[#0A0A0F]">Review Moderation</div>
          <div className="text-[14px] leading-none text-[#9090A0] mt-[4px]">8,247 total · AI flags suspicious content</div>
        </div>
        <div className="flex items-center gap-[6px] bg-[#D61CA80D] border border-[#D61CA826] rounded-full px-[14px] py-[7px]">
          <span>✨</span>
          <span className="text-[12px] font-semibold text-[#D61CA8]">AI Moderation Active</span>
        </div>
      </div>

      {/* AI banner */}
      <div className="bg-[#F59E0B0D] border border-[#F59E0B33] rounded-[13px] px-[16px] py-[12px] mb-[18px] flex gap-[8px]">
        <span>✨</span>
        <span className="text-[13px] leading-relaxed text-[#6B7280]">
          <strong className="text-[#D97706]">AI flagged 3 reviews</strong> this week for fake content, abusive language, and competitor mentions.
        </span>
      </div>

      <div className="grid grid-cols-3 gap-[14px]">
        {reviews.map((r) => (
          <div
            key={r.id}
            className="bg-white rounded-[16px] p-[17px] shadow-[0_1px_5px_rgba(0,0,0,0.05)]"
            style={{ borderTop: `3px solid ${r.borderColor}` }}
          >
            <div className="flex items-center justify-between mb-[9px]">
              <span className="text-[15px] text-[#F59E0B]">{'★'.repeat(r.stars)}{'☆'.repeat(5 - r.stars)}</span>
              <div className={`px-[9px] py-[3px] rounded text-[10px] font-bold ${r.aiTag.tone}`}>{r.aiTag.label}</div>
            </div>
            <div className="text-[13px] leading-relaxed text-[#0A0A0F] mb-[6px]">{r.text}</div>
            <div className="text-[11px] text-[#9090A0] mb-[13px]">{r.meta}</div>
            <div className="flex gap-[6px]">
              <button
                onClick={() => setState(r.id, 'removed')}
                className="flex-1 py-[8px] bg-[#FFE4E6] rounded-[9px] text-center text-[11px] font-bold text-[#EF4444]"
              >
                Remove
              </button>
              {r.state === 'published' ? (
                <button
                  disabled
                  className="flex-1 py-[8px] bg-[#D1FAE5] rounded-[9px] text-center text-[11px] font-bold text-[#059669]"
                >
                  ✓ Published
                </button>
              ) : (
                <button
                  onClick={() => setState(r.id, 'published')}
                  className="flex-1 py-[8px] bg-[#F8F8FA] border border-[#EBEBEF] rounded-[9px] text-center text-[11px] font-bold text-[#555]"
                >
                  Keep
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;