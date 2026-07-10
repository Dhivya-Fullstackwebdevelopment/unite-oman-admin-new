import React from 'react';

const PLATFORM_CONFIG = [
  { label: 'Platform Commission', value: '15%', highlight: true },
  { label: 'VAT Rate (Oman)', value: '9%' },
  { label: 'Payout Cycle', value: 'T+1' },
  { label: 'Currency', value: 'OMR (3 decimals)' },
  { label: 'Default Language', value: 'EN + AR' },
  { label: 'Auto-routing (AI)', value: 'ON' },
  { label: 'AI Moderation', value: 'ON' },
  { label: 'Max jobs/vendor/day', value: '8' },
];

const GATEWAYS = [
  { name: 'Bank of Muscat', desc: 'OMR cards · Maisarah · Primary', status: 'Live ✓', live: true },
  { name: 'Thawani Pay', desc: 'Oman local debit · OTTP', status: 'Live ✓', live: true },
  { name: 'Stripe', desc: 'Intl · Apple Pay · Google Pay', status: 'Live ✓', live: true },
  { name: 'OmanNet', desc: 'Debit · In progress', status: 'Setup', live: false },
];

const INTEGRATIONS = [
  { name: 'Unifonic SMS', desc: 'OTP · Booking SMS · EN+AR', status: 'Live ✓', live: true },
  { name: 'Firebase', desc: 'FCM Push · OTP Auth', status: 'Live ✓', live: true },
  { name: 'Google Maps', desc: 'Tracking · Directions', status: 'Live ✓', live: true },
  { name: 'MOCI API', desc: 'CR Verification', status: 'Connected', live: true },
  { name: 'ROP API', desc: 'Civil ID Verify', status: 'Connected', live: true },
  { name: 'WhatsApp Biz', desc: 'Order alerts', status: 'Setup', live: false },
  { name: 'Claude AI', desc: 'NLP search · Moderation', status: 'Live ✓', live: true },
];

const StatusBadge = ({ status, live }) => (
  <div className={`px-[9px] py-[3px] rounded text-[10px] font-bold ${live ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
    {status}
  </div>
);

const Settings = () => {
  return (
    <div className="flex-1 overflow-y-auto bg-[#F4F5F8] p-[24px]">
      <div className="font-extrabold text-[22px] leading-none text-[#0A0A0F] mb-[18px]">Platform Settings</div>

      <div className="grid grid-cols-3 gap-[14px]">
        {/* Platform config */}
        <div className="bg-white rounded-[16px] p-[18px] shadow-[0_1px_5px_rgba(0,0,0,0.05)]">
          <div className="text-[15px] font-bold text-[#0A0A0F] mb-[14px]">Platform Config</div>
          {PLATFORM_CONFIG.map((c, i) => (
            <div
              key={c.label}
              className={`flex items-center justify-between py-[9px] ${i < PLATFORM_CONFIG.length - 1 ? 'border-b border-[#F5F5F5]' : ''}`}
            >
              <span className="text-[12px] font-medium text-[#0A0A0F]">{c.label}</span>
              <div
                className={`px-[11px] py-[5px] rounded-[9px] text-[12px] font-bold ${
                  c.highlight
                    ? 'bg-[#F8F8FA] border-[1.5px] border-[#D61CA84D] text-[#D61CA8]'
                    : 'bg-[#F8F8FA] border-[1.5px] border-[#EBEBEF] text-[#0A0A0F]'
                }`}
              >
                {c.value}
              </div>
            </div>
          ))}
        </div>

        {/* Payment gateways */}
        <div className="bg-white rounded-[16px] p-[18px] shadow-[0_1px_5px_rgba(0,0,0,0.05)]">
          <div className="text-[15px] font-bold text-[#0A0A0F] mb-[14px]">Payment Gateways</div>
          {GATEWAYS.map((g) => (
            <div key={g.name} className="flex items-center gap-[10px] px-[12px] py-[11px] bg-[#F8F8FA] rounded-[11px] mb-[8px] last:mb-0">
              <div className="flex-1">
                <div className="text-[13px] font-semibold text-[#0A0A0F]">{g.name}</div>
                <div className="text-[11px] text-[#9090A0] mt-[2px]">{g.desc}</div>
              </div>
              <StatusBadge status={g.status} live={g.live} />
            </div>
          ))}
        </div>

        {/* Integrations */}
        <div className="bg-white rounded-[16px] p-[18px] shadow-[0_1px_5px_rgba(0,0,0,0.05)]">
          <div className="text-[15px] font-bold text-[#0A0A0F] mb-[14px]">Integrations</div>
          {INTEGRATIONS.map((it) => (
            <div key={it.name} className="flex items-center justify-between px-[12px] py-[10px] bg-[#F8F8FA] rounded-[10px] mb-[7px] last:mb-0">
              <div>
                <div className="text-[12px] font-semibold text-[#0A0A0F]">{it.name}</div>
                <div className="text-[11px] text-[#9090A0] mt-[1px]">{it.desc}</div>
              </div>
              <StatusBadge status={it.status} live={it.live} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Settings;