import React, { useState, useEffect, useCallback } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const API_BASE_URL = 'http://127.0.0.1:8000/api';
const TOKEN = localStorage.getItem("admin_access_token");

const STATUS_TABS = [
  { label: 'All', value: '' },
  { label: 'Scheduled', value: 'SCHEDULED' },
  { label: 'Pending', value: 'PENDING' },
  { label: 'Confirmed', value: 'CONFIRMED' },
  { label: 'En Route', value: 'EN_ROUTE' },
  { label: 'Arrived', value: 'ARRIVED' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'Completed', value: 'COMPLETED' },
  { label: 'Cancelled', value: 'CANCELLED' },
  { label: 'Unassigned', value: 'UNASSIGNED' },
];

const statusStyles = {
  SCHEDULED: 'bg-purple-100 text-purple-600',
  PENDING: 'bg-amber-100 text-amber-600',
  CONFIRMED: 'bg-sky-100 text-sky-600',
  EN_ROUTE: 'bg-blue-100 text-blue-600',
  ARRIVED: 'bg-indigo-100 text-indigo-600',
  IN_PROGRESS: 'bg-orange-100 text-orange-600',
  COMPLETED: 'bg-emerald-100 text-emerald-600',
  CANCELLED: 'bg-red-100 text-red-500',
};

const paymentStyles = {
  Paid: 'bg-emerald-100 text-emerald-600',
  Pending: 'bg-amber-100 text-amber-600',
  Refunded: 'bg-slate-100 text-slate-500',
  paid: 'bg-emerald-100 text-emerald-600',
  pending: 'bg-amber-100 text-amber-600',
  refunded: 'bg-slate-100 text-slate-500',
};

const gridCols = 'grid-cols-[100px_1.4fr_1fr_1fr_100px_100px_110px_90px_150px]';

function formatStatusLabel(status) {
  if (!status) return '';
  return status
    .split('_')
    .map((w) => w.charAt(0) + w.slice(1).toLowerCase())
    .join(' ');
}

function getPageNumbers(current, total) {
  if (total <= 1) return [1];
  const pages = new Set([1, total, current, current - 1, current + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);

  const result = [];
  let prev = 0;
  for (const p of sorted) {
    if (prev && p - prev > 1) result.push('...');
    result.push(p);
    prev = p;
  }
  return result;
}

async function apiGet(path) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  if (!res.ok) {
    throw new Error(`Request failed (${res.status})`);
  }
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
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `Request failed (${res.status})`);
  }
  return res.json();
}

const Bookings = () => {
  const [activeStatus, setActiveStatus] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');

  const [locationId, setLocationId] = useState('');
  const [area, setArea] = useState('');
  const [serviceId, setServiceId] = useState('');

  const [locations, setLocations] = useState([]);
  const [areas, setAreas] = useState([]);
  const [areasLoading, setAreasLoading] = useState(false);
  const [services, setServices] = useState([]);

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // ── Assignment modal state ────────────────────────────────
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [assignBookingId, setAssignBookingId] = useState(null);
  const [assignProfessionalId, setAssignProfessionalId] = useState('');
  const [availableProfessionals, setAvailableProfessionals] = useState([]); // <-- list from API
  const [assignLoading, setAssignLoading] = useState(false);
  const [assignError, setAssignError] = useState(null);
  const [isReassign, setIsReassign] = useState(false);
  const [loadingProfessionals, setLoadingProfessionals] = useState(false);

  // ── Detail modal state ────────────────────────────────────
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [bookingDetail, setBookingDetail] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState(null);

  // Load filter reference data once
  useEffect(() => {
    apiGet('/locations/')
      .then((res) => setLocations(res.data || []))
      .catch(() => { });
    apiGet('/services/')
      .then((res) => setServices(res.data || []))
      .catch(() => { });
    // We no longer fetch global professionals – we'll fetch per booking
  }, []);

  // Whenever the main location changes, load its sub-areas
  useEffect(() => {
    if (!locationId) {
      setAreas([]);
      return;
    }
    setAreasLoading(true);
    apiGet(`/professionals/areas/?location_id=${locationId}`)
      .then((res) => setAreas(res.data || []))
      .catch(() => setAreas([]))
      .finally(() => setAreasLoading(false));
  }, [locationId]);

  const loadBookings = useCallback(() => {
    setLoading(true);
    setError(null);

    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (activeStatus) params.set('status', activeStatus);
    if (area) params.set('area', area);
    if (serviceId) params.set('service_id', serviceId);
    params.set('page', String(page));
    params.set('page_size', String(pageSize));

    apiGet(`/professionals/admin/bookings/?${params.toString()}`)
      .then((res) => {
        setBookings(res.data || []);
        setTotalCount(res.total_count ?? (res.data || []).length);
        setTotalPages(res.total_pages ?? 1);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [search, activeStatus, area, serviceId, page, pageSize]);

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  // Reset to page 1 whenever a filter changes
  const handleStatusChange = (value) => {
    setActiveStatus(value);
    setPage(1);
  };
  const handleLocationChange = (value) => {
    setLocationId(value);
    setArea('');
    setPage(1);
  };
  const handleAreaChange = (value) => {
    setArea(value);
    setPage(1);
  };
  const handleServiceChange = (value) => {
    setServiceId(value);
    setPage(1);
  };
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearch(searchInput.trim());
    setPage(1);
  };

  const handleExport = () => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (activeStatus) params.set('status', activeStatus);
    if (area) params.set('area', area);
    if (serviceId) params.set('service_id', serviceId);
    params.set('export', 'csv');
    const url = `${API_BASE_URL}/professionals/admin/bookings/?${params.toString()}`;
    fetch(url, { headers: { Authorization: `Bearer ${TOKEN}` } })
      .then((res) => res.blob())
      .then((blob) => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'bookings.csv';
        link.click();
      })
      .catch(() => { });
  };

  // ── Assignment handlers ────────────────────────────────────
  const openAssignModal = async (bookingId, reassign = false) => {
    setAssignBookingId(bookingId);
    setAssignProfessionalId('');
    setAssignError(null);
    setIsReassign(reassign);
    setAvailableProfessionals([]);
    setLoadingProfessionals(true);
    setShowAssignModal(true);

    try {
      const res = await apiGet(`/professionals/bookings/${bookingId}/available-professionals/`);
      setAvailableProfessionals(res.data || []);
    } catch (err) {
      setAssignError('Could not load available professionals. Please try again.');
      setAvailableProfessionals([]);
    } finally {
      setLoadingProfessionals(false);
    }
  };

  const closeAssignModal = () => {
    setShowAssignModal(false);
    setAssignBookingId(null);
    setAssignProfessionalId('');
    setAssignError(null);
    setAssignLoading(false);
    setIsReassign(false);
    setAvailableProfessionals([]);
    setLoadingProfessionals(false);
  };

  const handleAssignSubmit = async () => {
    if (!assignBookingId || !assignProfessionalId) {
      setAssignError('Please select a professional.');
      return;
    }
    setAssignLoading(true);
    setAssignError(null);
    try {
      await apiPost('/professionals/admin/bookings/assign/', {
        booking_id: assignBookingId,
        professional_id: parseInt(assignProfessionalId, 10),
      });
      const successMessage = isReassign
        ? "Professional reassigned successfully!"
        : "Professional assigned successfully!";
      toast.success(successMessage);
      await loadBookings();
      closeAssignModal();
    } catch (err) {
      setAssignError(err.message || 'Assignment failed. Please try again.');
    } finally {
      setAssignLoading(false);
    }
  };

  // ── Detail modal handlers ────────────────────────────────
  const openBookingDetail = (id) => {
    setSelectedBookingId(id);
    setBookingDetail(null);
    setDetailError(null);
    setDetailLoading(true);
    apiGet(`/professionals/bookings/${id}/`)
      .then((res) => setBookingDetail(res.data))
      .catch((err) => setDetailError(err.message))
      .finally(() => setDetailLoading(false));
  };

  const closeBookingDetail = () => {
    setSelectedBookingId(null);
    setBookingDetail(null);
    setDetailError(null);
  };

  useEffect(() => {
    if (selectedBookingId || showAssignModal) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [selectedBookingId, showAssignModal]);

  const rangeStart = totalCount === 0 ? 0 : (page - 1) * pageSize + 1;
  const rangeEnd = Math.min(page * pageSize, totalCount);

  return (
    <div className="flex-1 overflow-y-auto bg-[#F4F5F8] p-[24px]">
      <style>{`
        .modal-scroll::-webkit-scrollbar { width: 5px; }
        .modal-scroll::-webkit-scrollbar-track { background: transparent; margin: 20px 0; }
        .modal-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #F0C7E8, #D9B8F2);
          border-radius: 999px;
          background-clip: padding-box;
        }
        .modal-scroll::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #D61CA8, #8B2EF5);
        }
        .modal-scroll { scrollbar-width: thin; scrollbar-color: #E7CDEF transparent; }
      `}</style>
      {/* Header row */}
      <div className="flex items-center justify-between mb-[18px] flex-wrap gap-3">
        <div>
          <div className="font-extrabold text-[22px] leading-none text-[#0A0A0F]">All Bookings</div>
          <div className="text-[14px] leading-none text-[#9090A0] mt-[4px]">
            {totalCount} total · Full history + export
          </div>
        </div>
        <div className="flex gap-[8px] flex-wrap">
          <form onSubmit={handleSearchSubmit}>
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="bg-white border-[1.5px] border-[#EBEBEF] rounded-lg px-[14px] py-[9px] text-[13px] text-[#0A0A0F] outline-none w-[220px] placeholder:text-[#9090A0]"
              placeholder="Search bookings..."
            />
          </form>

          <select
            value={locationId}
            onChange={(e) => handleLocationChange(e.target.value)}
            className="px-[14px] py-[9px] bg-white border-[1.5px] border-[#EBEBEF] rounded-lg text-[12px] font-medium text-[#6B7280] outline-none"
          >
            <option value="">All Locations</option>
            {locations.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name}
              </option>
            ))}
          </select>

          <select
            value={area}
            onChange={(e) => handleAreaChange(e.target.value)}
            disabled={!locationId || areasLoading}
            className="px-[14px] py-[9px] bg-white border-[1.5px] border-[#EBEBEF] rounded-lg text-[12px] font-medium text-[#6B7280] outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="">{areasLoading ? 'Loading areas…' : 'All Areas'}</option>
            {areas.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>

          <select
            value={serviceId}
            onChange={(e) => handleServiceChange(e.target.value)}
            className="px-[14px] py-[9px] bg-white border-[1.5px] border-[#EBEBEF] rounded-lg text-[12px] font-medium text-[#6B7280] outline-none"
          >
            <option value="">All Services</option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>

          <button
            onClick={handleExport}
            className="px-[18px] py-[9px] bg-gradient-to-r cursor-pointer from-[#D61CA8] to-[#8B2EF5] rounded-lg text-[12px] font-bold text-white"
          >
            Export CSV
          </button>
        </div>
      </div>

      {/* Status filter pills */}
      <div className="flex gap-[8px] mb-[18px] flex-wrap">
        {STATUS_TABS.map((tab) => {
          const isActive = activeStatus === tab.value;
          return (
            <button
              key={tab.label}
              onClick={() => handleStatusChange(tab.value)}
              className={`px-4 py-[8px] cursor-pointer rounded-full text-[12px] leading-none transition-colors ${isActive
                ? 'bg-[#D61CA818] border-[1.5px] border-[#D61CA840] font-bold text-[#D61CA8]'
                : 'bg-white border-[1.5px] border-[#EBEBEF] font-medium text-[#9090A0] hover:text-[#0A0A0F]'
                }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Table card */}
      <div className="bg-white rounded-[14px] shadow-[0_1px_4px_rgba(0,0,0,0.05)] overflow-hidden">
        <div className={`grid ${gridCols} gap-2 px-[16px] py-[10px] bg-[#F8F8FA] border-b border-[#EBEBEF]`}>
          {['Code', 'Service · Customer', 'Professional', 'Date · Area', 'Price', 'Payment', 'Status', 'Time', 'Actions'].map(
            (h, i) => (
              <span key={i} className="text-[10px] font-semibold text-[#9090A0] uppercase tracking-[0.5px]">
                {h}
              </span>
            )
          )}
        </div>

        {loading && <div className="py-14 text-center text-base font-medium text-[#9090A0]">Loading bookings…</div>}

        {!loading && error && (
          <div className="py-14 text-center text-base font-medium text-red-500">
            Couldn't load bookings: {error}
          </div>
        )}

        {!loading &&
          !error &&
          bookings.map((b) => {
            const isUnassigned = b.status === 'UNASSIGNED' || !b.professional_name || b.professional_name === 'Unassigned';
            const canReassign = ['SCHEDULED', 'PENDING', 'CONFIRMED'].includes(b.status);
            return (
              <div
                key={b.id}
                className={`grid ${gridCols} gap-2 px-[16px] py-[13px] border-b border-[#F8F8F8] items-center`}
              >
                <span className="text-[12px] font-medium text-[#9090A0] font-mono">{b.booking_code}</span>
                <div>
                  <div className="text-[14px] font-semibold text-[#0A0A0F] leading-tight">{b.service_name}</div>
                  <div className="text-[11px] text-[#9090A0] leading-tight mt-[2px]">{b.customer_name}</div>
                </div>
                <span className="text-[12px] font-medium text-[#0A0A0F]">{b.professional_name || 'Unassigned'}</span>
                <span className="text-[12px] text-[#6B7280]">
                  {b.date} · {b.area}
                </span>
                <span className="text-[13px] font-bold text-[#0A0A0F]">{b.price}</span>
                <div
                  className={`px-[8px] py-[3px] rounded text-[10px] font-bold inline-block w-fit ${paymentStyles[b.payment_status] || 'bg-slate-100 text-slate-500'
                    }`}
                >
                  {b.payment_status}
                </div>
                <div
                  className={`px-[8px] py-[3px] rounded text-[10px] font-bold inline-block w-fit ${statusStyles[b.status] || 'bg-slate-100 text-slate-500'
                    }`}
                >
                  {formatStatusLabel(b.status)}
                </div>
                <span className="text-[12px] text-[#6B7280]">{b.time}</span>
                <div className="flex gap-[5px]">
                  <button
                    onClick={() => openBookingDetail(b.id)}
                    className="px-[10px] py-[5px] cursor-pointer bg-[#F8F8FA] border border-[#EBEBEF] rounded-[6px] text-[10px] font-semibold text-[#555]"
                  >
                    View
                  </button>

                  {isUnassigned ? (
                    <button
                      onClick={() => openAssignModal(b.id, false)}
                      className="px-[10px] py-[5px] cursor-pointer bg-[#D61CA8] rounded-[6px] text-[10px] font-bold text-white"
                    >
                      Assign
                    </button>
                  ) : (
                    <button
                      onClick={canReassign ? () => openAssignModal(b.id, true) : undefined}
                      disabled={!canReassign}
                      className={`px-[10px] py-[5px] rounded-[6px] text-[10px] font-semibold transition ${canReassign
                        ? 'bg-[#D61CA814] text-[#D61CA8] cursor-pointer'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-60'
                        }`}
                    >
                      Reassign
                    </button>
                  )}
                </div>
              </div>
            );
          })}

        {!loading && !error && bookings.length === 0 && (
          <div className="py-14 text-center text-base font-medium text-[#9090A0]">No bookings match this filter.</div>
        )}

        {/* Pagination footer */}
        <div className="px-[16px] py-[14px] border-t border-[#F0F0F4] bg-white rounded-b-[14px] flex items-center justify-between">
          <div className="text-[12px] text-[#9090A0]">
            {totalCount === 0 ? 'No results' : `Showing ${rangeStart}–${rangeEnd} of ${totalCount} bookings`}
          </div>
          <div className="flex gap-[6px]">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-[12px] py-[6px] bg-white border-[1.5px] border-[#EBEBEF] rounded-md text-[11px] font-medium text-[#9090A0] disabled:opacity-40"
            >
              ← Prev
            </button>
            {getPageNumbers(page, totalPages).map((item, idx) =>
              item === '...' ? (
                <button
                  key={`ellipsis-${idx}`}
                  disabled
                  className="px-[12px] py-[6px] bg-white border-[1.5px] border-[#EBEBEF] rounded-md text-[11px] font-medium text-[#9090A0]"
                >
                  ...
                </button>
              ) : (
                <button
                  key={item}
                  onClick={() => setPage(item)}
                  className={
                    item === page
                      ? 'px-[12px] py-[6px] bg-gradient-to-r from-[#D61CA8] to-[#8B2EF5] rounded-md text-[11px] font-bold text-white'
                      : 'px-[12px] py-[6px] bg-white border-[1.5px] border-[#EBEBEF] rounded-md text-[11px] font-medium text-[#9090A0]'
                  }
                >
                  {item}
                </button>
              )
            )}
            <button
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="px-[12px] py-[6px] bg-white border-[1.5px] border-[#EBEBEF] rounded-md text-[11px] font-medium text-[#9090A0] disabled:opacity-40"
            >
              Next →
            </button>
          </div>
        </div>
      </div>

      {/* ─── ASSIGN MODAL ────────────────────────────────────── */}
      {showAssignModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center z-50 p-4"
          onClick={closeAssignModal}
        >
          <div
            className="bg-white rounded-[20px] w-full max-w-[420px] shadow-2xl p-[24px]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-[18px]">
              <h3 className="text-[17px] font-extrabold text-[#0A0A0F]">
                {isReassign ? 'Reassign Professional' : 'Assign Professional'}
              </h3>
              <button
                onClick={closeAssignModal}
                className="w-[28px] h-[28px] flex items-center justify-center rounded-full bg-[#F4F5F8] hover:bg-[#EBEBEF] text-[#0A0A0F] text-[16px] font-bold"
              >
                ✕
              </button>
            </div>

            <div className="mb-[16px]">
              <label className="block text-[12px] font-semibold text-[#9090A0] uppercase tracking-[0.5px] mb-[6px]">
                Select Professional
              </label>
              {loadingProfessionals ? (
                <div className="text-[13px] text-[#9090A0] py-[10px]">Loading available professionals…</div>
              ) : (
                <select
                  value={assignProfessionalId}
                  onChange={(e) => setAssignProfessionalId(e.target.value)}
                  className="w-full px-[14px] py-[10px] border-[1.5px] border-[#EBEBEF] rounded-[10px] text-[13px] text-[#0A0A0F] outline-none focus:ring-2 focus:ring-[#D61CA8]"
                >
                  <option value="">Choose a professional…</option>
                  {availableProfessionals.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} {p.specialty ? `(${p.specialty})` : ''}
                    </option>
                  ))}
                  {availableProfessionals.length === 0 && (
                    <option value="" disabled>No professionals available</option>
                  )}
                </select>
              )}
              {assignError && (
                <div className="mt-[8px] text-[12px] font-medium text-red-500">{assignError}</div>
              )}
            </div>

            <div className="flex gap-[10px] justify-end">
              <button
                onClick={closeAssignModal}
                className="px-[18px] py-[10px] border border-[#EBEBEF] rounded-[10px] text-[13px] font-semibold text-[#6B7280] hover:bg-[#F8F8FA]"
              >
                Cancel
              </button>
              <button
                onClick={handleAssignSubmit}
                disabled={assignLoading || loadingProfessionals}
                className="px-[18px] py-[10px] bg-gradient-to-r from-[#D61CA8] to-[#8B2EF5] rounded-[10px] text-[13px] font-bold text-white disabled:opacity-60"
              >
                {assignLoading
                  ? isReassign
                    ? 'Reassigning…'
                    : 'Assigning…'
                  : isReassign
                    ? 'Reassign'
                    : 'Assign'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── DETAIL MODAL (unchanged) ────────────────────────── */}
      {selectedBookingId && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center z-50 p-4"
          onClick={closeBookingDetail}
        >
          <div
            className="bg-white rounded-[20px] w-full max-w-[520px] max-h-[88vh] overflow-y-auto shadow-2xl modal-scroll"
            onClick={(e) => e.stopPropagation()}
          >
            {detailLoading && (
              <div className="py-24 text-center text-[13px] font-medium text-[#9090A0]">Loading details…</div>
            )}

            {!detailLoading && detailError && (
              <div className="py-24 text-center text-[13px] font-medium text-red-500 px-[24px]">
                Couldn't load booking: {detailError}
              </div>
            )}

            {!detailLoading && !detailError && bookingDetail && (
              <>
                {/* Gradient header */}
                <div className="relative bg-gradient-to-br from-[#D61CA8] to-[#8B2EF5] rounded-t-[20px] px-[24px] pt-[22px] pb-[26px] overflow-hidden">
                  <div className="absolute -top-8 -right-8 w-[140px] h-[140px] rounded-full bg-white/10" />
                  <div className="absolute -bottom-10 -left-6 w-[100px] h-[100px] rounded-full bg-white/10" />

                  <button
                    onClick={closeBookingDetail}
                    className="absolute top-[16px] right-[16px] z-50 w-[28px] h-[28px] flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white text-[13px] font-bold"
                  >
                    ✕
                  </button>

                  <div className="relative flex items-center justify-between pr-[36px]">
                    <div>
                      <div className="text-white/70 text-[11px] font-semibold uppercase tracking-[0.8px] mb-[4px]">
                        Booking
                      </div>
                      <div className="font-mono text-white text-[18px] font-extrabold">
                        {bookingDetail.booking_code}
                      </div>
                    </div>
                    <span className="px-[12px] py-[6px] rounded-full text-[11px] font-bold bg-white/90 text-[#0A0A0F]">
                      {formatStatusLabel(bookingDetail.status)}
                    </span>
                  </div>

                  <div className="relative mt-[16px] flex items-baseline justify-between">
                    <div>
                      <div className="text-white text-[17px] font-bold leading-tight">
                        {bookingDetail.service?.type_name}
                      </div>
                      <div className="text-white/75 text-[12px] mt-[3px]">
                        {bookingDetail.service?.duration} · {bookingDetail.date} · {bookingDetail.time}
                      </div>
                    </div>
                    <div className="text-white text-[22px] font-extrabold whitespace-nowrap">
                      OMR {bookingDetail.pricing?.total_amount}
                    </div>
                  </div>
                </div>

                <div className="p-[22px] flex flex-col gap-[14px] -mt-[14px]">
                  {/* Customer & Professional cards */}
                  <div className="grid grid-cols-2 gap-[10px]">
                    <div className="bg-[#F8F8FA] rounded-[14px] p-[14px]">
                      <div className="flex items-center gap-[6px] mb-[8px]">
                        <span className="text-[14px]">👤</span>
                        <span className="text-[10px] font-bold text-[#9090A0] uppercase tracking-[0.5px]">Customer</span>
                      </div>
                      <div className="text-[13px] font-bold text-[#0A0A0F] truncate">{bookingDetail.user?.name}</div>
                      <div className="text-[11px] text-[#6B7280] mt-[3px] truncate">{bookingDetail.user?.email}</div>
                      <div className="text-[11px] text-[#6B7280] mt-[1px]">{bookingDetail.user?.mobile}</div>
                    </div>

                    <div className="bg-[#F8F8FA] rounded-[14px] p-[14px]">
                      <div className="flex items-center gap-[6px] mb-[8px]">
                        <span className="text-[14px]">🛠️</span>
                        <span className="text-[10px] font-bold text-[#9090A0] uppercase tracking-[0.5px]">Professional</span>
                      </div>
                      {bookingDetail.professional ? (
                        <>
                          <div className="text-[13px] font-bold text-[#0A0A0F] truncate">
                            {bookingDetail.professional.name}
                          </div>
                          <div className="text-[11px] text-[#D61CA8] font-semibold mt-[3px]">
                            ★ {bookingDetail.professional.rating} · {bookingDetail.professional.jobs_done} jobs
                          </div>
                          <div className="text-[11px] text-[#6B7280] mt-[1px] truncate">
                            {bookingDetail.professional.specialty}
                          </div>
                        </>
                      ) : (
                        <div className="text-[12px] font-bold text-[#EF4444] mt-[2px]">Unassigned</div>
                      )}
                    </div>
                  </div>

                  {/* Address */}
                  <div className="border border-[#EBEBEF] rounded-[14px] p-[14px]">
                    <div className="flex items-center gap-[6px] mb-[8px]">
                      <span className="text-[14px]">📍</span>
                      <span className="text-[10px] font-bold text-[#9090A0] uppercase tracking-[0.5px]">
                        Service Address
                      </span>
                    </div>
                    <div className="text-[13px] font-semibold text-[#0A0A0F]">
                      {bookingDetail.address?.villa_apartment_no}, {bookingDetail.address?.street_name}
                    </div>
                    <div className="text-[12px] text-[#6B7280] mt-[3px]">
                      {bookingDetail.address?.building_floor} · {bookingDetail.address?.area}
                    </div>
                    <div className="text-[12px] text-[#9090A0] mt-[3px] italic">
                      Landmark: {bookingDetail.address?.nearest_landmark}
                    </div>
                  </div>

                  {/* Payment */}
                  <div className="flex items-center justify-between border border-[#EBEBEF] rounded-[14px] px-[14px] py-[12px]">
                    <div className="flex items-center gap-[8px]">
                      <span className="text-[14px]">💳</span>
                      <span className="text-[12px] font-semibold text-[#0A0A0F]">
                        {bookingDetail.payment?.method}
                        {bookingDetail.payment?.card_last4 ? ` •••• ${bookingDetail.payment.card_last4}` : ''}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-[8px] py-[3px] rounded">
                      Paid
                    </span>
                  </div>

                  {/* Pricing breakdown */}
                  <div className="bg-gradient-to-br from-[#FDF2F8] to-[#F5F0FE] rounded-[14px] p-[16px]">
                    <div className="text-[10px] font-bold text-[#9090A0] uppercase tracking-[0.5px] mb-[10px]">
                      Pricing Breakdown
                    </div>
                    <div className="flex justify-between text-[12px] text-[#6B7280] mb-[6px]">
                      <span>Service fee</span>
                      <span className="font-medium text-[#0A0A0F]">OMR {bookingDetail.pricing?.service_fee}</span>
                    </div>
                    <div className="flex justify-between text-[12px] text-[#6B7280] mb-[6px]">
                      <span>Platform fee</span>
                      <span className="font-medium text-[#0A0A0F]">OMR {bookingDetail.pricing?.platform_fee}</span>
                    </div>
                    <div className="flex justify-between text-[12px] text-[#6B7280] mb-[10px]">
                      <span>VAT</span>
                      <span className="font-medium text-[#0A0A0F]">OMR {bookingDetail.pricing?.vat_amount}</span>
                    </div>
                    <div className="flex justify-between items-center text-[15px] font-extrabold text-[#0A0A0F] pt-[10px] border-t border-[#E7DCF2]">
                      <span>Total</span>
                      <span className="text-[#D61CA8]">OMR {bookingDetail.pricing?.total_amount}</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookings;