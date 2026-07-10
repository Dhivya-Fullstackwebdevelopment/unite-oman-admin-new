import React from 'react';

const STATS = [
  { label: 'Active Plans', value: '219', color: '#D61CA8', note: 'This month' },
  { label: 'Credits Revenue', value: 'OMR 5,420', color: '#10B981', note: 'Monthly' },
  { label: 'Credits Issued', value: '8,760', color: '#4B6EF5', note: 'This month' },
  { label: 'Credits Used', value: '7,204', color: '#F59E0B', note: '87% usage rate' },
];

const PLANS = [
  { name: 'Starter (OMR 10)', vendors: '45 vendors', total: 'OMR 450', color: '#F59E0B' },
  { name: 'Professional (OMR 25)', vendors: '120 vendors', total: 'OMR 3,000', color: '#D61CA8' },
  { name: 'Business (OMR 60)', vendors: '50 vendors', total: 'OMR 3,000', color: '#4B6EF5' },
  { name: 'Custom', vendors: '4 vendors', total: 'OMR 970', color: '#8B2EF5' },
];

const VENDOR_STATUS = [
  { name: 'Mohammed Al-Balushi', plan: 'Professional', credits: '240 credits', color: '#10B981' },
  { name: 'Al Ameera Tech LLC', plan: 'Business', credits: '1,180 credits', color: '#4B6EF5' },
  { name: 'Fatima Al-Zaabi', plan: 'Starter', credits: '12 credits', color: '#F59E0B' },
  { name: 'Khalid Al-Rashidi', plan: 'Starter', credits: '0 credits — Blocked', color: '#EF4444' },
];

const CreditsPlans = () => {
  return (
    <div className="flex-1 overflow-y-auto bg-[#F4F5F8] p-[24px]">
      <div className="flex items-center justify-between mb-[18px]">
        <div>
          <div className="font-extrabold text-[22px] leading-none text-[#0A0A0F]">Credits &amp; Plans</div>
          <div className="text-[14px] leading-none text-[#9090A0] mt-[4px]">Manage vendor plans · Grant/deduct credits · Revenue</div>
        </div>
        <button className="px-[18px] py-[8px] bg-gradient-to-r from-[#D61CA8] to-[#8B2EF5] rounded-[9px] text-[12px] font-bold text-white">
          Grant Credits
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-[12px] mb-[18px]">
        {STATS.map((s) => (
          <div key={s.label} className="bg-white rounded-[13px] p-[15px] shadow-[0_1px_4px_rgba(0,0,0,0.05)]">
            <div className="text-[11px] text-[#9090A0] uppercase tracking-[0.5px] mb-[6px]">{s.label}</div>
            <div className="text-[21px] font-extrabold" style={{ color: s.color }}>{s.value}</div>
            <div className="text-[11px] text-[#9090A0] mt-[4px]">{s.note}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-[14px]">
        {/* Plan distribution */}
        <div className="bg-white rounded-[16px] p-[18px] shadow-[0_1px_5px_rgba(0,0,0,0.05)]">
          <div className="text-[15px] font-bold text-[#0A0A0F] mb-[13px]">Plan Distribution</div>
          {PLANS.map((p) => (
            <div key={p.name} className="flex items-center justify-between px-[12px] py-[10px] bg-[#F8F8FA] rounded-[10px] mb-[7px] last:mb-0">
              <div>
                <div className="text-[13px] font-semibold text-[#0A0A0F]">{p.name}</div>
                <div className="text-[11px] text-[#9090A0] mt-[1px]">{p.vendors}</div>
              </div>
              <div className="text-[13px] font-bold" style={{ color: p.color }}>{p.total}</div>
            </div>
          ))}
        </div>

        {/* Vendor credit status */}
        <div className="bg-white rounded-[16px] p-[18px] shadow-[0_1px_5px_rgba(0,0,0,0.05)]">
          <div className="text-[15px] font-bold text-[#0A0A0F] mb-[13px]">Vendor Credit Status</div>
          {VENDOR_STATUS.map((v) => (
            <div key={v.name} className="flex items-center justify-between px-[12px] py-[10px] bg-[#F8F8FA] rounded-[10px] mb-[7px] last:mb-0">
              <div>
                <div className="text-[12px] font-semibold text-[#0A0A0F]">{v.name}</div>
                <div className="text-[11px] text-[#9090A0] mt-[1px]">{v.plan}</div>
              </div>
              <div className="flex items-center gap-[8px]">
                <div className="text-[12px] font-bold" style={{ color: v.color }}>{v.credits}</div>
                <button className="px-[10px] py-[4px] bg-[#D61CA814] rounded-[7px] text-[10px] font-bold text-[#D61CA8]">
                  Manage
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreditsPlans;