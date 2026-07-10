import React from 'react';

const VENDORS = [
  {
    initial: 'M',
    name: 'Mohammed Al-Rashdi',
    meta: 'Individual · AC & Electrical · 5 yrs',
    badges: [
      { label: '✓ CR: 1234567 Active', tone: 'ok' },
      { label: '✓ Civil ID: 12345678 Verified', tone: 'ok' },
      { label: 'N/A', tone: 'muted' },
      { label: 'HVAC Certified', tone: 'muted' },
    ],
    docs: ['📎 ID Copy', '📎 Trade License', '📎 HVAC Cert'],
    tag: { label: 'Approve', tone: 'ok' },
  },
  {
    initial: 'F',
    name: 'Fatima Al-Zaabi',
    meta: 'Individual · Beauty at Home · 3 yrs',
    badges: [
      { label: '✓ CR: 7654321 Active', tone: 'ok' },
      { label: '✓ Civil ID: 98765432 Verified', tone: 'ok' },
      { label: 'N/A', tone: 'muted' },
      { label: 'Cosmetology License ✓', tone: 'muted' },
    ],
    docs: ['📎 ID Copy', '📎 Cosmetology Cert'],
    tag: { label: 'Approve', tone: 'ok' },
  },
  {
    initial: 'O',
    name: 'Omar Al-Maamari',
    meta: 'LLC · Cleaning · 2 yrs',
    badges: [
      { label: '⚠ CR: Pending verification', tone: 'warn' },
      { label: '✓ Civil ID Verified', tone: 'ok' },
      { label: 'VAT: OM987654321', tone: 'muted' },
      { label: 'None required', tone: 'muted' },
    ],
    docs: ['📎 CR Pending', '📎 ID Copy'],
    tag: { label: 'Review', tone: 'warn' },
  },
];

const badgeTones = {
  ok: 'bg-[#F0FDF4] text-[#059669]',
  warn: 'bg-[#FEF9F0] text-[#D97706]',
  muted: 'bg-[#F8F8FA] text-[#9090A0]',
};

const tagTones = {
  ok: 'bg-[#D1FAE5] text-[#059669]',
  warn: 'bg-[#FEF3C7] text-[#D97706]',
};

const VendorVerification = () => {
  return (
    <div className="flex-1 overflow-y-auto bg-[#F4F5F8] p-[24px]">
      {/* Header row */}
      <div className="flex items-center justify-between mb-[18px]">
        <div>
          <div className="font-extrabold text-[22px] leading-none text-[#0A0A0F]">Vendor Verification</div>
          <div className="text-[14px] leading-none text-[#9090A0] mt-[4px]">MOCI + ROP + OTA govt API checks · 7 pending</div>
        </div>
        <div className="flex gap-[8px]">
          <div className="px-[16px] py-[8px] bg-[#FEF3C7] rounded-[9px] text-[12px] font-bold text-[#D97706]">
            ⏳ 7 Pending
          </div>
          <div className="px-[16px] py-[8px] bg-[#D1FAE5] rounded-[9px] text-[12px] font-bold text-[#059669]">
            ✓ 234 Approved
          </div>
        </div>
      </div>

      {/* Vendor cards */}
      <div className="flex flex-col gap-[14px]">
        {VENDORS.map((v) => (
          <div key={v.name} className="bg-white rounded-[16px] p-[18px] shadow-[0_1px_5px_rgba(0,0,0,0.05)]">
            <div className="flex items-start gap-[16px] mb-[12px]">
              <div className="w-[50px] h-[50px] rounded-full bg-gradient-to-br from-[#D61CA8] to-[#8B2EF5] flex items-center justify-center text-[20px] font-bold text-white flex-shrink-0">
                {v.initial}
              </div>
              <div className="flex-1">
                <div className="text-[16px] font-bold text-[#0A0A0F]">
                  {v.name}{' '}
                  <span className="text-[13px] font-normal text-[#9090A0]">· {v.meta}</span>
                </div>
                <div className="flex gap-[8px] mt-[8px] flex-wrap">
                  {v.badges.map((b, i) => (
                    <div key={i} className={`px-[12px] py-[4px] rounded-[7px] text-[11px] font-semibold ${badgeTones[b.tone]}`}>
                      {b.label}
                    </div>
                  ))}
                </div>
                <div className="flex gap-[7px] mt-[7px]">
                  {v.docs.map((d) => (
                    <div key={d} className="px-[10px] py-[3px] bg-[#DBEAFE] rounded-[6px] text-[11px] font-medium text-[#2563EB]">
                      {d}
                    </div>
                  ))}
                </div>
              </div>
              <div className={`px-[12px] py-[4px] rounded-[7px] text-[12px] font-bold ${tagTones[v.tag.tone]}`}>
                {v.tag.label}
              </div>
            </div>

            <div className="flex gap-[8px]">
              <button className="px-[17px] py-[8px] bg-[#D1FAE5] rounded-[10px] text-[12px] font-bold text-[#059669]">
                ✓ Approve
              </button>
              <button className="px-[17px] py-[8px] bg-[#FEF3C7] rounded-[10px] text-[12px] font-bold text-[#D97706]">
                Request Docs
              </button>
              <button className="px-[17px] py-[8px] bg-[#FFE4E6] rounded-[10px] text-[12px] font-bold text-[#EF4444]">
                Reject
              </button>
              <button className="px-[17px] py-[8px] bg-[#F8F8FA] border border-[#EBEBEF] rounded-[10px] text-[12px] font-semibold text-[#555]">
                View Full Profile
              </button>
              <button className="px-[17px] py-[8px] bg-[#F8F8FA] border border-[#EBEBEF] rounded-[10px] text-[12px] font-semibold text-[#555]">
                Contact Vendor
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorVerification;