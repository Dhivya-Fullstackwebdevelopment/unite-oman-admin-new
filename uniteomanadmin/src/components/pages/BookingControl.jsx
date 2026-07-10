import React, { useState } from 'react';

const QUEUE = [
  {
    icon: '💅',
    service: 'Beauty at Home',
    customer: 'Sara Al-Rawahi',
    area: 'MSQ Hills',
    time: '4:00 PM',
    price: 'OMR 45',
    note: '✨ 3 beauty pros available',
  },
  {
    icon: '❄️',
    service: 'AC Deep Cleaning',
    customer: 'Nasser Al-Balushi',
    area: 'Bowsher',
    time: '3:00 PM',
    price: 'OMR 17',
    note: '✨ ⚠ No AC tech in Bowsher — nearest 3.2km',
  },
  {
    icon: '🧹',
    service: 'Deep Cleaning',
    customer: 'Hana Al-Rashdi',
    area: 'Qurum',
    time: '5:00 PM',
    price: 'OMR 45',
    note: '✨ 4 cleaning pros available',
  },
  {
    icon: '⚡',
    service: 'Electrical Fix',
    customer: 'Ali Al-Jabri',
    area: 'Ruwi',
    time: '6:00 PM',
    price: 'OMR 20',
    note: '✨ 2 electrical pros available',
  },
];

const AI_SUGGESTIONS = [
  { title: 'Beauty · Sara', vendor: 'Fatima Al-Zaabi', score: '97/100', reason: 'Closest + highest beauty rating' },
  { title: 'AC · Nasser', vendor: 'Khalid Al-Habsi', score: '88/100', reason: 'Only available AC tech (3.2km)' },
  { title: 'Cleaning · Hana', vendor: 'Salim Al-Rashdi', score: '94/100', reason: '0.8km + 100% completion rate' },
  { title: 'Electrical · Ali', vendor: 'Omar Al-Maqbali', score: '91/100', reason: '1.1km + Ruwi coverage' },
];

const BookingControl = () => {
  const [selectedVendor, setSelectedVendor] = useState({});

  return (
    <div className="flex-1 overflow-y-auto bg-[#F4F5F8] p-[24px]">
      {/* Header row */}
      <div className="flex items-center justify-between mb-[18px]">
        <div>
          <div className="font-extrabold text-[22px] leading-none text-[#0A0A0F]">Booking Control &amp; Dispatch</div>
          <div className="text-[14px] leading-none text-[#9090A0] mt-[4px]">Admin routes all bookings · Vendors cannot self-assign</div>
        </div>
        <div className="flex gap-[8px]">
          <div className="px-[16px] py-[8px] bg-[#FFE4E6] rounded-[9px] text-[12px] font-bold text-[#EF4444]">
            🔴 12 Unassigned
          </div>
          <button className="px-[16px] py-[8px] bg-[#D61CA814] rounded-[9px] text-[12px] font-bold text-[#D61CA8]">
            ✨ AI Auto-Route All
          </button>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_400px] gap-[16px]">
        {/* Unassigned queue */}
        <div>
          <div className="text-[14px] font-bold text-[#0A0A0F] mb-[10px]">Unassigned Queue</div>
          <div className="flex flex-col gap-[9px]">
            {QUEUE.map((item) => (
              <div
                key={item.service + item.customer}
                className="bg-white rounded-[14px] p-[14px] shadow-[0_1px_4px_rgba(0,0,0,0.04)] border-l-[4px] border-[#F59E0B]"
              >
                <div className="flex items-center gap-[12px] mb-[9px]">
                  <div className="w-[42px] h-[42px] bg-[#FEF3C7] rounded-[10px] flex items-center justify-center text-[19px] flex-shrink-0">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <div className="text-[14px] font-semibold text-[#0A0A0F]">{item.service}</div>
                    <div className="text-[11px] text-[#9090A0] mt-[1px]">
                      {item.customer} · {item.area} · {item.time}
                    </div>
                  </div>
                  <div className="text-[14px] font-bold text-[#D61CA8]">{item.price}</div>
                </div>

                <div className="bg-[#10B9810D] rounded-[9px] px-[11px] py-[6px] mb-[9px] text-[11px] leading-snug text-[#059669]">
                  {item.note}
                </div>

                <div className="flex gap-[6px]">
                  <select
                    className="flex-1 px-[11px] py-[6px] bg-[#F8F8FA] border-[1.5px] border-[#EBEBEF] rounded-[9px] text-[12px] text-[#0A0A0F] outline-none"
                    value={selectedVendor[item.service] || ''}
                    onChange={(e) =>
                      setSelectedVendor((prev) => ({ ...prev, [item.service]: e.target.value }))
                    }
                  >
                    <option value="">Select vendor…</option>
                    <option value="mohammed">Mohammed A. ★4.9</option>
                    <option value="khalid">Khalid A. ★4.8</option>
                  </select>
                  <button className="px-[16px] py-[6px] bg-gradient-to-r from-[#D61CA8] to-[#8B2EF5] rounded-[9px] text-[12px] font-bold text-white">
                    Assign
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI smart routing */}
        <div>
          <div className="text-[14px] font-bold text-[#0A0A0F] mb-[10px]">✨ AI Smart Routing</div>
          <div className="flex flex-col gap-[8px]">
            {AI_SUGGESTIONS.map((s) => (
              <div key={s.title} className="bg-white rounded-[13px] px-[14px] py-[13px] shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
                <div className="text-[12px] font-semibold text-[#0A0A0F] mb-[4px]">{s.title}</div>
                <div className="flex items-center justify-between mb-[4px]">
                  <div className="text-[12px] font-medium text-[#9090A0]">→ {s.vendor}</div>
                  <div className="text-[16px] font-extrabold text-[#D61CA8]">{s.score}</div>
                </div>
                <div className="text-[11px] text-[#9090A0] mb-[9px]">{s.reason}</div>
                <div className="flex gap-[6px]">
                  <button className="flex-1 py-[7px] bg-gradient-to-r from-[#D61CA8] to-[#8B2EF5] rounded-[8px] text-center text-[11px] font-bold text-white">
                    Confirm
                  </button>
                  <button className="flex-1 py-[7px] bg-[#F8F8FA] border-[1.5px] border-[#EBEBEF] rounded-[8px] text-center text-[11px] font-semibold text-[#555]">
                    Override
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingControl;