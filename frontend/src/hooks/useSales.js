import { useState, useEffect, useCallback } from 'react';
import { fetchSales, fetchFilterOptions } from '../services/api';

export const useSales = () => {
  const [sales, setSales] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
    hasNextPage: false,
    hasPrevPage: false
  });

  const [filterOptions, setFilterOptions] = useState({
    customerRegions: [],
    genders: [],
    productCategories: [],
    tags: [],
    paymentMethods: [],
    ageRange: { minAge: 0, maxAge: 100 },
    dateRange: { minDate: null, maxDate: null }
  });

  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
    search: '',
    sortBy: 'date',
    sortOrder: 'desc',
    customerRegion: [],
    gender: [],
    ageMin: '',
    ageMax: '',
    productCategory: [],
    tags: [],
    paymentMethod: [],
    dateFrom: '',
    dateTo: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadSales = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchSales(query);
      setSales(result.data);
      setPagination(result.pagination);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch sales');
      setSales([]);
    } finally {
      setLoading(false);
    }
  }, [query]);

  const loadFilterOptions = useCallback(async () => {
    try {
      const options = await fetchFilterOptions();
      setFilterOptions(options);
    } catch (err) {
      console.error('Filter options fetch failed:', err);
    }
  }, []);

  useEffect(() => { loadSales(); }, [loadSales]);
  useEffect(() => { loadFilterOptions(); }, [loadFilterOptions]);

  const handleSearch = useCallback((searchTerm) => {
    setQuery(prev => ({ ...prev, search: searchTerm, page: 1 }));
  }, []);

  const handleFilterChange = useCallback((filterName, value) => {
    setQuery(prev => ({ ...prev, [filterName]: value, page: 1 }));
  }, []);

  const clearFilters = useCallback(() => {
    setQuery(prev => ({
      ...prev,
      search: '',
      customerRegion: [],
      gender: [],
      ageMin: '',
      ageMax: '',
      productCategory: [],
      tags: [],
      paymentMethod: [],
      dateFrom: '',
      dateTo: '',
      page: 1
    }));
  }, []);

  const handleSort = useCallback((sortBy, sortOrder) => {
    setQuery(prev => ({ ...prev, sortBy, sortOrder, page: 1 }));
  }, []);

  const goToPage = useCallback((page) => {
    setQuery(prev => ({ ...prev, page }));
  }, []);

  const nextPage = useCallback(() => {
    if (pagination.hasNextPage) goToPage(pagination.currentPage + 1);
  }, [pagination.hasNextPage, pagination.currentPage, goToPage]);

  const prevPage = useCallback(() => {
    if (pagination.hasPrevPage) goToPage(pagination.currentPage - 1);
  }, [pagination.hasPrevPage, pagination.currentPage, goToPage]);

  const handleLimitChange = useCallback((newLimit) => {
    setQuery(prev => ({ ...prev, limit: newLimit, page: 1 }));
  }, []);

  return {
    sales,
    pagination,
    filterOptions,
    query,
    loading,
    error,
    handleSearch,
    handleFilterChange,
    clearFilters,
    handleSort,
    goToPage,
    nextPage,
    prevPage,
    handleLimitChange,
    refresh: loadSales
  };
};

export default useSales;
