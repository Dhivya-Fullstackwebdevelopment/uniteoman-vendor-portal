import React, { useState, useEffect, useCallback, useRef } from 'react';
import { getData, putData } from '../../api/apiService';
import API_BASE_URL, { API_ENDPOINTS } from '../../api/apiConfig';

const BOOKINGS_ENDPOINT = '/professionals/vendor/bookings/';
const UPDATE_STATUS_ENDPOINT = (id) => `/professionals/vendor/bookings/${id}/status/`;

const TABS = ['all', 'today', 'upcoming', 'ongoing', 'completed', 'cancelled'];

const parseCustomDate = (dateStr) => {
  if (!dateStr) return null;
  const parts = dateStr.split(' ');
  if (parts.length < 5) return null;
  const day = parseInt(parts[1], 10);
  const monthAbbr = parts[2];
  const time = parts[3] + ' ' + parts[4];
  const months = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
  };
  const month = months[monthAbbr];
  if (month === undefined) return null;
  const year = new Date().getFullYear();
  const [hourStr, minuteStr] = time.split(':');
  let hour = parseInt(hourStr, 10);
  const minute = parseInt(minuteStr.split(' ')[0], 10);
  const ampm = time.includes('PM') ? 'PM' : 'AM';
  if (ampm === 'PM' && hour < 12) hour += 12;
  if (ampm === 'AM' && hour === 12) hour = 0;
  return new Date(year, month, day, hour, minute);
};

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  return `${parts[2]}-${parts[1]}-${parts[0]}`;
};

const formatStatusLabel = (status) => {
  if (!status) return 'Unknown';
  return status.charAt(0).toUpperCase() + status.slice(1).replace(/_/g, ' ');
};

const Bookings = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [bookings, setBookings] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [categoryFilter, setCategoryFilter] = useState(null);
  const [dateFilter, setDateFilter] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 10;

  const [tabCounts, setTabCounts] = useState({});

  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [isDatePickerFocused, setIsDatePickerFocused] = useState(false);

  const categoryRef = useRef(null);
  const dateRef = useRef(null);
  const dateInputRef = useRef(null);

  const [showDetailModal, setShowDetailModal] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState(null);
  const [bookingDetail, setBookingDetail] = useState(null);

  const BOOKING_DETAIL_ENDPOINT = (id) => `/professionals/bookings/${id}/`;

  const openBookingDetail = async (bookingId) => {
    setShowDetailModal(true);
    setDetailLoading(true);
    setDetailError(null);
    setBookingDetail(null);
    try {
      const url = `${API_BASE_URL}${BOOKING_DETAIL_ENDPOINT(bookingId)}`;
      const response = await getData(url);
      if (response && response.data) {
        setBookingDetail(response.data);
      } else {
        setDetailError('Booking details not found.');
      }
    } catch (err) {
      console.error('Failed to fetch booking detail:', err);
      setDetailError('Failed to load booking details. Please try again.');
    } finally {
      setDetailLoading(false);
    }
  };

  const closeBookingDetail = () => {
    setShowDetailModal(false);
    setBookingDetail(null);
    setDetailError(null);
  };

  const updateBookingStatus = async (bookingId, newStatus) => {
    try {
      const url = `${API_BASE_URL}${UPDATE_STATUS_ENDPOINT(bookingId)}`;
      await putData(url, { status: newStatus });
      await fetchBookings(currentPage);
      await fetchTabCounts();
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const fetchCategories = useCallback(async () => {
    try {
      const professionalId = localStorage.getItem("vendor_professional_id");
      if (!professionalId) return;
      const url = API_ENDPOINTS.PROFESSIONAL_SERVICES(professionalId);
      const response = await getData(url);
      setCategories(response.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const fetchTabCounts = useCallback(async () => {
    try {
      const results = await Promise.all(
        TABS.map(async (tab) => {
          const params = new URLSearchParams();
          if (tab !== 'all') params.append('status', tab);
          if (categoryFilter) params.append('category_id', categoryFilter);
          if (dateFilter) params.append('date', dateFilter);
          const url = `${API_BASE_URL}${BOOKINGS_ENDPOINT}?${params.toString()}`;
          const res = await getData(url);
          const count = res?.total_count ?? (Array.isArray(res?.data) ? res.data.length : (Array.isArray(res) ? res.length : 0));
          return [tab, count];
        })
      );
      setTabCounts(Object.fromEntries(results));
    } catch (err) {
      console.error('Failed to fetch tab counts:', err);
    }
  }, [categoryFilter, dateFilter]);

  const fetchBookings = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (activeTab !== 'all') {
        params.append('status', activeTab);
      }
      if (categoryFilter) params.append('category_id', categoryFilter);
      if (dateFilter) params.append('date', dateFilter);
      params.append('page', page);
      params.append('page_size', pageSize);

      const url = `${API_BASE_URL}${BOOKINGS_ENDPOINT}?${params.toString()}`;
      const response = await getData(url);

      if (response && response.data) {
        setBookings(response.data);
        setTotalCount(response.total_count || 0);
        setTotalPages(response.total_pages || 1);
        setCurrentPage(response.current_page || page);
      } else if (Array.isArray(response)) {
        setBookings(response);
        setTotalCount(response.length);
        setTotalPages(1);
        setCurrentPage(1);
      } else {
        setBookings([]);
        setTotalCount(0);
        setTotalPages(1);
        setCurrentPage(1);
      }
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
      setBookings([]);
      setTotalCount(0);
      setTotalPages(1);
      setCurrentPage(1);
    } finally {
      setLoading(false);
    }
  }, [activeTab, categoryFilter, dateFilter]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchTabCounts();
    fetchBookings(1);
  }, [fetchTabCounts, fetchBookings]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isDatePickerFocused) return;
      if (categoryRef.current && !categoryRef.current.contains(e.target)) {
        setShowCategoryDropdown(false);
      }
      if (dateRef.current && !dateRef.current.contains(e.target)) {
        setShowDateDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDatePickerFocused]);

  const getStatusTone = (status) => {
    const map = {
      pending: 'bg-yellow-100 text-yellow-700',
      in_progress: 'bg-blue-100 text-blue-600',
      arrived: 'bg-purple-100 text-purple-600',
      en_route: 'bg-indigo-100 text-indigo-600',
      done: 'bg-emerald-100 text-emerald-600',
      completed: 'bg-emerald-100 text-emerald-600',
      upcoming: 'bg-amber-100 text-amber-600',
      scheduled: 'bg-purple-100 text-purple-600',
      cancelled: 'bg-red-100 text-red-600',
      today: 'bg-blue-100 text-blue-600',
      ongoing: 'bg-indigo-100 text-indigo-600',
      confirmed: 'bg-green-100 text-green-700',
    };
    return map[status?.toLowerCase()] || 'bg-gray-100 text-gray-600';
  };

  const renderCategoryDropdown = () => (
    <div className="relative" ref={categoryRef}>
      <button
        onClick={() => setShowCategoryDropdown((prev) => !prev)}
        className="px-[16px] py-[8px] bg-white border-[1.5px] border-[#EBEBEF] rounded-[9px] text-[12px] font-medium text-[#6B7280] flex items-center gap-1"
      >
        Category {
          categoryFilter
            ? `: ${categories.find((c) => c.service_id === categoryFilter)?.service_name || ''
            }`
            : ''
        } ▾
      </button>
      {showCategoryDropdown && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-[#EBEBEF] rounded-[9px] shadow-lg z-20 min-w-[180px] max-h-[260px] overflow-y-auto py-1">
          <button
            onClick={() => {
              setCategoryFilter(null);
              setShowCategoryDropdown(false);
            }}
            className={`block w-full text-left px-4 py-2 text-[13px] hover:bg-[#F4F5F8] ${categoryFilter === null ? 'text-[#D61CA8] font-bold' : 'text-[#0A0A0F]'
              }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat.service_id}
              onClick={() => {
                setCategoryFilter(cat.service_id);
                setShowCategoryDropdown(false);
              }}
              className={`block w-full text-left px-4 py-2 text-[13px] hover:bg-[#F4F5F8] ${categoryFilter === cat.service_id ? 'text-[#D61CA8] font-bold' : 'text-[#0A0A0F]'
                }`}
            >
              {cat.service_name}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  const renderDateDropdown = () => {
    const displayDate = dateFilter ? formatDate(dateFilter) : '';
    return (
      <div className="relative" ref={dateRef}>
        <button
          onClick={() => setShowDateDropdown((prev) => !prev)}
          className="px-[16px] py-[8px] bg-white border-[1.5px] border-[#EBEBEF] rounded-[9px] text-[12px] font-medium text-[#6B7280] flex items-center gap-1"
        >
          Date {displayDate ? `: ${displayDate}` : ''} ▾
        </button>
        {showDateDropdown && (
          <div className="absolute top-full right-1 mt-1 bg-white border border-[#EBEBEF] rounded-[9px] shadow-lg z-20 p-3 min-w-[200px]">
            <input
              ref={dateInputRef}
              type="date"
              value={dateFilter}
              onFocus={() => setIsDatePickerFocused(true)}
              onBlur={() => setTimeout(() => setIsDatePickerFocused(false), 200)}
              onChange={(e) => {
                setDateFilter(e.target.value);
                setShowDateDropdown(false);
                setIsDatePickerFocused(false);
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
  };

  // ─── Booking Detail Modal (with fixed close button) ───
  const renderBookingDetailModal = () => {
    if (!showDetailModal) return null;

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[2px] p-4"
        onClick={closeBookingDetail}
      >
        <div
          className="bg-white rounded-[20px] w-full max-w-[520px] max-h-[88vh] overflow-y-auto shadow-2xl modal-scroll"
          onClick={(e) => e.stopPropagation()}
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#D1D5DB transparent',
          }}
        >
          <style>{`
            .modal-scroll::-webkit-scrollbar {
              width: 4px;
            }
            .modal-scroll::-webkit-scrollbar-track {
              background: transparent;
              border-radius: 10px;
            }
            .modal-scroll::-webkit-scrollbar-thumb {
              background: #D1D5DB;
              border-radius: 10px;
            }
            .modal-scroll::-webkit-scrollbar-thumb:hover {
              background: #B0B5C0;
            }
          `}</style>

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
              <div className="relative bg-gradient-to-br from-[#D61CA8] to-[#8B2EF5] rounded-t-[20px] px-[24px] pt-[22px] pb-[26px] overflow-hidden">
                <div className="absolute -top-8 -right-8 w-[140px] h-[140px] rounded-full bg-white/10" />
                <div className="absolute -bottom-10 -left-6 w-[100px] h-[100px] rounded-full bg-white/10" />

                {/* FIXED CLOSE BUTTON – added z-10 and stopPropagation */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    closeBookingDetail();
                  }}
                  className="absolute top-[16px] right-[16px] z-10 w-[28px] h-[28px] flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white text-[13px] font-bold transition-colors"
                  aria-label="Close"
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
    );
  };

  const renderBookingItem = (booking) => {
    const name = booking.service_name || booking.name || 'Service';
    const customer = booking.customer_name || booking.client_name || 'Customer';
    const dateTime = booking.date_time || booking.time || '';
    const location = booking.location || '';
    const metaParts = [customer, dateTime, location].filter(Boolean);
    const meta = metaParts.length > 0 ? metaParts.join(' · ') : 'No details available';
    const price = booking.price || booking.amount || booking.total || 'OMR 0';
    const displayStatus = booking.status_display || booking.status || 'Scheduled';
    const statusTone = getStatusTone(booking.status || displayStatus);
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
          {displayStatus}
        </div>
        <div className="flex gap-[5px]">
          <button
            onClick={() => openBookingDetail(booking.id)}
            className="px-[11px] py-[6px] bg-[#F8F8FA] border border-[#EBEBEF] rounded-[7px] text-[11px] font-semibold text-[#555]"
          >
            View
          </button>
          {secondAction === 'Receipt' && (
            <button className="px-[11px] py-[6px] bg-[#D1FAE5] rounded-[7px] text-[11px] font-bold text-[#059669]">
              Receipt
            </button>
          )}
          {secondAction === 'Complete' && (
            <button
              className="px-[11px] py-[6px] bg-gradient-to-r from-[#D61CA8] to-[#8B2EF5] rounded-[7px] text-[11px] font-bold text-white"
              onClick={() => updateBookingStatus(booking.id, 'COMPLETED')}
            >
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

  const renderShimmer = () => (
    <div className="flex flex-col gap-[10px]">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex items-center gap-[14px] bg-white rounded-[14px] p-[15px] shadow-[0_1px_4px_rgba(0,0,0,0.04)] animate-pulse"
        >
          <div className="w-[46px] h-[46px] rounded-[11px] bg-gray-200"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
          <div className="w-[60px] h-5 bg-gray-200 rounded"></div>
          <div className="w-[70px] h-5 bg-gray-200 rounded"></div>
          <div className="flex gap-[5px]">
            <div className="w-[50px] h-7 bg-gray-200 rounded"></div>
            <div className="w-[50px] h-7 bg-gray-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderPagination = () => {
    if (totalCount === 0) return null;
    const start = (currentPage - 1) * pageSize + 1;
    const end = Math.min(currentPage * pageSize, totalCount);

    const pageNumbers = [];
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);
    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="flex items-center justify-between mt-4 text-[13px] text-[#6B7280]">
        <div>
          Showing {start}–{end} of {totalCount} bookings
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => fetchBookings(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded border border-[#EBEBEF] ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#F4F5F8]'
              }`}
          >
            ← Prev
          </button>
          {pageNumbers.map((p) => (
            <button
              key={p}
              onClick={() => fetchBookings(p)}
              className={`px-3 py-1 rounded border ${p === currentPage
                ? 'bg-[#D61CA8] text-white border-[#D61CA8]'
                : 'border-[#EBEBEF] hover:bg-[#F4F5F8]'
                }`}
            >
              {p}
            </button>
          ))}
          {endPage < totalPages && (
            <>
              <span>...</span>
              <button
                onClick={() => fetchBookings(totalPages)}
                className="px-3 py-1 rounded border border-[#EBEBEF] hover:bg-[#F4F5F8]"
              >
                {totalPages}
              </button>
            </>
          )}
          <button
            onClick={() => fetchBookings(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded border border-[#EBEBEF] ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#F4F5F8]'
              }`}
          >
            Next →
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden bg-[#F4F5F8] pt-6 pb-6 pl-6 pr-8">
      <div className="flex items-center justify-between mb-[18px] flex-wrap gap-2">
        <div>
          <div className="font-extrabold text-[22px] leading-none text-[#0A0A0F]">
            My Bookings
          </div>
          <div className="text-[14px] leading-none text-[#9090A0] mt-[4px]">
            All jobs — today, upcoming, ongoing, completed, cancelled
          </div>
        </div>

        <div className="flex gap-[9px] flex-wrap">
          {renderCategoryDropdown()}
          {renderDateDropdown()}
        </div>
      </div>

      <div className="flex flex-wrap gap-1 bg-white rounded-[13px] p-1 mb-[16px] shadow-[0_1px_4px_rgba(0,0,0,0.05)]">
        {TABS.map((tabKey) => (
          <button
            key={tabKey}
            onClick={() => setActiveTab(tabKey)}
            className={`px-[22px] py-[10px] text-[13px] rounded-[8px] transition-colors ${activeTab === tabKey
              ? 'bg-gradient-to-r from-[#D61CA8] to-[#8B2EF5] font-bold text-white'
              : 'font-medium text-[#9090A0] hover:bg-[#F4F5F8]'
              }`}
          >
            {tabKey.charAt(0).toUpperCase() + tabKey.slice(1)} ({tabCounts[tabKey] ?? 0})
          </button>
        ))}
      </div>

      {loading ? (
        renderShimmer()
      ) : bookings.length === 0 ? (
        <div className="flex justify-center items-center py-12 bg-white rounded-[14px]">
          <div className="text-[#9090A0]">No bookings found for this filter.</div>
        </div>
      ) : (
        <div>
          <div className="flex flex-col gap-[10px]">
            {bookings.map(renderBookingItem)}
          </div>
          {renderPagination()}
        </div>
      )}
      {renderBookingDetailModal()}
    </div>
  );
};

export default Bookings;