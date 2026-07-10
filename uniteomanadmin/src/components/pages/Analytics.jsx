import React from 'react';

const DEMAND = [
  { label: '❄️ AC', pct: 38, color: '#D61CA8' },
  { label: '🧹 Cleaning', pct: 24, color: '#8B2EF5' },
  { label: '🔧 Plumbing', pct: 15, color: '#4B6EF5' },
  { label: '⚡ Electrical', pct: 12, color: '#10B981' },
  { label: '💅 Beauty', pct: 8, color: '#F59E0B' },
  { label: 'Others', pct: 3, color: '#C0C0CC' },
];

const CHURN_ALERTS = [
  {
    tone: 'High Risk',
    toneColor: '#EF4444',
    bg: '#FFF1F3',
    border: '#FCA5A5',
    name: 'Ali Al-Maamari',
    detail: '0 jobs in 18 days',
    action: 'Send Retention Offer',
  },
  {
    tone: 'Medium Risk',
    toneColor: '#D97706',
    bg: '#FEF9F0',
    border: '#FDE68A',
    name: 'Omar Al-Jabri',
    detail: 'No booking 32 days',
  },
  {
    tone: 'Recovered Risk ✓',
    toneColor: '#059669',
    bg: '#F0FDF4',
    border: '#BBF7D0',
    name: 'Khalid Al-Farsi',
    detail: 'Re-engaged via AI push',
  },
];

const Analytics = () => {
  return (
    <div className="flex-1 overflow-y-auto bg-[#F4F5F8] p-[24px]">
      <div className="flex items-center justify-between mb-[18px]">
        <div>
          <div className="font-extrabold text-[22px] leading-none text-[#0A0A0F]">Analytics (AI)</div>
          <div className="text-[14px] leading-none text-[#9090A0] mt-[4px]">Demand forecasting · Revenue · Churn · Performance</div>
        </div>
        <div className="flex gap-[8px]">
          <div className="flex items-center gap-[6px] bg-[#D61CA80D] border border-[#D61CA826] rounded-full px-[13px] py-[6px]">
            <span>✨</span>
            <span className="text-[12px] font-semibold text-[#D61CA8]">AI Active</span>
          </div>
          <button className="px-[14px] py-[8px] bg-white border-[1.5px] border-[#EBEBEF] rounded-[9px] text-[12px] font-medium text-[#6B7280]">
            July 2026 ▾
          </button>
        </div>
      </div>

      {/* AI weekly summary */}
      <div className="bg-[#D61CA80A] border border-[#D61CA81F] rounded-[13px] px-[16px] py-[13px] mb-[18px] flex gap-[9px]">
        <span>🤖</span>
        <div className="text-[13px] leading-relaxed text-[#6B7280]">
          <strong className="text-[#D61CA8]">AI Weekly:</strong> Bookings ↑18% vs last week. AC demand peaking. 3 vendors risk churn — 0 bookings in 14+ days. Bowsher underserved — 38 unmatched bookings last 7 days. Recommend recruiting 4 more AC techs.
        </div>
      </div>

      <div className="grid grid-cols-[1.5fr_1fr_1fr] gap-[14px]">
        {/* Revenue chart */}
        <div className="bg-white rounded-[16px] p-[18px] shadow-[0_1px_5px_rgba(0,0,0,0.05)]">
          <div className="flex items-center justify-between mb-[13px]">
            <div className="text-[15px] font-bold text-[#0A0A0F]">Revenue (90 days)</div>
            <div className="flex items-center gap-[4px]">
              <span className="text-[12px]">✨</span>
              <span className="text-[11px] font-semibold text-[#D61CA8]">AI forecast</span>
            </div>
          </div>
          <svg viewBox="0 0 400 90" className="w-full h-[90px]">
            <defs>
              <linearGradient id="rc" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#D61CA8" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#D61CA8" stopOpacity="0" />
              </linearGradient>
            </defs>
            <polyline
              points="0,80 30,72 60,65 90,70 120,55 150,48 180,52 210,40 240,35 270,38 300,28"
              fill="none" stroke="#D61CA8" strokeWidth="2" strokeLinecap="round"
            />
            <polyline
              points="300,28 330,22 360,18 390,12"
              fill="none" stroke="#D61CA8" strokeWidth="2" strokeDasharray="5 4" opacity="0.6"
            />
            <polygon
              points="0,80 30,72 60,65 90,70 120,55 150,48 180,52 210,40 240,35 270,38 300,28 300,90 0,90"
              fill="url(#rc)"
            />
            <rect x="300" y="0" width="100" height="90" fill="rgba(214,28,168,0.04)" />
            <text x="305" y="10" fontSize="7" fill="#D61CA8">Forecast</text>
          </svg>
          <div className="flex justify-between mt-[6px]">
            <span className="text-[11px] text-[#C0C0CC]">Apr</span>
            <span className="text-[11px] text-[#C0C0CC]">May</span>
            <span className="text-[11px] text-[#C0C0CC]">Jun</span>
            <span className="text-[11px] text-[#D61CA8]">Jul</span>
            <span className="text-[11px] text-[#D61CA880]">Aug✨</span>
          </div>
        </div>

        {/* Demand by service */}
        <div className="bg-white rounded-[16px] p-[18px] shadow-[0_1px_5px_rgba(0,0,0,0.05)]">
          <div className="text-[15px] font-bold text-[#0A0A0F] mb-[13px]">Demand by Service</div>
          {DEMAND.map((d) => (
            <div key={d.label} className="mb-[9px] last:mb-0">
              <div className="flex justify-between mb-[3px]">
                <span className="text-[12px] font-medium text-[#0A0A0F]">{d.label}</span>
                <span className="text-[11px] font-bold" style={{ color: d.color }}>{d.pct}%</span>
              </div>
              <div className="h-[5px] bg-[#F0F0F4] rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${d.pct}%`, background: d.color }} />
              </div>
            </div>
          ))}
        </div>

        {/* Churn alerts */}
        <div className="bg-white rounded-[16px] p-[18px] shadow-[0_1px_5px_rgba(0,0,0,0.05)]">
          <div className="flex items-center gap-[5px] mb-[13px]">
            <span>✨</span>
            <div className="text-[15px] font-bold text-[#0A0A0F]">AI Churn Alerts</div>
          </div>
          {CHURN_ALERTS.map((c) => (
            <div
              key={c.name}
              className="rounded-[11px] px-[13px] py-[11px] mb-[8px] last:mb-0"
              style={{ background: c.bg, border: `1px solid ${c.border}` }}
            >
              <div className="text-[12px] font-bold mb-[4px]" style={{ color: c.toneColor }}>{c.tone}</div>
              <div className="text-[12px] font-semibold text-[#0A0A0F]">{c.name}</div>
              <div className="text-[11px] mt-[2px]" style={{ color: c.toneColor }}>{c.detail}</div>
              {c.action && (
                <button
                  className="mt-[8px] px-[11px] py-[5px] rounded-[7px] text-[10px] font-bold text-white"
                  style={{ background: c.toneColor }}
                >
                  {c.action}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;