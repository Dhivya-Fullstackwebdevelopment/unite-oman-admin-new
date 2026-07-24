// import React, { useState, useEffect, useCallback } from 'react';

// const API_BASE_URL = 'http://127.0.0.1:8000/api';
// const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzg0OTU2MjU1LCJpYXQiOjE3ODQ4Njk4NTUsImp0aSI6IjMxMDBmMWE4N2U5NDRhMDlhYTU5OTMzZWNiODE2YThhIiwidXNlcl9pZCI6IjQifQ.f_BXMgL0keBze__OoGQ6nqPu2ORIRy4Squcv7T2noDU';

// const STATUS_TABS = [
//   { label: 'All', value: '' },
//   { label: 'Scheduled', value: 'SCHEDULED' },
//   { label: 'Pending', value: 'PENDING' },
//   { label: 'Confirmed', value: 'CONFIRMED' },
//   { label: 'En Route', value: 'EN_ROUTE' },
//   { label: 'Arrived', value: 'ARRIVED' },
//   { label: 'In Progress', value: 'IN_PROGRESS' },
//   { label: 'Completed', value: 'COMPLETED' },
//   { label: 'Cancelled', value: 'CANCELLED' },
//   { label: 'Unassigned', value: 'UNASSIGNED' },
// ];

// const statusStyles = {
//   SCHEDULED: 'bg-purple-100 text-purple-600',
//   PENDING: 'bg-amber-100 text-amber-600',
//   CONFIRMED: 'bg-sky-100 text-sky-600',
//   EN_ROUTE: 'bg-blue-100 text-blue-600',
//   ARRIVED: 'bg-indigo-100 text-indigo-600',
//   IN_PROGRESS: 'bg-orange-100 text-orange-600',
//   COMPLETED: 'bg-emerald-100 text-emerald-600',
//   CANCELLED: 'bg-red-100 text-red-500',
// };

// const paymentStyles = {
//   Paid: 'bg-emerald-100 text-emerald-600',
//   Pending: 'bg-amber-100 text-amber-600',
//   Refunded: 'bg-slate-100 text-slate-500',
//   paid: 'bg-emerald-100 text-emerald-600',
//   pending: 'bg-amber-100 text-amber-600',
//   refunded: 'bg-slate-100 text-slate-500',
// };

// const gridCols = 'grid-cols-[100px_1.4fr_1fr_1fr_100px_100px_110px_130px]';

// function formatStatusLabel(status) {
//   if (!status) return '';
//   return status
//     .split('_')
//     .map((w) => w.charAt(0) + w.slice(1).toLowerCase())
//     .join(' ');
// }

// async function apiGet(path) {
//   const res = await fetch(`${API_BASE_URL}${path}`, {
//     headers: { Authorization: `Bearer ${TOKEN}` },
//   });
//   if (!res.ok) {
//     throw new Error(`Request failed (${res.status})`);
//   }
//   return res.json();
// }

// const Bookings = () => {
//   const [activeStatus, setActiveStatus] = useState('');
//   const [searchInput, setSearchInput] = useState('');
//   const [search, setSearch] = useState('');
//   const [area, setArea] = useState('');
//   const [serviceId, setServiceId] = useState('');

//   const [locations, setLocations] = useState([]);
//   const [services, setServices] = useState([]);

//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [page, setPage] = useState(1);
//   const [pageSize] = useState(20);
//   const [totalCount, setTotalCount] = useState(0);
//   const [totalPages, setTotalPages] = useState(1);

//   // Load filter reference data once
//   useEffect(() => {
//     apiGet('/locations/')
//       .then((res) => setLocations(res.data || []))
//       .catch(() => {});
//     apiGet('/services/')
//       .then((res) => setServices(res.data || []))
//       .catch(() => {});
//   }, []);

//   const loadBookings = useCallback(() => {
//     setLoading(true);
//     setError(null);

//     const params = new URLSearchParams();
//     if (search) params.set('search', search);
//     if (activeStatus) params.set('status', activeStatus);
//     if (area) params.set('area', area);
//     if (serviceId) params.set('service_id', serviceId);
//     params.set('page', String(page));
//     params.set('page_size', String(pageSize));

//     apiGet(`/professionals/admin/bookings/?${params.toString()}`)
//       .then((res) => {
//         setBookings(res.data || []);
//         setTotalCount(res.total_count ?? (res.data || []).length);
//         setTotalPages(res.total_pages ?? 1);
//       })
//       .catch((err) => setError(err.message))
//       .finally(() => setLoading(false));
//   }, [search, activeStatus, area, serviceId, page, pageSize]);

//   useEffect(() => {
//     loadBookings();
//   }, [loadBookings]);

//   // Reset to page 1 whenever a filter changes
//   const handleStatusChange = (value) => {
//     setActiveStatus(value);
//     setPage(1);
//   };
//   const handleAreaChange = (value) => {
//     setArea(value);
//     setPage(1);
//   };
//   const handleServiceChange = (value) => {
//     setServiceId(value);
//     setPage(1);
//   };
//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     setSearch(searchInput.trim());
//     setPage(1);
//   };

//   const handleExport = () => {
//     const params = new URLSearchParams();
//     if (search) params.set('search', search);
//     if (activeStatus) params.set('status', activeStatus);
//     if (area) params.set('area', area);
//     if (serviceId) params.set('service_id', serviceId);
//     params.set('export', 'csv');
//     const url = `${API_BASE_URL}/professionals/admin/bookings/?${params.toString()}`;
//     fetch(url, { headers: { Authorization: `Bearer ${TOKEN}` } })
//       .then((res) => res.blob())
//       .then((blob) => {
//         const link = document.createElement('a');
//         link.href = URL.createObjectURL(blob);
//         link.download = 'bookings.csv';
//         link.click();
//       })
//       .catch(() => {});
//   };

//   const rangeStart = totalCount === 0 ? 0 : (page - 1) * pageSize + 1;
//   const rangeEnd = Math.min(page * pageSize, totalCount);

//   return (
//     <div className="flex-1 overflow-y-auto bg-[#F4F5F8] p-[24px]">
//       {/* Header row */}
//       <div className="flex items-center justify-between mb-[18px] flex-wrap gap-3">
//         <div>
//           <div className="font-extrabold text-[22px] leading-none text-[#0A0A0F]">All Bookings</div>
//           <div className="text-[14px] leading-none text-[#9090A0] mt-[4px]">
//             {totalCount} total · Full history + export
//           </div>
//         </div>
//         <div className="flex gap-[8px] flex-wrap">
//           <form onSubmit={handleSearchSubmit}>
//             <input
//               value={searchInput}
//               onChange={(e) => setSearchInput(e.target.value)}
//               className="bg-white border-[1.5px] border-[#EBEBEF] rounded-lg px-[14px] py-[9px] text-[13px] text-[#0A0A0F] outline-none w-[220px] placeholder:text-[#9090A0]"
//               placeholder="Search bookings..."
//             />
//           </form>
//           <select
//             value={area}
//             onChange={(e) => handleAreaChange(e.target.value)}
//             className="px-[14px] py-[9px] bg-white border-[1.5px] border-[#EBEBEF] rounded-lg text-[12px] font-medium text-[#6B7280] outline-none"
//           >
//             <option value="">All Areas</option>
//             {locations.map((loc) => (
//               <option key={loc.id} value={loc.name}>
//                 {loc.name}
//               </option>
//             ))}
//           </select>
//           <select
//             value={serviceId}
//             onChange={(e) => handleServiceChange(e.target.value)}
//             className="px-[14px] py-[9px] bg-white border-[1.5px] border-[#EBEBEF] rounded-lg text-[12px] font-medium text-[#6B7280] outline-none"
//           >
//             <option value="">All Services</option>
//             {services.map((s) => (
//               <option key={s.id} value={s.id}>
//                 {s.name}
//               </option>
//             ))}
//           </select>
//           <button
//             onClick={handleExport}
//             className="px-[18px] py-[9px] bg-gradient-to-r from-[#D61CA8] to-[#8B2EF5] rounded-lg text-[12px] font-bold text-white"
//           >
//             Export CSV
//           </button>
//         </div>
//       </div>

//       {/* Status filter pills */}
//       <div className="flex gap-[8px] mb-[18px] flex-wrap">
//         {STATUS_TABS.map((tab) => {
//           const isActive = activeStatus === tab.value;
//           return (
//             <button
//               key={tab.label}
//               onClick={() => handleStatusChange(tab.value)}
//               className={`px-4 py-[8px] rounded-full text-[12px] leading-none transition-colors ${
//                 isActive
//                   ? 'bg-[#D61CA818] border-[1.5px] border-[#D61CA840] font-bold text-[#D61CA8]'
//                   : 'bg-white border-[1.5px] border-[#EBEBEF] font-medium text-[#9090A0] hover:text-[#0A0A0F]'
//               }`}
//             >
//               {tab.label}
//             </button>
//           );
//         })}
//       </div>

//       {/* Table card */}
//       <div className="bg-white rounded-[14px] shadow-[0_1px_4px_rgba(0,0,0,0.05)] overflow-hidden">
//         <div className={`grid ${gridCols} gap-2 px-[16px] py-[10px] bg-[#F8F8FA] border-b border-[#EBEBEF]`}>
//           {['Code', 'Service · Customer', 'Professional', 'Date · Area', 'Price', 'Payment', 'Status', 'Time'].map(
//             (h, i) => (
//               <span key={i} className="text-[10px] font-semibold text-[#9090A0] uppercase tracking-[0.5px]">
//                 {h}
//               </span>
//             )
//           )}
//         </div>

//         {loading && <div className="py-14 text-center text-base font-medium text-[#9090A0]">Loading bookings…</div>}

//         {!loading && error && (
//           <div className="py-14 text-center text-base font-medium text-red-500">
//             Couldn't load bookings: {error}
//           </div>
//         )}

//         {!loading &&
//           !error &&
//           bookings.map((b) => (
//             <div
//               key={b.id}
//               className={`grid ${gridCols} gap-2 px-[16px] py-[13px] border-b border-[#F8F8F8] items-center`}
//             >
//               <span className="text-[12px] font-medium text-[#9090A0] font-mono">{b.booking_code}</span>
//               <div>
//                 <div className="text-[14px] font-semibold text-[#0A0A0F] leading-tight">{b.service_name}</div>
//                 <div className="text-[11px] text-[#9090A0] leading-tight mt-[2px]">{b.customer_name}</div>
//               </div>
//               <span className="text-[12px] font-medium text-[#0A0A0F]">{b.professional_name || 'Unassigned'}</span>
//               <span className="text-[12px] text-[#6B7280]">
//                 {b.date} · {b.area}
//               </span>
//               <span className="text-[13px] font-bold text-[#0A0A0F]">{b.price}</span>
//               <div
//                 className={`px-[8px] py-[3px] rounded text-[10px] font-bold inline-block w-fit ${
//                   paymentStyles[b.payment_status] || 'bg-slate-100 text-slate-500'
//                 }`}
//               >
//                 {b.payment_status}
//               </div>
//               <div
//                 className={`px-[8px] py-[3px] rounded text-[10px] font-bold inline-block w-fit ${
//                   statusStyles[b.status] || 'bg-slate-100 text-slate-500'
//                 }`}
//               >
//                 {formatStatusLabel(b.status)}
//               </div>
//               <span className="text-[12px] text-[#6B7280]">{b.time}</span>
//             </div>
//           ))}

//         {!loading && !error && bookings.length === 0 && (
//           <div className="py-14 text-center text-base font-medium text-[#9090A0]">No bookings match this filter.</div>
//         )}

//         {/* Pagination footer */}
//         <div className="px-[16px] py-[14px] border-t border-[#F0F0F4] bg-white rounded-b-[14px] flex items-center justify-between">
//           <div className="text-[12px] text-[#9090A0]">
//             {totalCount === 0 ? 'No results' : `Showing ${rangeStart}–${rangeEnd} of ${totalCount} bookings`}
//           </div>
//           <div className="flex gap-[6px] items-center">
//             <button
//               disabled={page <= 1}
//               onClick={() => setPage((p) => Math.max(1, p - 1))}
//               className="px-[12px] py-[6px] bg-white border-[1.5px] border-[#EBEBEF] rounded-md text-[11px] font-medium text-[#9090A0] disabled:opacity-40"
//             >
//               ← Prev
//             </button>
//             <span className="px-[10px] text-[11px] font-semibold text-[#0A0A0F]">
//               Page {page} of {totalPages}
//             </span>
//             <button
//               disabled={page >= totalPages}
//               onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//               className="px-[12px] py-[6px] bg-gradient-to-r from-[#D61CA8] to-[#8B2EF5] rounded-md text-[11px] font-bold text-white disabled:opacity-40"
//             >
//               Next →
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Bookings;



import React, { useState, useEffect, useCallback } from 'react';

const API_BASE_URL = 'http://127.0.0.1:8000/api';
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzg0OTU2MjU1LCJpYXQiOjE3ODQ4Njk4NTUsImp0aSI6IjMxMDBmMWE4N2U5NDRhMDlhYTU5OTMzZWNiODE2YThhIiwidXNlcl9pZCI6IjQifQ.f_BXMgL0keBze__OoGQ6nqPu2ORIRy4Squcv7T2noDU';

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

const gridCols = 'grid-cols-[100px_1.4fr_1fr_1fr_100px_100px_110px_130px]';

function formatStatusLabel(status) {
  if (!status) return '';
  return status
    .split('_')
    .map((w) => w.charAt(0) + w.slice(1).toLowerCase())
    .join(' ');
}

// Builds a numbered page sequence with ellipsis, e.g. 1 ... 4 [5] 6 ... 12
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

  // Load filter reference data once
  useEffect(() => {
    apiGet('/locations/')
      .then((res) => setLocations(res.data || []))
      .catch(() => {});
    apiGet('/services/')
      .then((res) => setServices(res.data || []))
      .catch(() => {});
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
      .catch(() => {});
  };

  const rangeStart = totalCount === 0 ? 0 : (page - 1) * pageSize + 1;
  const rangeEnd = Math.min(page * pageSize, totalCount);

  return (
    <div className="flex-1 overflow-y-auto bg-[#F4F5F8] p-[24px]">
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

          {/* Main location -> drives sub-area options */}
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

          {/* Sub-area, populated from /professionals/areas/?location_id= */}
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
            className="px-[18px] py-[9px] bg-gradient-to-r from-[#D61CA8] to-[#8B2EF5] rounded-lg text-[12px] font-bold text-white"
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
              className={`px-4 py-[8px] rounded-full text-[12px] leading-none transition-colors ${
                isActive
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
          {['Code', 'Service · Customer', 'Professional', 'Date · Area', 'Price', 'Payment', 'Status', 'Time'].map(
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
          bookings.map((b) => (
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
                className={`px-[8px] py-[3px] rounded text-[10px] font-bold inline-block w-fit ${
                  paymentStyles[b.payment_status] || 'bg-slate-100 text-slate-500'
                }`}
              >
                {b.payment_status}
              </div>
              <div
                className={`px-[8px] py-[3px] rounded text-[10px] font-bold inline-block w-fit ${
                  statusStyles[b.status] || 'bg-slate-100 text-slate-500'
                }`}
              >
                {formatStatusLabel(b.status)}
              </div>
              <span className="text-[12px] text-[#6B7280]">{b.time}</span>
              
            </div>
            
          ))}

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
    </div>
  );
};

export default Bookings;