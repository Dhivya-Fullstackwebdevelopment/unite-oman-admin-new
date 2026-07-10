import React from 'react';

const AREA_LABELS = [
  { name: 'Qurum', top: 78, left: 39 },
  { name: 'Al Khuwair', top: 221, left: 260 },
  { name: 'Bowsher', top: 364, left: 39 },
  { name: 'MSQ Hills', top: 78, left: 494 },
];

const VENDOR_DOTS = [
  { icon: '❄️', color: '#D61CA8', top: 104, left: 104 },
  { icon: '🧹', color: '#10B981', top: 260, left: 156 },
  { icon: '⚡', color: '#F59E0B', top: 208, left: 299 },
  { icon: '❄️', color: '#D61CA8', top: 130, left: 403 },
  { icon: '💅', color: '#8B2EF5', top: 234, left: 520 },
  { icon: '🔧', color: '#4B6EF5', top: 390, left: 195 },
  { icon: '🪲', color: '#10B981', top: 455, left: 364 },
];

const BOOKING_PINS = [
  { color: '#F59E0B', top: 117, left: 130 },
  { color: '#F59E0B', top: 182, left: 338 },
  { color: '#4B6EF5', top: 143, left: 507 },
];

const LEGEND = [
  { color: '#D61CA8', label: 'Vendor online' },
  { color: '#F59E0B', label: 'Unassigned booking' },
  { color: '#4B6EF5', label: 'Assigned booking' },
];

const AREA_COVERAGE = [
  { name: 'Qurum', vendors: 8, tone: 'Strong', badge: 'bg-emerald-100 text-emerald-600' },
  { name: 'Al Khuwair', vendors: 6, tone: 'Good', badge: 'bg-blue-100 text-blue-600' },
  { name: 'Bowsher', vendors: 2, tone: 'Weak ⚠', badge: 'bg-rose-100 text-rose-500' },
  { name: 'MSQ Hills', vendors: 4, tone: 'Good', badge: 'bg-blue-100 text-blue-600' },
  { name: 'Al Ghubrah', vendors: 3, tone: 'OK', badge: 'bg-amber-100 text-amber-600' },
];

const LiveMap = () => {
  return (
    <div className="flex-1 overflow-y-auto bg-[#F4F5F8] p-[24px]">
      <div className="flex items-center justify-between mb-[18px]">
        <div>
          <div className="font-extrabold text-[22px] leading-none text-[#0A0A0F]">Live Map</div>
          <div className="text-[14px] leading-none text-[#9090A0] mt-[4px]">All vendors + active bookings · Real-time</div>
        </div>
        <div className="flex items-center gap-[10px]">
          <button className="px-[14px] py-[8px] bg-white border-[1.5px] border-[#EBEBEF] rounded-[9px] text-[12px] font-medium text-[#6B7280]">Area ▾</button>
          <button className="px-[14px] py-[8px] bg-white border-[1.5px] border-[#EBEBEF] rounded-[9px] text-[12px] font-medium text-[#6B7280]">Service ▾</button>
          <div className="flex items-center gap-[6px]">
            <div className="w-[8px] h-[8px] rounded-full bg-[#4ade80]" />
            <span className="text-[13px] font-semibold text-[#0A0A0F]">23 vendors online</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_340px] gap-[16px] h-[640px]">
        {/* Map panel */}
        <div className="bg-[#E8EDF2] rounded-[17px] relative overflow-hidden">
          <div className="absolute left-0 right-0" style={{ top: 170, height: 24, background: '#F0F2F4' }} />
          <div className="absolute left-0 right-0" style={{ top: 325, height: 18, background: '#F0F2F4' }} />
          <div className="absolute left-0 right-0" style={{ top: 480, height: 18, background: '#F0F2F4' }} />
          <div className="absolute top-0 bottom-0" style={{ left: 234, width: 21, background: '#F0F2F4' }} />
          <div className="absolute top-0 bottom-0" style={{ left: 468, width: 18, background: '#F0F2F4' }} />

          {AREA_LABELS.map((a) => (
            <div key={a.name} className="absolute text-[12px] font-semibold text-black/35" style={{ top: a.top, left: a.left }}>
              {a.name}
            </div>
          ))}

          {VENDOR_DOTS.map((v, i) => (
            <div
              key={i}
              className="absolute w-[29px] h-[29px] rounded-full border-2 border-white flex items-center justify-center text-[13px] shadow-[0_2px_8px_rgba(0,0,0,0.25)] cursor-pointer"
              style={{ top: v.top, left: v.left, background: v.color }}
            >
              {v.icon}
            </div>
          ))}

          {BOOKING_PINS.map((p, i) => (
            <div
              key={i}
              className="absolute w-[18px] h-[18px] rounded-full border-2 border-white shadow-[0_1px_5px_rgba(0,0,0,0.2)]"
              style={{ top: p.top, left: p.left, background: p.color }}
            />
          ))}

          {/* Legend */}
          <div className="absolute bottom-[13px] left-[13px] bg-white/95 rounded-[10px] px-[14px] py-[10px] flex gap-[13px] shadow-[0_2px_8px_rgba(0,0,0,0.12)]">
            {LEGEND.map((l) => (
              <div key={l.label} className="flex items-center gap-[5px]">
                <div className="w-[12px] h-[12px] rounded-full" style={{ background: l.color }} />
                <span className="text-[11px] font-medium text-[#555]">{l.label}</span>
              </div>
            ))}
          </div>

          {/* Zoom controls */}
          <div className="absolute top-[13px] right-[13px] flex flex-col gap-[5px]">
            <button className="w-[34px] h-[34px] bg-white rounded-[8px] flex items-center justify-center text-[15px] shadow-[0_2px_6px_rgba(0,0,0,0.12)]">+</button>
            <button className="w-[34px] h-[34px] bg-white rounded-[8px] flex items-center justify-center text-[15px] shadow-[0_2px_6px_rgba(0,0,0,0.12)]">−</button>
          </div>
        </div>

        {/* Stats panel */}
        <div className="flex flex-col gap-[10px]">
          <div className="bg-white rounded-[14px] p-[16px] shadow-[0_1px_5px_rgba(0,0,0,0.05)]">
            <div className="text-[14px] font-bold text-[#0A0A0F] mb-[12px]">Live Stats</div>
            {[
              ['Online vendors', '23 of 234', '#10B981'],
              ['Active bookings', '18', '#D61CA8'],
              ['Unassigned', '12', '#EF4444'],
              ['Avg ETA', '14 min', '#4B6EF5'],
            ].map(([label, value, color]) => (
              <div key={label} className="flex justify-between mb-[8px] last:mb-0">
                <span className="text-[12px] text-[#9090A0]">{label}</span>
                <span className="text-[12px] font-bold" style={{ color }}>{value}</span>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-[14px] p-[16px] shadow-[0_1px_5px_rgba(0,0,0,0.05)]">
            <div className="text-[14px] font-bold text-[#0A0A0F] mb-[12px]">Area Coverage</div>
            {AREA_COVERAGE.map((a) => (
              <div key={a.name} className="flex justify-between items-center mb-[7px] last:mb-0 px-[10px] py-[7px] bg-[#F8F8FA] rounded-[9px]">
                <div>
                  <div className="text-[12px] font-semibold text-[#0A0A0F]">{a.name}</div>
                  <div className="text-[11px] text-[#9090A0]">{a.vendors} vendors</div>
                </div>
                <div className={`px-[9px] py-[3px] rounded text-[10px] font-bold ${a.badge}`}>{a.tone}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveMap;