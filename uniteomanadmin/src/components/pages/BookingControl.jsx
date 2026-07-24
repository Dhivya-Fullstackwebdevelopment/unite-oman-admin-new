import React, { useState, useEffect, useCallback } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const API_BASE_URL = 'http://127.0.0.1:8000/api';
const TOKEN = localStorage.getItem("admin_access_token");

async function apiGet(path) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return res.json();
}

async function apiPost(path, body) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || `Request failed (${res.status})`);
  }
  return data;
}

const SERVICE_ICONS = {
  'AC Gas Filling': '❄️',
  'AC Repair': '❄️',
  'AC Installation': '❄️',
  'AC Deep Cleaning': '❄️',
  'Beauty at Home': '💅',
  'Deep Cleaning': '🧹',
  'Home Cleaning': '🧹',
  'Electrical Fix': '⚡',
  'Electrical Repair': '⚡',
};

function getIcon(serviceName) {
  return SERVICE_ICONS[serviceName] || '🛠️';
}

function buildNote(booking) {
  if (booking.available_vendors_count === 0) {
    return '⚠ No professionals available nearby';
  }
  if (booking.available_vendors_count === 1) {
    const v = booking.available_vendors[0];
    return `✨ ⚠ Only 1 pro available — ${v.name} (${v.distance_km}km)`;
  }
  return `✨ ${booking.available_vendors_count} pros available`;
}

const BookingControl = () => {
  const [queue, setQueue] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [unassignedCount, setUnassignedCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState({});
  const [assigning, setAssigning] = useState({});

  const loadDispatchData = useCallback(() => {
    setLoading(true);
    setError(null);
    apiGet('/professionals/admin/bookings/assign')
      .then((res) => {
        setQueue(res.unassigned_queue || []);
        setSuggestions(res.ai_smart_routing || []);
        setUnassignedCount(res.unassigned_count ?? (res.unassigned_queue || []).length);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadDispatchData();
  }, [loadDispatchData]);

  const assignBooking = async (bookingId, professionalId, bookingLabel) => {
    if (!professionalId) {
      toast.error('Select a vendor first.');
      return;
    }
    setAssigning((prev) => ({ ...prev, [bookingId]: true }));
    try {
      const res = await apiPost('/professionals/admin/bookings/assign/', {
        booking_id: bookingId,
        professional_id: professionalId,
      });
      toast.success(res.message || `${bookingLabel} assigned successfully.`);
      loadDispatchData();
    } catch (err) {
      toast.error(err.message || 'Failed to assign booking.');
    } finally {
      setAssigning((prev) => ({ ...prev, [bookingId]: false }));
    }
  };

  const handleConfirmSuggestion = (s) => {
    assignBooking(s.booking_id, s.recommended_vendor_id, `${s.customer_name}'s booking`);
  };

  const handleAssignFromQueue = (booking) => {
    const vendorId = selectedVendor[booking.booking_id];
    assignBooking(vendorId ? Number(vendorId) : null, vendorId ? Number(vendorId) : null, booking.booking_code);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#F4F5F8] p-[24px]">
      <Toaster position="top-right" toastOptions={{ style: { fontSize: '13px' } }} />

      {/* Header row */}
      <div className="flex items-center justify-between mb-[18px]">
        <div>
          <div className="font-extrabold text-[22px] leading-none text-[#0A0A0F]">Booking Control &amp; Dispatch</div>
          <div className="text-[14px] leading-none text-[#9090A0] mt-[4px]">Admin routes all bookings · Vendors cannot self-assign</div>
        </div>
        <div className="flex gap-[8px]">
          <div className="px-[16px] py-[8px] bg-[#FFE4E6] rounded-[9px] text-[12px] font-bold text-[#EF4444]">
            🔴 {unassignedCount} Unassigned
          </div>
          <button className="px-[16px] py-[8px] bg-[#D61CA814] rounded-[9px] text-[12px] font-bold text-[#D61CA8]">
            ✨ AI Auto-Route All
          </button>
        </div>
      </div>

      {loading && (
        <div className="py-14 text-center text-base font-medium text-[#9090A0]">Loading dispatch queue…</div>
      )}

      {!loading && error && (
        <div className="py-14 text-center text-base font-medium text-red-500">Couldn't load dispatch data: {error}</div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-[1fr_400px] gap-[16px]">
          {/* Unassigned queue */}
          <div>
            <div className="text-[14px] font-bold text-[#0A0A0F] mb-[10px]">Unassigned Queue</div>
            <div className="flex flex-col gap-[9px]">
              {queue.map((item) => (
                <div
                  key={item.booking_id}
                  className="bg-white rounded-[14px] p-[14px] shadow-[0_1px_4px_rgba(0,0,0,0.04)] border-l-[4px] border-[#F59E0B]"
                >
                  <div className="flex items-center gap-[12px] mb-[9px]">
                    <div className="w-[42px] h-[42px] bg-[#FEF3C7] rounded-[10px] flex items-center justify-center text-[19px] flex-shrink-0">
                      {getIcon(item.service_name)}
                    </div>
                    <div className="flex-1">
                      <div className="text-[14px] font-semibold text-[#0A0A0F]">{item.service_name}</div>
                      <div className="text-[11px] text-[#9090A0] mt-[1px]">
                        {item.customer_name} · {item.area} · {item.time}
                      </div>
                    </div>
                    <div className="text-[14px] font-bold text-[#D61CA8]">{item.price}</div>
                  </div>

                  <div className="bg-[#10B9810D] rounded-[9px] px-[11px] py-[6px] mb-[9px] text-[11px] leading-snug text-[#059669]">
                    {buildNote(item)}
                  </div>

                  <div className="flex gap-[6px]">
                    <select
                      className="flex-1 px-[11px] py-[6px] bg-[#F8F8FA] border-[1.5px] border-[#EBEBEF] rounded-[9px] text-[12px] text-[#0A0A0F] outline-none"
                      value={selectedVendor[item.booking_id] || ''}
                      onChange={(e) =>
                        setSelectedVendor((prev) => ({ ...prev, [item.booking_id]: e.target.value }))
                      }
                    >
                      <option value="">Select vendor…</option>
                      {item.available_vendors.map((v) => (
                        <option key={v.id} value={v.id}>
                          {v.name} ★{v.rating} · {v.distance_km}km
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => handleAssignFromQueue(item)}
                      disabled={assigning[item.booking_id]}
                      className="px-[16px] py-[6px] bg-gradient-to-r from-[#D61CA8] to-[#8B2EF5] rounded-[9px] text-[12px] font-bold text-white disabled:opacity-50"
                    >
                      {assigning[item.booking_id] ? 'Assigning…' : 'Assign'}
                    </button>
                  </div>
                </div>
              ))}

              {queue.length === 0 && (
                <div className="py-10 text-center text-[13px] font-medium text-[#9090A0] bg-white rounded-[14px]">
                  No unassigned bookings 🎉
                </div>
              )}
            </div>
          </div>

          {/* AI smart routing */}
          <div>
            <div className="text-[14px] font-bold text-[#0A0A0F] mb-[10px]">✨ AI Smart Routing</div>
            <div className="flex flex-col gap-[8px]">
              {suggestions.map((s) => (
                <div key={s.booking_id} className="bg-white rounded-[13px] px-[14px] py-[13px] shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
                  <div className="text-[12px] font-semibold text-[#0A0A0F] mb-[4px]">{s.customer_name}</div>
                  <div className="flex items-center justify-between mb-[4px]">
                    <div className="text-[12px] font-medium text-[#9090A0]">→ {s.recommended_vendor_name}</div>
                    <div className="text-[16px] font-extrabold text-[#D61CA8]">{s.ai_score}/100</div>
                  </div>
                  <div className="text-[11px] text-[#9090A0] mb-[9px]">{s.reason}</div>
                  <div className="flex gap-[6px]">
                    <button
                      onClick={() => handleConfirmSuggestion(s)}
                      disabled={assigning[s.booking_id]}
                      className="flex-1 py-[7px] bg-gradient-to-r from-[#D61CA8] to-[#8B2EF5] rounded-[8px] text-center text-[11px] font-bold text-white disabled:opacity-50"
                    >
                      {assigning[s.booking_id] ? 'Confirming…' : 'Confirm'}
                    </button>
                    <button className="flex-1 py-[7px] bg-[#F8F8FA] border-[1.5px] border-[#EBEBEF] rounded-[8px] text-center text-[11px] font-semibold text-[#555]">
                      Override
                    </button>
                  </div>
                </div>
              ))}

              {suggestions.length === 0 && (
                <div className="py-10 text-center text-[13px] font-medium text-[#9090A0] bg-white rounded-[13px]">
                  No AI suggestions right now.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingControl;