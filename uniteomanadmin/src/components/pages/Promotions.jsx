import React, { useState } from 'react';

const ACTIVE_PROMOS = [
  { icon: '☀️', name: 'Summer AC Deal', detail: '20% off AC · All Muscat · Jul 31', used: 'Used: 247×', metric: 'OMR 2,847' },
  { icon: '🆕', name: 'First Booking', detail: 'OMR 5 off first booking · Code: WELCOME5', used: 'Used: 1,203×', metric: '89% conv.' },
];

const PERFORMANCE = [
  ['Promos sent', '8,247'],
  ['Redemption rate', '34.2%'],
  ['Revenue from promos', 'OMR 14,320'],
  ['Discount cost', 'OMR 2,160'],
  ['Net ROI', '563%'],
];

const Promotions = () => {
  const [form, setForm] = useState({
    name: 'Back-to-School Cleaning',
    discount: '15% off',
    appliesTo: 'Cleaning services',
    segment: 'Lapsed customers (21+ days)',
    validUntil: '31 Jul 2026',
  });

  const updateField = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <div className="flex-1 overflow-y-auto bg-[#F4F5F8] p-[24px]">
      <div className="flex items-center justify-between mb-[18px]">
        <div>
          <div className="font-extrabold text-[22px] leading-none text-[#0A0A0F]">Promotions &amp; Offers</div>
          <div className="text-[14px] leading-none text-[#9090A0] mt-[4px]">Create campaigns · AI targeting · ROI tracking</div>
        </div>
        <button className="px-[19px] py-[10px] bg-gradient-to-r from-[#D61CA8] to-[#8B2EF5] rounded-[11px] text-[13px] font-bold text-white">
          + Create Promo
        </button>
      </div>

      <div className="grid grid-cols-3 gap-[14px]">
        {/* Active promos */}
        <div className="bg-white rounded-[16px] p-[18px] shadow-[0_1px_5px_rgba(0,0,0,0.05)]">
          <div className="text-[15px] font-bold text-[#0A0A0F] mb-[13px]">Active Promos</div>
          {ACTIVE_PROMOS.map((p) => (
            <div key={p.name} className="bg-[#D61CA80D] border border-[#D61CA833] rounded-[12px] px-[13px] py-[12px] mb-[9px] last:mb-0">
              <div className="flex items-center justify-between mb-[5px]">
                <span className="text-[13px] font-bold text-[#D61CA8]">{p.icon} {p.name}</span>
                <div className="px-[7px] py-[2px] bg-[#D1FAE5] rounded text-[9px] font-bold text-[#059669]">Live</div>
              </div>
              <div className="text-[12px] leading-snug text-[#6B7280] mb-[7px]">{p.detail}</div>
              <div className="flex justify-between">
                <span className="text-[11px] text-[#9090A0]">{p.used}</span>
                <span className="text-[11px] font-semibold text-[#D61CA8]">{p.metric}</span>
              </div>
            </div>
          ))}
        </div>

        {/* AI Promo builder */}
        <div className="bg-white rounded-[16px] p-[18px] shadow-[0_1px_5px_rgba(0,0,0,0.05)]">
          <div className="flex items-center gap-[5px] mb-[13px]">
            <span>✨</span>
            <div className="text-[15px] font-bold text-[#0A0A0F]">AI Promo Builder</div>
          </div>

          {[
            { key: 'name', label: 'Promo Name' },
            { key: 'discount', label: 'Discount' },
            { key: 'appliesTo', label: 'Applies to' },
            { key: 'segment', label: 'Target Segment' },
            { key: 'validUntil', label: 'Valid Until' },
          ].map((f) => (
            <div key={f.key} className="mb-[10px]">
              <div className="text-[10px] font-semibold text-[#9090A0] uppercase tracking-[0.6px] mb-[5px]">{f.label}</div>
              <input
                className="w-full bg-[#F8F8FA] border-[1.5px] border-[#EBEBEF] rounded-[10px] px-[12px] py-[9px] text-[12px] text-[#0A0A0F] outline-none"
                value={form[f.key]}
                onChange={updateField(f.key)}
              />
            </div>
          ))}

          <div className="bg-[#D61CA80A] rounded-[9px] px-[12px] py-[9px] mb-[11px] flex gap-[6px]">
            <span className="text-[12px]">✨</span>
            <div className="text-[11px] leading-snug text-[#6B7280]">
              <strong className="text-[#D61CA8]">AI recommends:</strong> Target lapsed Qurum users — highest ROI segment.
            </div>
          </div>

          <button className="w-full py-[11px] bg-gradient-to-r from-[#D61CA8] to-[#8B2EF5] rounded-[11px] text-center text-[12px] font-bold text-white">
            Launch Promotion
          </button>
        </div>

        {/* Campaign performance */}
        <div className="bg-white rounded-[16px] p-[18px] shadow-[0_1px_5px_rgba(0,0,0,0.05)]">
          <div className="text-[15px] font-bold text-[#0A0A0F] mb-[13px]">Campaign Performance</div>
          {PERFORMANCE.map(([label, value]) => (
            <div key={label} className="flex justify-between px-[12px] py-[10px] bg-[#F8F8FA] rounded-[10px] mb-[7px] last:mb-0">
              <span className="text-[12px] text-[#6B7280]">{label}</span>
              <span className={`text-[12px] font-bold ${label === 'Net ROI' ? 'text-[#D61CA8]' : 'text-[#0A0A0F]'}`}>
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Promotions;