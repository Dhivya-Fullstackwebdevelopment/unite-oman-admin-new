import React, { useState } from 'react';

const DISPUTES = [
  {
    id: '#D-006',
    borderColor: '#EF4444',
    statusBadge: { label: 'Escalated', tone: 'bg-rose-100 text-rose-500' },
    aiBadge: { label: 'AI: High Risk', tone: 'bg-[#D61CA814] text-[#D61CA8]' },
    title: 'Pro did not show — 3rd complaint vs Khalid K.',
    detail: 'Nasser Al-Rawahi · #UO-4601 · OMR 17 paid · AC · Bowsher · 2h ago',
  },
  {
    id: '#D-005',
    borderColor: '#F59E0B',
    statusBadge: { label: 'In Review', tone: 'bg-amber-100 text-amber-600' },
    title: 'Service quality — cleaning incomplete',
    detail: 'Sara Al-Balushi · #UO-4599 · OMR 37 · Cleaning · Al Khuwair · 5h ago',
  },
  {
    id: '#D-004',
    borderColor: '#4B6EF5',
    statusBadge: { label: 'Resolved', tone: 'bg-blue-100 text-blue-600' },
    aiBadge: { label: '✨ Auto-resolved', tone: 'bg-[#D61CA814] text-[#D61CA8]' },
    title: 'Duplicate payment charge — auto-detected',
    detail: 'Ahmed Al-Rashdi · #UO-4591 · OMR 17 refunded · BOM · Yesterday',
  },
];

const RESOLUTION_OPTIONS = [
  { icon: '✓', title: 'Full Refund', desc: 'Refund 100% to customer. Debit vendor next payout.', bg: '#D1FAE5', color: '#059669' },
  { icon: '~', title: 'Partial Refund', desc: 'Admin sets amount. Both parties notified.', bg: '#FEF3C7', color: '#D97706' },
  { icon: '↩', title: 'Re-visit', desc: 'Assign same/different vendor for free re-visit.', bg: '#DBEAFE', color: '#2563EB' },
  { icon: '⛔', title: 'Suspend Vendor', desc: 'Block from new bookings. Pending review.', bg: '#FFE4E6', color: '#EF4444' },
  { icon: '🎁', title: 'Promo Credit', desc: 'Give customer OMR 5–20 goodwill credit.', bg: '#F8F8FA', color: '#0A0A0F' },
];

const DISPUTE_STATS = [
  ['Total disputes', '23'],
  ['Avg resolution time', '3.2 hrs'],
  ['AI auto-resolved', '8 (35%)'],
  ['Refunds issued', 'OMR 284'],
  ['Dispute rate', '1.6%'],
];

const Disputes = () => {
  const [selectedResolution, setSelectedResolution] = useState(null);

  return (
    <div className="flex-1 overflow-y-auto bg-[#F4F5F8] p-[24px]">
      <div className="flex items-center justify-between mb-[18px]">
        <div>
          <div className="font-extrabold text-[22px] leading-none text-[#0A0A0F]">Disputes &amp; Complaints</div>
          <div className="text-[14px] leading-none text-[#9090A0] mt-[4px]">8 open · 4 escalated · AI-triaged</div>
        </div>
        <div className="px-[16px] py-[8px] bg-[#FFE4E6] rounded-[9px] text-[12px] font-bold text-[#EF4444]">
          🔴 4 Escalated
        </div>
      </div>

      {/* AI triage banner */}
      <div className="bg-[#D61CA80A] border border-[#D61CA81F] rounded-[13px] px-[16px] py-[12px] mb-[18px] flex gap-[8px]">
        <span>✨</span>
        <div className="text-[13px] leading-relaxed text-[#6B7280]">
          <strong className="text-[#D61CA8]">AI triage:</strong> Dispute #D-006 high priority — 3rd complaint same vendor. Recommend suspension + full refund. #D-005 partial refund likely.
        </div>
      </div>

      <div className="grid grid-cols-[1fr_340px] gap-[16px]">
        {/* Dispute list */}
        <div className="flex flex-col gap-[10px]">
          {DISPUTES.map((d) => (
            <div
              key={d.id}
              className="bg-white rounded-[15px] p-[16px] shadow-[0_1px_4px_rgba(0,0,0,0.04)]"
              style={{ borderLeft: `4px solid ${d.borderColor}` }}
            >
              <div className="flex items-center gap-[8px] mb-[8px]">
                <span className="text-[12px] font-semibold text-[#9090A0] font-mono">{d.id}</span>
                <div className={`px-[9px] py-[3px] rounded text-[10px] font-bold ${d.statusBadge.tone}`}>
                  {d.statusBadge.label}
                </div>
                {d.aiBadge && (
                  <div className={`px-[9px] py-[3px] rounded text-[10px] font-bold ${d.aiBadge.tone}`}>
                    {d.aiBadge.label}
                  </div>
                )}
              </div>
              <div className="text-[14px] font-semibold text-[#0A0A0F] mb-[4px]">{d.title}</div>
              <div className="text-[12px] text-[#9090A0] mb-[10px]">{d.detail}</div>
              <div className="flex gap-[6px]">
                <button className="px-[14px] py-[7px] bg-[#D1FAE5] rounded-[9px] text-[11px] font-bold text-[#059669]">Refund</button>
                <button className="px-[14px] py-[7px] bg-[#FFE4E6] rounded-[9px] text-[11px] font-bold text-[#EF4444]">Suspend Vendor</button>
                <button className="px-[14px] py-[7px] bg-[#DBEAFE] rounded-[9px] text-[11px] font-bold text-[#2563EB]">Re-visit</button>
                <button className="px-[14px] py-[7px] bg-[#F8F8FA] border border-[#EBEBEF] rounded-[9px] text-[11px] font-semibold text-[#555]">View Chat</button>
              </div>
            </div>
          ))}
        </div>

        {/* Resolution panel */}
        <div className="flex flex-col gap-[10px]">
          <div className="bg-white rounded-[16px] p-[17px] shadow-[0_1px_5px_rgba(0,0,0,0.05)]">
            <div className="text-[15px] font-bold text-[#0A0A0F] mb-[13px]">Resolution Options</div>
            {RESOLUTION_OPTIONS.map((r) => (
              <button
                key={r.title}
                onClick={() => setSelectedResolution(r.title)}
                className={`w-full text-left rounded-[11px] px-[13px] py-[11px] mb-[8px] last:mb-0 ${
                  selectedResolution === r.title ? 'ring-2 ring-[#D61CA8]' : ''
                }`}
                style={{ background: r.bg }}
              >
                <div className="text-[12px] font-bold mb-[3px]" style={{ color: r.color }}>
                  {r.icon} {r.title}
                </div>
                <div className="text-[11px] leading-snug text-[#6B7280]">{r.desc}</div>
              </button>
            ))}
            <button className="w-full mt-[10px] py-[11px] bg-gradient-to-r from-[#D61CA8] to-[#8B2EF5] rounded-[11px] text-center text-[12px] font-bold text-white">
              Apply Resolution
            </button>
          </div>

          <div className="bg-white rounded-[16px] p-[17px] shadow-[0_1px_5px_rgba(0,0,0,0.05)]">
            <div className="text-[15px] font-bold text-[#0A0A0F] mb-[12px]">Dispute Stats (July)</div>
            {DISPUTE_STATS.map(([label, value], i) => (
              <div
                key={label}
                className={`flex justify-between py-[6px] ${i < DISPUTE_STATS.length - 1 ? 'border-b border-[#F5F5F5]' : ''}`}
              >
                <span className="text-[12px] text-[#6B7280]">{label}</span>
                <span className="text-[12px] font-bold text-[#0A0A0F]">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Disputes;