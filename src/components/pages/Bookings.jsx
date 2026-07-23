import React, { useState, useEffect, useRef, useCallback } from 'react';
import { getData } from '../../api/apiService';
import API_BASE_URL from '../../api/apiConfig'; // adjust path as needed

// ============================================================
// API endpoints – appended to API_BASE_URL
// ============================================================
const BOOKINGS_ENDPOINT = '/professionals/vendor/bookings/';
const SERVICES_ENDPOINT = '/services/';

// ============================================================
// MAIN COMPONENT
// ============================================================
const Bookings = () => {
  // ---------- state ----------
  const [activeTab, setActiveTab] = useState('today');
  const [bookings, setBookings] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // filter values
  const [statusFilter, setStatusFilter] = useState('today');
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [dateFilter, setDateFilter] = useState('');

  // dropdown toggles
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);

  // refs for click-outside
  const statusRef = useRef(null);
  const categoryRef = useRef(null);
  const dateRef = useRef(null);

  // ---------- fetch categories (main services) ----------
  const fetchCategories = useCallback(async () => {
    try {
      const url = `${API_BASE_URL}${SERVICES_ENDPOINT}`;
      const response = await getData(url);
      // response structure: { status, message, data: [...] }
      if (response && Array.isArray(response.data)) {
        setCategories(response.data);
      } else if (Array.isArray(response)) {
        setCategories(response);
      }
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  }, []);

  // ---------- fetch bookings with current filters ----------
  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter) params.append('status', statusFilter);
      if (categoryFilter) params.append('category_id', categoryFilter);
      if (dateFilter) params.append('date', dateFilter);

      const url = `${API_BASE_URL}${BOOKINGS_ENDPOINT}?${params.toString()}`;
      const data = await getData(url);

      // Adjust based on your actual API response structure
      if (Array.isArray(data)) {
        setBookings(data);
      } else if (data && Array.isArray(data.data)) {
        setBookings(data.data);
      } else {
        setBookings([]);
      }
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, categoryFilter, dateFilter]);

  // ---------- load categories on mount ----------
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // ---------- fetch bookings whenever filters change ----------
  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  // ---------- click-outside: close dropdowns ----------
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (statusRef.current && !statusRef.current.contains(e.target)) {
        setShowStatusDropdown(false);
      }
      if (categoryRef.current && !categoryRef.current.contains(e.target)) {
        setShowCategoryDropdown(false);
      }
      if (dateRef.current && !dateRef.current.contains(e.target)) {
        setShowDateDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ---------- helpers ----------
  const getStatusTone = (status) => {
    const map = {
      active: 'bg-blue-100 text-blue-600',
      done: 'bg-emerald-100 text-emerald-600',
      completed: 'bg-emerald-100 text-emerald-600',
      upcoming: 'bg-amber-100 text-amber-600',
      scheduled: 'bg-purple-100 text-purple-600',
      cancelled: 'bg-red-100 text-red-600',
      today: 'bg-blue-100 text-blue-600',
    };
    return map[status?.toLowerCase()] || 'bg-gray-100 text-gray-600';
  };

  const getTabCount = (tabKey) => {
    const map = {
      today: bookings.filter((b) => b.status?.toLowerCase() === 'today').length,
      upcoming: bookings.filter((b) => b.status?.toLowerCase() === 'upcoming').length,
      completed: bookings.filter((b) => b.status?.toLowerCase() === 'completed').length,
      cancelled: bookings.filter((b) => b.status?.toLowerCase() === 'cancelled').length,
    };
    return map[tabKey] || 0;
  };

  // filter bookings for the active tab (client-side filtering)
  const filteredBookings = bookings.filter((b) => {
    const status = b.status?.toLowerCase() || '';
    if (activeTab === 'today') return status === 'today';
    if (activeTab === 'upcoming') return status === 'upcoming';
    if (activeTab === 'completed') return status === 'completed';
    if (activeTab === 'cancelled') return status === 'cancelled';
    return true;
  });

  // ---------- render dropdowns ----------
  const renderStatusDropdown = () => (
    <div className="relative" ref={statusRef}>
      <button
        onClick={() => setShowStatusDropdown((prev) => !prev)}
        className="px-[16px] py-[8px] bg-white border-[1.5px] border-[#EBEBEF] rounded-[9px] text-[12px] font-medium text-[#6B7280] flex items-center gap-1"
      >
        Status {statusFilter && `: ${statusFilter}`} ▾
      </button>
      {showStatusDropdown && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-[#EBEBEF] rounded-[9px] shadow-lg z-20 min-w-[140px] py-1">
          {['today', 'upcoming', 'completed', 'cancelled'].map((s) => (
            <button
              key={s}
              onClick={() => {
                setStatusFilter(s);
                setActiveTab(s);
                setShowStatusDropdown(false);
              }}
              className={`block w-full text-left px-4 py-2 text-[13px] hover:bg-[#F4F5F8] ${
                statusFilter === s ? 'text-[#D61CA8] font-bold' : 'text-[#0A0A0F]'
              }`}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  const renderCategoryDropdown = () => (
    <div className="relative" ref={categoryRef}>
      <button
        onClick={() => setShowCategoryDropdown((prev) => !prev)}
        className="px-[16px] py-[8px] bg-white border-[1.5px] border-[#EBEBEF] rounded-[9px] text-[12px] font-medium text-[#6B7280] flex items-center gap-1"
      >
        Category {categoryFilter ? `: ${categories.find((c) => c.id === categoryFilter)?.name || ''}` : ''} ▾
      </button>
      {showCategoryDropdown && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-[#EBEBEF] rounded-[9px] shadow-lg z-20 min-w-[180px] max-h-[260px] overflow-y-auto py-1">
          <button
            onClick={() => {
              setCategoryFilter(null);
              setShowCategoryDropdown(false);
            }}
            className={`block w-full text-left px-4 py-2 text-[13px] hover:bg-[#F4F5F8] ${
              categoryFilter === null ? 'text-[#D61CA8] font-bold' : 'text-[#0A0A0F]'
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setCategoryFilter(cat.id);
                setShowCategoryDropdown(false);
              }}
              className={`block w-full text-left px-4 py-2 text-[13px] hover:bg-[#F4F5F8] ${
                categoryFilter === cat.id ? 'text-[#D61CA8] font-bold' : 'text-[#0A0A0F]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  const renderDateDropdown = () => (
    <div className="relative" ref={dateRef}>
      <button
        onClick={() => setShowDateDropdown((prev) => !prev)}
        className="px-[16px] py-[8px] bg-white border-[1.5px] border-[#EBEBEF] rounded-[9px] text-[12px] font-medium text-[#6B7280] flex items-center gap-1"
      >
        Date {dateFilter ? `: ${dateFilter}` : ''} ▾
      </button>
      {showDateDropdown && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-[#EBEBEF] rounded-[9px] shadow-lg z-20 p-3 min-w-[200px]">
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => {
              setDateFilter(e.target.value);
              setShowDateDropdown(false);
            }}
            className="w-full px-3 py-2 border border-[#EBEBEF] rounded-[7px] text-[13px] focus:outline-none focus:ring-2 focus:ring-[#D61CA8]"
          />
          {dateFilter && (
            <button
              onClick={() => {
                setDateFilter('');
                setShowDateDropdown(false);
              }}
              className="mt-2 text-[12px] text-[#D61CA8] font-medium hover:underline"
            >
              Clear date
            </button>
          )}
        </div>
      )}
    </div>
  );

  // ---------- render booking item ----------
  const renderBookingItem = (booking) => {
    // fallback values if API returns different field names
    const name = booking.service_name || booking.name || 'Service';
    const meta =
      booking.customer_name ||
      booking.client_name ||
      booking.meta ||
      `${booking.customer || 'Customer'} · ${booking.time || ''} · ${booking.location || ''}`;
    const price =
      booking.price || booking.amount || booking.total || 'OMR 0';
    const status = booking.status || 'Scheduled';
    const statusTone = getStatusTone(status);
    const icon = booking.icon || '🔧';
    const iconBg = booking.icon_bg || '#F4F5F8';
    const borderColor = booking.border_color || '#8B2EF5';
    const secondAction = booking.action || 'View';

    return (
      <div
        key={booking.id || Math.random()}
        className="flex items-center gap-[14px] bg-white rounded-[14px] p-[15px] shadow-[0_1px_4px_rgba(0,0,0,0.04)]"
        style={{ borderLeft: `4px solid ${borderColor}` }}
      >
        <div
          className="w-[46px] h-[46px] rounded-[11px] flex items-center justify-center text-[21px] flex-shrink-0"
          style={{ background: iconBg }}
        >
          {icon}
        </div>
        <div className="flex-1">
          <div className="text-[15px] font-bold text-[#0A0A0F]">{name}</div>
          <div className="text-[12px] text-[#9090A0] mt-[2px]">{meta}</div>
        </div>
        <div className="text-[15px] font-bold text-[#D61CA8]">{price}</div>
        <div className={`px-[10px] py-[4px] rounded text-[10px] font-bold ${statusTone}`}>
          {status}
        </div>
        <div className="flex gap-[5px]">
          <button className="px-[11px] py-[6px] bg-[#F8F8FA] border border-[#EBEBEF] rounded-[7px] text-[11px] font-semibold text-[#555]">
            View
          </button>
          {secondAction === 'Receipt' && (
            <button className="px-[11px] py-[6px] bg-[#D1FAE5] rounded-[7px] text-[11px] font-bold text-[#059669]">
              Receipt
            </button>
          )}
          {secondAction === 'Complete' && (
            <button className="px-[11px] py-[6px] bg-gradient-to-r from-[#D61CA8] to-[#8B2EF5] rounded-[7px] text-[11px] font-bold text-white">
              Complete
            </button>
          )}
          {secondAction === 'Navigate' && (
            <button className="px-[11px] py-[6px] bg-gradient-to-r from-[#D61CA8] to-[#8B2EF5] rounded-[7px] text-[11px] font-bold text-white">
              Navigate
            </button>
          )}
          {!['Receipt', 'Complete', 'Navigate'].includes(secondAction) && (
            <button className="px-[11px] py-[6px] bg-gradient-to-r from-[#D61CA8] to-[#8B2EF5] rounded-[7px] text-[11px] font-bold text-white">
              {secondAction}
            </button>
          )}
        </div>
      </div>
    );
  };

  // ---------- render ----------
  return (
    <div className="flex-1 overflow-y-auto bg-[#F4F5F8] p-[24px]">
      {/* header */}
      <div className="flex items-center justify-between mb-[18px]">
        <div>
          <div className="font-extrabold text-[22px] leading-none text-[#0A0A0F]">
            My Bookings
          </div>
          <div className="text-[14px] leading-none text-[#9090A0] mt-[4px]">
            All jobs — today, upcoming, completed, cancelled
          </div>
        </div>

        {/* filter buttons */}
        <div className="flex gap-[9px]">
          {renderStatusDropdown()}
          {renderCategoryDropdown()}
          {renderDateDropdown()}
        </div>
      </div>

      {/* tabs */}
      <div className="flex bg-white rounded-[13px] overflow-hidden mb-[16px] shadow-[0_1px_4px_rgba(0,0,0,0.05)] w-fit">
        {['today', 'upcoming', 'completed', 'cancelled'].map((tabKey) => (
          <button
            key={tabKey}
            onClick={() => {
              setActiveTab(tabKey);
              setStatusFilter(tabKey);
            }}
            className={`px-[22px] py-[10px] text-[13px] ${
              activeTab === tabKey
                ? 'bg-gradient-to-r from-[#D61CA8] to-[#8B2EF5] font-bold text-white'
                : 'font-medium text-[#9090A0]'
            }`}
          >
            {tabKey.charAt(0).toUpperCase() + tabKey.slice(1)} ({getTabCount(tabKey)})
          </button>
        ))}
      </div>

      {/* booking list */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="text-[#9090A0]">Loading bookings…</div>
        </div>
      ) : filteredBookings.length === 0 ? (
        <div className="flex justify-center items-center py-12 bg-white rounded-[14px]">
          <div className="text-[#9090A0]">No bookings found for this filter.</div>
        </div>
      ) : (
        <div className="flex flex-col gap-[10px]">
          {filteredBookings.map(renderBookingItem)}
        </div>
      )}
    </div>
  );
};

export default Bookings;