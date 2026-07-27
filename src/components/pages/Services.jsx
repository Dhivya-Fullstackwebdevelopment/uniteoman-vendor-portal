import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { getData, postData, deleteData } from '../../api/apiService';

// Shimmer Skeleton Loader Component
const TableSkeleton = () => (
  <div className="animate-pulse space-y-3 p-4">
    {[1, 2, 3, 4, 5].map((index) => (
      <div key={index} className="flex items-center space-x-4">
        <div className="h-5 bg-gray-200 rounded w-1/4"></div>
        <div className="h-5 bg-gray-200 rounded w-1/6"></div>
        <div className="h-5 bg-gray-200 rounded w-1/6"></div>
        <div className="h-5 bg-gray-200 rounded w-1/6"></div>
        <div className="h-5 bg-gray-200 rounded w-1/12"></div>
      </div>
    ))}
  </div>
);

const Services = () => {
  // API State Management
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [pricingData, setPricingData] = useState([]);
  const [serviceAreas, setServiceAreas] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);

  // Areas API State
  const [notAddedAreas, setNotAddedAreas] = useState([]);

  // AI Pricing Note State
  const [aiPricingNote, setAiPricingNote] = useState('');

  // UI State
  const [activeCategory, setActiveCategory] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editOfferingId, setEditOfferingId] = useState(null);

  // Area Selection & Modals State
  const [selectedAreaToAdd, setSelectedAreaToAdd] = useState('');
  const [showAddAreaInput, setShowAddAreaInput] = useState(false);
  const [areaToDelete, setAreaToDelete] = useState(null); // Triggers delete popup modal

  // Form State
  const [formData, setFormData] = useState({
    category_id: '',
    service_type_id: '',
    base_price: '',
    status: 'active',
    area_prices: {}
  });

  const [availableSubCategories, setAvailableSubCategories] = useState([]);

  // 1. Initial Load: Fetch Pricing Table, Categories, Working Areas & Vendor Services APIs
  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchPricingList(),
        fetchCategories(),
        fetchVendorAreas(),
        fetchVendorServices()
      ]);
    } catch (err) {
      console.error('Error fetching initial data:', err);
      toast.error('Failed to load services data. Please refresh.');
    } finally {
      setLoading(false);
    }
  };

  // GET: Vendor Services & Dynamic AI Pricing Note
  const fetchVendorServices = async () => {
    try {
      const result = await getData('/professionals/vendor/services/');
      if (result.status === 'success' && result.ai_pricing_note) {
        setAiPricingNote(result.ai_pricing_note.message || '');
      }
    } catch (error) {
      console.error('Failed to load vendor services AI note:', error);
    }
  };

  // GET: Vendor Services & Pricing Table Data
  const fetchPricingList = async () => {
    try {
      const result = await getData('/professionals/vendor/services-pricing/');
      if (result.status === 'success') {
        setPricingData(result.data || []);
        setServiceAreas(result.service_areas || []);
      }
    } catch (error) {
      console.error('Failed to load services pricing:', error);
      toast.error(error?.response?.data?.message || 'Failed to fetch services list');
    }
  };

  // GET: All Categories & Sub-services Dropdown
  const fetchCategories = async () => {
    try {
      const result = await getData('/professionals/vendor/services/categories/');
      if (result.status === 'success') {
        setCategoriesList(result.data || []);
      }
    } catch (error) {
      console.error('Failed to load categories:', error);
    }
  };

  // GET: Fetch Available and Not-Added Areas for Dropdown
  const fetchVendorAreas = async () => {
    try {
      const result = await getData('/professionals/vendor/areas/');
      if (result.status === 'success') {
        const notAdded = result.not_added_areas || [];
        setNotAddedAreas(notAdded);
        if (notAdded.length > 0) {
          setSelectedAreaToAdd(notAdded[0]);
        } else {
          setSelectedAreaToAdd('');
        }
      }
    } catch (error) {
      console.error('Failed to load vendor areas:', error);
    }
  };

  // POST: Add Selected Working Area from Dropdown
  const handleAddArea = async () => {
    if (!selectedAreaToAdd) {
      toast.error('Please select an area to add');
      return;
    }
    try {
      const result = await postData('/professionals/vendor/areas/', {
        area: selectedAreaToAdd
      });
      if (result.status === 'success') {
        toast.success(result.message || `${selectedAreaToAdd} added successfully!`);
        setShowAddAreaInput(false);
        // Refresh pricing list & areas dropdown
        fetchPricingList();
        fetchVendorAreas();
      }
    } catch (error) {
      console.error('Failed to add area:', error);
      toast.error(error?.response?.data?.message || 'Failed to add working area');
    }
  };

  // DELETE: Confirmed Delete Area Action
  const confirmDeleteArea = async () => {
    if (!areaToDelete) return;
    try {
      await deleteData(`/professionals/vendor/areas/${encodeURIComponent(areaToDelete)}/`);
      toast.success(`${areaToDelete} removed successfully`);
      setAreaToDelete(null); // Close popup
      fetchPricingList();
      fetchVendorAreas();
    } catch (error) {
      console.error('Failed to delete area:', error);
      toast.error(error?.response?.data?.message || 'Failed to remove area');
    }
  };

  // Handle Category Change in Modal Form
  const handleCategoryChange = (catId) => {
    const selectedCat = categoriesList.find((c) => String(c.category_id) === String(catId));
    const subServices = selectedCat ? selectedCat.service_names : [];

    setAvailableSubCategories(subServices);
    setFormData((prev) => ({
      ...prev,
      category_id: catId,
      service_type_id: subServices.length > 0 ? subServices[0].id : '',
      base_price: subServices.length > 0 ? subServices[0].price : prev.base_price
    }));
  };

  // Handle Sub-Category (Service Name) Change
  const handleServiceTypeChange = (typeId) => {
    const selectedType = availableSubCategories.find((s) => String(s.id) === String(typeId));
    setFormData((prev) => ({
      ...prev,
      service_type_id: typeId,
      base_price: selectedType ? selectedType.price : prev.base_price
    }));
  };

  // Modal Open Handlers
  const handleOpenAddModal = () => {
    setIsEditing(false);
    setEditOfferingId(null);

    const initialCat = categoriesList[0];
    const initialSub = initialCat?.service_names || [];
    setAvailableSubCategories(initialSub);

    const initialAreaPrices = {};
    serviceAreas.forEach((area) => {
      initialAreaPrices[area] = '';
    });

    setFormData({
      category_id: initialCat ? initialCat.category_id : '',
      service_type_id: initialSub.length > 0 ? initialSub[0].id : '',
      base_price: initialSub.length > 0 ? initialSub[0].price : '',
      status: 'active',
      area_prices: initialAreaPrices
    });

    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (item) => {
    setIsEditing(true);
    setEditOfferingId(item.offering_id);

    const selectedCat = categoriesList.find((c) => String(c.category_id) === String(item.category_id));
    setAvailableSubCategories(selectedCat ? selectedCat.service_names : []);

    const areaPricesObj = {};
    serviceAreas.forEach((area) => {
      areaPricesObj[area] = item.area_prices && item.area_prices[area] ? item.area_prices[area] : '';
    });

    setFormData({
      category_id: item.category_id,
      service_type_id: item.service_type_id,
      base_price: item.base_price,
      status: item.status,
      area_prices: areaPricesObj
    });

    setIsAddModalOpen(true);
  };

  // Toggle Active/Paused Status Directly
  const handleToggleStatus = async (item) => {
    const newStatus = item.status === 'active' ? 'paused' : 'active';
    try {
      const result = await postData(`/professionals/vendor/services/${item.offering_id}/edit/`, {
        base_price: parseFloat(item.base_price),
        status: newStatus,
        area_prices: item.area_prices || {}
      });
      if (result.status === 'success') {
        toast.success(`Service status changed to ${newStatus}`);
        fetchPricingList();
      }
    } catch (error) {
      console.error('Failed to toggle status:', error);
      toast.error('Failed to update service status');
    }
  };

  // POST Submit: Add or Edit Service
  const handleSaveService = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const cleanAreaPrices = {};
    Object.keys(formData.area_prices).forEach((key) => {
      if (formData.area_prices[key]) {
        cleanAreaPrices[key] = parseFloat(formData.area_prices[key]);
      }
    });

    const endpoint = isEditing
      ? `/professionals/vendor/services/${editOfferingId}/edit/`
      : '/professionals/vendor/services/add/';

    const payload = isEditing
      ? {
          base_price: parseFloat(formData.base_price),
          status: formData.status,
          area_prices: cleanAreaPrices
        }
      : {
          category_id: parseInt(formData.category_id),
          service_type_id: parseInt(formData.service_type_id),
          base_price: parseFloat(formData.base_price),
          status: formData.status,
          area_prices: cleanAreaPrices
        };

    try {
      const result = await postData(endpoint, payload);
      if (result.status === 'success') {
        toast.success(result.message || `Service ${isEditing ? 'updated' : 'added'} successfully!`);
        setIsAddModalOpen(false);
        fetchPricingList();
        fetchVendorServices(); // Refresh AI pricing note
      }
    } catch (error) {
      console.error('Failed to save service:', error);
      toast.error(error?.response?.data?.message || `Failed to ${isEditing ? 'update' : 'add'} service`);
    } finally {
      setSubmitting(false);
    }
  };

  // Dynamic Unique Categories from fetched pricing data
  const dynamicCategories = ['All', ...new Set(pricingData.map((s) => s.category_name))];

  // Filter list by selected active tab
  const filteredServices = pricingData.filter((s) => {
    if (activeCategory === 'All') return true;
    return s.category_name === activeCategory;
  });

  // Dynamic grid column layout template
  const dynamicGridStyle = {
    gridTemplateColumns: `1.5fr 100px ${serviceAreas.map(() => '100px').join(' ')} 80px 90px`
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#F4F5F8] p-[24px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-[16px]">
        <div>
          <div className="font-extrabold text-[22px] leading-none text-[#0A0A0F]">My Services &amp; Pricing</div>
          <div className="text-[14px] leading-none text-[#9090A0] mt-[4px]">Set per-area pricing · Admin sets floor/cap</div>
        </div>
        <div className="flex gap-[9px]">
          <div className="flex items-center gap-[6px] bg-[#D61CA80D] border border-[#D61CA826] rounded-full px-[13px] py-[6px]">
            <span>✨</span>
            <span className="text-[12px] font-semibold text-[#D61CA8]">AI Pricing</span>
          </div>
          <button 
            onClick={handleOpenAddModal}
            className="px-[16px] py-[8px] bg-gradient-to-r from-[#D61CA8] to-[#8B2EF5] rounded-[9px] text-[12px] font-bold text-white shadow-sm hover:opacity-95 transition-all cursor-pointer"
          >
            + Add Service
          </button>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex gap-[8px] mb-[16px] flex-wrap">
        {dynamicCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-[15px] py-[6px] rounded-full text-[12px] transition-all cursor-pointer ${
              activeCategory === cat
                ? 'bg-gradient-to-r from-[#D61CA8] to-[#8B2EF5] font-bold text-white'
                : 'bg-white border-[1.5px] border-[#EBEBEF] font-medium text-[#9090A0]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* AI Insight Banner - Dynamic Message Mapping */}
      {aiPricingNote && (
        <div className="flex gap-[9px] bg-[#D61CA80A] border border-[#D61CA81F] rounded-[12px] px-[15px] py-[11px] mb-[16px]">
          <span>✨</span>
          <div className="text-[13px] leading-relaxed text-[#6B7280]">
            <strong className="text-[#D61CA8]">AI:</strong> {aiPricingNote}
          </div>
        </div>
      )}

      {/* Services Table Container */}
      <div className="bg-white rounded-[14px] overflow-x-auto shadow-[0_1px_4px_rgba(0,0,0,0.05)]">
        <div className="min-w-[700px]">
          {/* Table Header */}
          <div style={dynamicGridStyle} className="grid gap-2 px-[16px] py-[10px] bg-[#F8F8FA] border-b border-[#EBEBEF]">
            <span className="text-[10px] font-semibold text-[#9090A0] uppercase tracking-[0.5px]">Service</span>
            <span className="text-[10px] font-semibold text-[#9090A0] uppercase tracking-[0.5px]">Base</span>
            {serviceAreas.map((area) => (
              <span key={area} className="text-[10px] font-semibold text-[#9090A0] uppercase tracking-[0.5px] truncate">{area}</span>
            ))}
            <span className="text-[10px] font-semibold text-[#9090A0] uppercase tracking-[0.5px]">Status</span>
            <span className="text-[10px] font-semibold text-[#9090A0] uppercase tracking-[0.5px]">Action</span>
          </div>

          {/* Table Body */}
          {loading ? (
            <TableSkeleton />
          ) : filteredServices.length === 0 ? (
            <div className="p-8 text-center text-[13px] font-semibold text-[#9090A0]">No services found.</div>
          ) : (
            filteredServices.map((s) => (
              <div key={s.offering_id} style={dynamicGridStyle} className="grid gap-2 px-[16px] py-[11px] border-b border-[#F8F8F8] items-center">
                <div className="text-[13px] font-semibold text-[#0A0A0F] truncate">
                  ⚡ {s.service_name}
                </div>
                <div
                  className={`rounded-[8px] px-[10px] py-[5px] text-[12px] font-bold w-fit ${
                    s.status === 'active' ? 'bg-[#F8F8FA] border-[1.5px] border-[#D61CA840] text-[#D61CA8]' : 'bg-[#F8F8FA] border-[1.5px] border-[#EBEBEF] text-[#9090A0]'
                  }`}
                >
                  OMR {s.base_price}
                </div>

                {/* Dynamic Area Pricing Cells */}
                {serviceAreas.map((area) => (
                  <div key={area} className="bg-[#F8F8FA] border-[1.5px] border-[#EBEBEF] rounded-[8px] px-[10px] py-[5px] text-[12px] font-semibold text-[#0A0A0F] w-fit">
                    OMR {s.area_prices && s.area_prices[area] ? s.area_prices[area] : s.base_price}
                  </div>
                ))}

                <div className={`px-[9px] py-[3px] rounded text-[10px] font-bold w-fit capitalize ${s.status === 'active' ? 'bg-emerald-100 text-emerald-600' : 'bg-[#F0F0F4] text-[#9090A0]'}`}>
                  {s.status}
                </div>

                <div className="flex gap-[5px]">
                  <button 
                    onClick={() => handleOpenEditModal(s)}
                    className="px-[10px] py-[5px] bg-[#D61CA814] rounded-[7px] text-[10px] font-semibold text-[#D61CA8] hover:bg-[#D61CA825] cursor-pointer"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleToggleStatus(s)}
                    className={`px-[9px] py-[5px] rounded-[7px] text-[10px] font-bold cursor-pointer ${s.status === 'active' ? 'bg-[#F0F0F4] text-[#9090A0]' : 'bg-[#D1FAE5] text-[#059669]'}`}
                  >
                    {s.status === 'active' ? '⏸' : '▶'}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Service Areas Section */}
      <div className="mt-[16px] text-[15px] font-bold text-[#0A0A0F] mb-[10px]">Service Areas</div>
      <div className="flex flex-wrap gap-[8px] items-center">
        {serviceAreas.map((area) => (
          <div
            key={area}
            className="px-[14px] py-[7px] rounded-full flex items-center gap-[6px] bg-[#10B98114] border-[1.5px] border-[#10B98140]"
          >
            <div className="w-[6px] h-[6px] rounded-full bg-[#10B981]" />
            <span className="text-[12px] font-semibold text-[#0A0A0F]">{area}</span>
            <button 
              onClick={() => setAreaToDelete(area)}
              className="ml-1 text-[11px] text-[#9090A0] hover:text-red-500 font-bold cursor-pointer"
            >
              ✕
            </button>
          </div>
        ))}

        {showAddAreaInput ? (
          <div className="flex items-center gap-2 bg-white border border-[#D61CA8] rounded-full px-2 py-1 shadow-sm">
            {notAddedAreas.length > 0 ? (
              <>
                <select
                  value={selectedAreaToAdd}
                  onChange={(e) => setSelectedAreaToAdd(e.target.value)}
                  className="bg-transparent text-[12px] font-semibold text-[#0A0A0F] focus:outline-none pr-1"
                >
                  {notAddedAreas.map((area) => (
                    <option key={area} value={area}>{area}</option>
                  ))}
                </select>
                <button
                  onClick={handleAddArea}
                  className="px-[12px] py-[4px] bg-[#D61CA8] text-white rounded-full text-[11px] font-bold cursor-pointer hover:opacity-90"
                >
                  Add
                </button>
              </>
            ) : (
              <span className="text-[12px] font-medium text-[#9090A0] px-2 py-1">All areas added</span>
            )}
            <button
              onClick={() => setShowAddAreaInput(false)}
              className="text-[#9090A0] hover:text-[#0A0A0F] text-[12px] font-bold px-1 cursor-pointer"
            >
              ✕
            </button>
          </div>
        ) : (
          <button 
            onClick={() => setShowAddAreaInput(true)}
            className="px-[14px] py-[7px] bg-[#F8F8FA] border-[1.5px] border-dashed border-[#C0C0CC] rounded-full text-[12px] font-semibold text-[#9090A0] hover:bg-[#EBEBEF] cursor-pointer"
          >
            + Add Area
          </button>
        )}
      </div>

      {/* Delete Area Confirmation Modal */}
      {areaToDelete && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[18px] w-full max-w-[400px] shadow-2xl border border-[#EBEBEF] p-6 text-center">
            <div className="w-12 h-12 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-lg">
              ⚠️
            </div>
            <h3 className="text-[18px] font-extrabold text-[#0A0A0F] mb-1">Remove Service Area</h3>
            <p className="text-[13px] text-[#9090A0] mb-6">
              Are you sure you want to remove <strong className="text-[#0A0A0F]">{areaToDelete}</strong> from your active service areas?
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setAreaToDelete(null)}
                className="px-5 py-2.5 bg-[#F4F5F8] rounded-[10px] text-[12px] font-semibold text-[#9090A0] hover:bg-[#EBEBEF] cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteArea}
                className="px-5 py-2.5 bg-red-500 rounded-[10px] text-[12px] font-bold text-white shadow-sm hover:bg-red-600 cursor-pointer"
              >
                Delete Area
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Service Popup Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[18px] w-full max-w-[500px] shadow-2xl border border-[#EBEBEF] overflow-hidden">
            {/* Modal Header */}
            <div className="px-[24px] py-[18px] border-b border-[#EBEBEF] flex justify-between items-center bg-[#F8F8FA]">
              <div>
                <h3 className="text-[18px] font-extrabold text-[#0A0A0F]">{isEditing ? 'Edit Service' : 'Add New Service'}</h3>
                <p className="text-[12px] text-[#9090A0]">Select category, service type & pricing</p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white border border-[#EBEBEF] text-[#9090A0] flex items-center justify-center font-bold text-[14px] hover:bg-[#F4F5F8] cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleSaveService} className="p-[24px] space-y-[16px]">
              <div className="grid grid-cols-2 gap-3">
                {/* CATEGORY FIELD */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#9090A0] mb-[6px]">Category</label>
                  <select
                    disabled={isEditing}
                    value={formData.category_id}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="w-full bg-[#F8F8FA] border border-[#EBEBEF] rounded-[10px] px-[12px] py-[9px] text-[13px] font-semibold text-[#0A0A0F] focus:outline-none focus:border-[#D61CA8] disabled:opacity-60"
                  >
                    {categoriesList.map((cat) => (
                      <option key={cat.category_id} value={cat.category_id}>{cat.category_name}</option>
                    ))}
                  </select>
                </div>

                {/* SERVICE TYPE FIELD */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#9090A0] mb-[6px]">Service Name</label>
                  <select
                    disabled={isEditing}
                    value={formData.service_type_id}
                    onChange={(e) => handleServiceTypeChange(e.target.value)}
                    className="w-full bg-[#F8F8FA] border border-[#EBEBEF] rounded-[10px] px-[12px] py-[9px] text-[13px] font-semibold text-[#0A0A0F] focus:outline-none focus:border-[#D61CA8] disabled:opacity-60"
                  >
                    {availableSubCategories.map((sub) => (
                      <option key={sub.id} value={sub.id}>{sub.type_name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Base Price & Status */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#9090A0] mb-[6px]">Base Price (OMR)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="e.g. 20.00"
                    value={formData.base_price}
                    onChange={(e) => setFormData({ ...formData, base_price: e.target.value })}
                    className="w-full bg-[#F8F8FA] border border-[#EBEBEF] rounded-[10px] px-[12px] py-[9px] text-[13px] font-semibold text-[#0A0A0F] focus:outline-none focus:border-[#D61CA8]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#9090A0] mb-[6px]">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full bg-[#F8F8FA] border border-[#EBEBEF] rounded-[10px] px-[12px] py-[9px] text-[13px] font-semibold text-[#0A0A0F] focus:outline-none focus:border-[#D61CA8]"
                  >
                    <option value="active">Active</option>
                    <option value="paused">Paused</option>
                  </select>
                </div>
              </div>

              {/* Area Specific Pricing */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#9090A0] mb-[6px]">
                  Area Specific Pricing <span className="text-[#C0C0CC] text-[10px] lowercase font-normal">(optional - defaults to base price)</span>
                </label>
                <div className="grid grid-cols-3 gap-2 max-h-[140px] overflow-y-auto p-1">
                  {serviceAreas.map((area) => (
                    <div key={area}>
                      <span className="text-[10px] font-semibold text-[#9090A0] block mb-1 truncate">{area}</span>
                      <input
                        type="number"
                        step="0.01"
                        placeholder={formData.base_price || '0.00'}
                        value={formData.area_prices[area] || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          area_prices: { ...formData.area_prices, [area]: e.target.value }
                        })}
                        className="w-full bg-[#F8F8FA] border border-[#EBEBEF] rounded-[8px] px-[10px] py-[7px] text-[12px] font-semibold text-[#0A0A0F] focus:outline-none focus:border-[#D61CA8]"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Action Buttons */}
              <div className="flex gap-[10px] justify-end pt-[8px]">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-[16px] py-[9px] bg-[#F4F5F8] rounded-[9px] text-[12px] font-semibold text-[#9090A0] hover:bg-[#EBEBEF] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-[18px] py-[9px] bg-gradient-to-r from-[#D61CA8] to-[#8B2EF5] rounded-[9px] text-[12px] font-bold text-white shadow-sm hover:opacity-95 cursor-pointer disabled:opacity-60"
                >
                  {submitting ? 'Saving...' : 'Save Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;