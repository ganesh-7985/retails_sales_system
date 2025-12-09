import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * Fetch sales data with search, filters, sorting, and pagination
 * @param {Object} params - Query parameters
 * @returns {Promise} - API response
 */
export const fetchSales = async (params) => {
  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(([_, value]) => {
      if (Array.isArray(value)) return value.length > 0;
      return value !== '' && value !== null && value !== undefined;
    })
  );

  // Convert arrays to comma-separated strings
  Object.keys(cleanParams).forEach(key => {
    if (Array.isArray(cleanParams[key])) {
      cleanParams[key] = cleanParams[key].join(',');
    }
  });

  const response = await api.get('/sales', { params: cleanParams });
  return response.data;
};

/**
 * Fetch a single sale by ID
 * @param {string} id - Sale ID
 * @returns {Promise} - API response
 */
export const fetchSaleById = async (id) => {
  const response = await api.get(`/sales/${id}`);
  return response.data;
};

/**
 * Fetch filter options for dropdowns
 * @returns {Promise} - API response
 */
export const fetchFilterOptions = async () => {
  const response = await api.get('/filters/options');
  return response.data;
};

export default api;
