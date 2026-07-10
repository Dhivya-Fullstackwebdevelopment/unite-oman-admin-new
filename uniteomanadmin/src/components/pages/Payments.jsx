import React, { useState } from 'react';

const STATS = [
  { label: 'Gross Revenue', value: 'OMR 56,143', color: '#D61CA8', note: '↑ 18% vs June' },
  { label: 'Platform Commission', value: 'OMR 8,421', color: '#10B981', note: '15% of gross' },
  { label: 'Pending Payouts', value: 'OMR 12,847', color: '#F59E0B', note: 'T+1 · 89 vendors' },
  { label: 'Credits Revenue', value: 'OMR 5,420', color: '#4B6EF5', note: '219 plans' },
];

const TABS = ['Customer Payments', 'Vendor Payouts', 'Platform Revenue', 'Refunds'];

const TRANSACTIONS = [
  { id: '#4601', customer: 'Ahmed Al-Rashdi', vendor: 'Mohammed A.', amount: 'OMR 17.985', gateway: 'Bank of Muscat', date: 'Today', status: 'Captured' },
  { id: '#4600', customer: 'Fatima Al-Balushi', vendor: 'Salim Al-H.', amount: 'OMR 52.000', gateway: 'Thawani', date: 'Today', status: 'Captured' },
  { id: '#4599', customer: 'Sara Al-Rawahi', vendor: 'Unassigned', amount: 'OMR 45.000', gateway: 'Bank of Muscat', date: 'Today', status: 'Held' },
  { id: '#4598', customer: 'Omar Al-Jabri', vendor: 'Khalid Al-H.', amount: 'OMR 16.100', gateway: 'Stripe', date: '8 Jul', status: 'Captured' },
  { id: '#4591', customer: 'Ali Al-Maqbali', vendor: 'Ahmed Al-R.', amount: 'OMR 23.000', gateway: 'Bank of Muscat', date: '7 Jul', status: 'Refunded' },
];

const statusStyles = {
  Captured: 'bg-emerald-100 text-emerald-600',
  Held: 'bg-amber-100 text-amber-600',
  Refunded: 'bg-rose-100 text-rose-500',
};

const gridCols = 'grid-cols-[100px_1.2fr_1fr_100px_115px_100px_110px]';

const Payments = () => {
  const [activeTab, setActiveTab] = useState('Customer Payments');

  return (
    <div className="flex-1 overflow-y-auto bg-[#F4F5F8] p-[24px]">
      <div className="flex items-center justify-between mb-[18px]">
        <div>
          <div className="font-extrabold text-[22px] leading-none text-[#0A0A0F]">Payments</div>
          <div className="text-[14px] leading-none text-[#9090A0] mt-[4px]">Customer collections · Vendor payouts · Revenue</div>
        </div>
        <div className="flex gap-[8px]">
          <button className="px-[14px] py-[8px] bg-white border-[1.5px] border-[#EBEBEF] rounded-[9px] text-[12px] font-medium text-[#6B7280]">July 2026 ▾</button>
          <button className="px-[18px] py-[8px] bg-gradient-to-r from-[#D61CA8] to-[#8B2EF5] rounded-[9px] text-[12px] font-bold text-white">Export</button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-[12px] mb-[18px]">
        {STATS.map((s) => (
          <div key={s.label} className="bg-white rounded-[13px] p-[15px] shadow-[0_1px_4px_rgba(0,0,0,0.05)] relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: s.color }} />
            <div className="text-[11px] text-[#9090A0] uppercase tracking-[0.5px] mb-[6px]">{s.label}</div>
            <div className="text-[21px] font-extrabold" style={{ color: s.color }}>{s.value}</div>
            <div className="text-[11px] font-semibold text-[#10B981] mt-[4px]">{s.note}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex bg-white rounded-[13px] overflow-hidden mb-[16px] shadow-[0_1px_4px_rgba(0,0,0,0.05)] w-fit">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-[22px] py-[10px] text-[12px] ${
              activeTab === tab
                ? 'bg-gradient-to-r from-[#D61CA8] to-[#8B2EF5] font-bold text-white'
                : 'font-medium text-[#9090A0]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Transaction table */}
      <div className="bg-white rounded-[14px] overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
        <div className={`grid ${gridCols} gap-2 px-[16px] py-[10px] bg-[#F8F8FA] border-b border-[#EBEBEF]`}>
          {['Booking ID', 'Customer', 'Vendor', 'Amount', 'Gateway', 'Date', 'Status'].map((h) => (
            <span key={h} className="text-[10px] font-semibold text-[#9090A0] uppercase tracking-[0.5px]">{h}</span>
          ))}
        </div>
        {TRANSACTIONS.map((t) => (
          <div key={t.id} className={`grid ${gridCols} gap-2 px-[16px] py-[13px] border-b border-[#F8F8F8] items-center`}>
            <span className="text-[12px] font-medium text-[#9090A0] font-mono">{t.id}</span>
            <span className="text-[13px] font-medium text-[#0A0A0F]">{t.customer}</span>
            <span className="text-[12px] font-medium text-[#6B7280]">{t.vendor}</span>
            <span className="text-[13px] font-bold text-[#0A0A0F]">{t.amount}</span>
            <span className="text-[12px] text-[#6B7280]">{t.gateway}</span>
            <span className="text-[12px] text-[#6B7280]">{t.date}</span>
            <div className={`px-[9px] py-[3px] rounded text-[10px] font-bold inline-block w-fit ${statusStyles[t.status]}`}>
              {t.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Payments;