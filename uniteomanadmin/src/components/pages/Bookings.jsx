import React, { useState } from 'react';

const ALL_BOOKINGS = [
  { id: '#4601', service: 'AC Deep Cleaning', customer: 'Ahmed Al-Rashdi', pro: 'Mohammed A.', dateArea: 'Today 2pm · Qurum', price: 'OMR 17.985', payment: 'Paid', status: 'En Route' },
  { id: '#4600', service: 'Home Deep Cleaning', customer: 'Fatima Al-Balushi', pro: 'Salim Al-H.', dateArea: 'Today 3pm · Al Khuwair', price: 'OMR 52.000', payment: 'Paid', status: 'In Progress' },
  { id: '#4599', service: 'Beauty at Home', customer: 'Sara Al-Rawahi', pro: 'Unassigned', dateArea: 'Today 4pm · MSQ Hills', price: 'OMR 45.000', payment: 'Paid', status: 'Unassigned' },
  { id: '#4598', service: 'Plumbing Repair', customer: 'Omar Al-Jabri', pro: 'Khalid Al-H.', dateArea: 'Today 11am · Bowsher', price: 'OMR 16.100', payment: 'Paid', status: 'Completed' },
  { id: '#4597', service: 'Electrical Repair', customer: 'Yousef Al-Kindi', pro: 'Khalid Al-Farsi', dateArea: 'Today 9am · Seeb', price: 'OMR 28.000', payment: 'Paid', status: 'Completed' },
  { id: '#4596', service: 'Home Cleaning', customer: 'Laila Al-Amri', pro: 'Salim Al-Habsi', dateArea: 'Yesterday · Azaiba', price: 'OMR 33.000', payment: 'Refunded', status: 'Cancelled' },
  { id: '#4595', service: 'AC Deep Clean', customer: 'Faisal Al-Harthy', pro: 'Mohammed A.', dateArea: 'Yesterday · Ghubra', price: 'OMR 17.000', payment: 'Paid', status: 'Completed' },
  { id: '#4594', service: 'Pest Control', customer: 'Nasser Al-Rawahi', pro: 'Ali Al-Maamari', dateArea: 'Today 1pm · Ruwi', price: 'OMR 22.500', payment: 'Pending', status: 'Scheduled' },
];

const FILTER_TABS = [
  { label: 'All', count: 147 },
  { label: 'En Route', count: 23 },
  { label: 'In Progress', count: 18 },
  { label: 'Scheduled', count: 54 },
  { label: 'Completed', count: 48 },
  { label: 'Unassigned', count: 12 },
  { label: 'Cancelled', count: 4 },
];

const statusStyles = {
  'En Route': 'bg-blue-100 text-blue-600',
  'In Progress': 'bg-amber-100 text-amber-600',
  'Completed': 'bg-emerald-100 text-emerald-600',
  'Unassigned': 'bg-rose-100 text-rose-500',
  'Scheduled': 'bg-purple-100 text-purple-600',
  'Cancelled': 'bg-red-100 text-red-500',
};

const paymentStyles = {
  Paid: 'bg-emerald-100 text-emerald-600',
  Pending: 'bg-amber-100 text-amber-600',
  Refunded: 'bg-slate-100 text-slate-500',
};

const gridCols = 'grid-cols-[100px_1.4fr_1fr_1fr_100px_100px_110px_90px_130px]';

const Bookings = () => {
  const [activeTab, setActiveTab] = useState('All');

  const filtered = activeTab === 'All'
    ? ALL_BOOKINGS
    : ALL_BOOKINGS.filter((b) => b.status === activeTab);

  return (
    <div className="flex-1 overflow-y-auto bg-[#F4F5F8] p-[24px]">
      {/* Header row */}
      <div className="flex items-center justify-between mb-[18px]">
        <div>
          <div className="font-extrabold text-[22px] leading-none text-[#0A0A0F]">All Bookings</div>
          <div className="text-[14px] leading-none text-[#9090A0] mt-[4px]">147 today · Full history + export</div>
        </div>
        <div className="flex gap-[8px]">
          <input
            className="bg-white border-[1.5px] border-[#EBEBEF] rounded-lg px-[14px] py-[9px] text-[13px] text-[#0A0A0F] outline-none w-[240px] placeholder:text-[#9090A0]"
            placeholder="Search bookings..."
          />
          <button className="px-[14px] py-[9px] bg-white border-[1.5px] border-[#EBEBEF] rounded-lg text-[12px] font-medium text-[#6B7280]">
            Status ▾
          </button>
          <button className="px-[14px] py-[9px] bg-white border-[1.5px] border-[#EBEBEF] rounded-lg text-[12px] font-medium text-[#6B7280]">
            Area ▾
          </button>
          <button className="px-[14px] py-[9px] bg-white border-[1.5px] border-[#EBEBEF] rounded-lg text-[12px] font-medium text-[#6B7280]">
            Service ▾
          </button>
          <button className="px-[18px] py-[9px] bg-gradient-to-r from-[#D61CA8] to-[#8B2EF5] rounded-lg text-[12px] font-bold text-white">
            Export CSV
          </button>
        </div>
      </div>

      {/* Filter pills */}
      <div className="flex gap-[8px] mb-[18px] flex-wrap">
        {FILTER_TABS.map((tab) => {
          const isActive = activeTab === tab.label;
          return (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
              className={`px-4 py-[8px] rounded-full text-[12px] leading-none transition-colors ${
                isActive
                  ? 'bg-[#D61CA818] border-[1.5px] border-[#D61CA840] font-bold text-[#D61CA8]'
                  : 'bg-white border-[1.5px] border-[#EBEBEF] font-medium text-[#9090A0] hover:text-[#0A0A0F]'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          );
        })}
      </div>

      {/* Table card */}
      <div className="bg-white rounded-[14px] shadow-[0_1px_4px_rgba(0,0,0,0.05)] overflow-hidden">
        <div className={`grid ${gridCols} gap-2 px-[16px] py-[10px] bg-[#F8F8FA] border-b border-[#EBEBEF]`}>
          {['ID', 'Service · Customer', 'Professional', 'Date · Area', 'Price', 'Payment', 'Status', '', 'Actions'].map((h, i) => (
            <span key={i} className="text-[10px] font-semibold text-[#9090A0] uppercase tracking-[0.5px]">{h}</span>
          ))}
        </div>

        {filtered.map((b) => (
          <div
            key={b.id}
            className={`grid ${gridCols} gap-2 px-[16px] py-[13px] border-b border-[#F8F8F8] items-center`}
          >
            <span className="text-[12px] font-medium text-[#9090A0] font-mono">{b.id}</span>
            <div>
              <div className="text-[14px] font-semibold text-[#0A0A0F] leading-tight">{b.service}</div>
              <div className="text-[11px] text-[#9090A0] leading-tight mt-[2px]">{b.customer}</div>
            </div>
            <span className="text-[12px] font-medium text-[#0A0A0F]">{b.pro}</span>
            <span className="text-[12px] text-[#6B7280]">{b.dateArea}</span>
            <span className="text-[13px] font-bold text-[#0A0A0F]">{b.price}</span>
            <div className={`px-[8px] py-[3px] rounded text-[10px] font-bold inline-block w-fit ${paymentStyles[b.payment]}`}>
              {b.payment}
            </div>
            <div className={`px-[8px] py-[3px] rounded text-[10px] font-bold inline-block w-fit ${statusStyles[b.status]}`}>
              {b.status}
            </div>
            <div></div>
            <div className="flex gap-[5px]">
              <button className="px-[10px] py-[5px] bg-[#F8F8FA] border border-[#EBEBEF] rounded-[6px] text-[10px] font-semibold text-[#555]">
                View
              </button>
              {b.status === 'Unassigned' ? (
                <button className="px-[10px] py-[5px] bg-[#D61CA8] rounded-[6px] text-[10px] font-bold text-white">
                  Assign
                </button>
              ) : (
                <button className="px-[10px] py-[5px] bg-[#D61CA814] rounded-[6px] text-[10px] font-semibold text-[#D61CA8]">
                  Reassign
                </button>
              )}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="py-14 text-center text-base font-medium text-[#9090A0]">No bookings match this filter.</div>
        )}

        {/* Pagination footer */}
        <div className="px-[16px] py-[14px] border-t border-[#F0F0F4] bg-white rounded-b-[14px] flex items-center justify-between">
          <div className="text-[12px] text-[#9090A0]">Showing 1–20 of 147 bookings</div>
          <div className="flex gap-[6px]">
            <button className="px-[12px] py-[6px] bg-white border-[1.5px] border-[#EBEBEF] rounded-md text-[11px] font-medium text-[#9090A0]">← Prev</button>
            <button className="px-[12px] py-[6px] bg-gradient-to-r from-[#D61CA8] to-[#8B2EF5] rounded-md text-[11px] font-bold text-white">1</button>
            <button className="px-[12px] py-[6px] bg-white border-[1.5px] border-[#EBEBEF] rounded-md text-[11px] font-medium text-[#9090A0]">2</button>
            <button className="px-[12px] py-[6px] bg-white border-[1.5px] border-[#EBEBEF] rounded-md text-[11px] font-medium text-[#9090A0]">3</button>
            <button className="px-[12px] py-[6px] bg-white border-[1.5px] border-[#EBEBEF] rounded-md text-[11px] font-medium text-[#9090A0]">...</button>
            <button className="px-[12px] py-[6px] bg-white border-[1.5px] border-[#EBEBEF] rounded-md text-[11px] font-medium text-[#9090A0]">Next →</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookings;