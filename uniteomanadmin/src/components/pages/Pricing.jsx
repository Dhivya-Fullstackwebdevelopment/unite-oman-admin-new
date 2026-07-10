import React, { useState } from 'react';

const CATEGORIES = ['All', 'AC & HVAC', 'Cleaning', 'Plumbing', 'Electrical', 'Beauty', 'Carpentry', 'Pest', 'Painting', 'Appliance', 'Other'];

const SERVICES = [
  { name: 'AC Deep Cleaning', min: 'OMR 10', max: 'OMR 25', platform: '15%', vat: '9%', area: 'Per area ✓' },
  { name: 'AC Repair & Diagnosis', min: 'OMR 18', max: 'OMR 40', platform: '15%', vat: '9%', area: 'Per area ✓' },
  { name: 'AC Annual Contract', min: 'OMR 70/yr', max: 'OMR 120/yr', platform: '12%', vat: '9%', area: 'Flat' },
  { name: 'Home Deep Cleaning', min: 'OMR 30', max: 'OMR 70', platform: '15%', vat: '9%', area: 'Per area ✓' },
  { name: 'Regular Cleaning', min: 'OMR 15', max: 'OMR 40', platform: '15%', vat: '9%', area: 'Per area ✓' },
  { name: 'Plumbing Leak Fix', min: 'OMR 8', max: 'OMR 20', platform: '15%', vat: '9%', area: 'Flat' },
  { name: 'Electrical Repair', min: 'OMR 8', max: 'OMR 30', platform: '15%', vat: '9%', area: 'Per area ✓' },
  { name: 'Beauty — Manicure', min: 'OMR 12', max: 'OMR 25', platform: '15%', vat: '9%', area: 'Flat' },
  { name: 'Pest Control', min: 'OMR 15', max: 'OMR 40', platform: '15%', vat: '9%', area: 'Flat' },
];

const gridCols = 'grid-cols-[1.4fr_105px_105px_95px_85px_100px_90px]';

const Pricing = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <div className="flex-1 overflow-y-auto bg-[#F4F5F8] p-[24px]">
      <div className="font-extrabold text-[22px] leading-none text-[#0A0A0F] mb-[6px]">Service Pricing Management</div>
      <div className="text-[14px] text-[#9090A0] mb-[18px]">
        Set floor/cap for all household services · Vendors cannot price outside this range
      </div>

      {/* Category pills */}
      <div className="flex gap-[8px] mb-[16px] flex-wrap">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-[15px] py-[6px] rounded-full text-[12px] ${
              activeCategory === cat
                ? 'bg-gradient-to-r from-[#D61CA8] to-[#8B2EF5] font-bold text-white'
                : 'bg-white border-[1.5px] border-[#EBEBEF] font-medium text-[#9090A0]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Pricing table */}
      <div className="bg-white rounded-[14px] overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
        <div className={`grid ${gridCols} gap-2 px-[16px] py-[10px] bg-[#F8F8FA] border-b border-[#EBEBEF]`}>
          {['Service', 'Min Price', 'Max Price', 'Platform %', 'VAT', 'Area Pricing', 'Edit'].map((h) => (
            <span key={h} className="text-[10px] font-semibold text-[#9090A0] uppercase tracking-[0.5px]">{h}</span>
          ))}
        </div>
        {SERVICES.map((s) => (
          <div key={s.name} className={`grid ${gridCols} gap-2 px-[16px] py-[11px] border-b border-[#F8F8F8] items-center`}>
            <span className="text-[13px] font-semibold text-[#0A0A0F]">{s.name}</span>
            <div className="bg-[#F0FDF4] border-[1.5px] border-[#BBF7D0] rounded-[8px] px-[10px] py-[5px] text-[12px] font-bold text-[#059669] w-fit">
              {s.min}
            </div>
            <div className="bg-[#FFE4E6] border-[1.5px] border-[#FCA5A5] rounded-[8px] px-[10px] py-[5px] text-[12px] font-bold text-[#EF4444] w-fit">
              {s.max}
            </div>
            <div className="bg-[#DBEAFE] rounded-[8px] px-[10px] py-[5px] text-[12px] font-semibold text-[#2563EB] w-fit">
              {s.platform}
            </div>
            <div className="bg-[#FEF3C7] rounded-[8px] px-[10px] py-[5px] text-[12px] font-semibold text-[#D97706] w-fit">
              {s.vat}
            </div>
            <span className={`text-[12px] font-medium ${s.area === 'Flat' ? 'text-[#9090A0]' : 'text-[#10B981]'}`}>
              {s.area}
            </span>
            <button className="px-[12px] py-[5px] bg-[#D61CA814] rounded-[7px] text-[11px] font-bold text-[#D61CA8] w-fit">
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;