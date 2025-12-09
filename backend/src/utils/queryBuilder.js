const buildFilterQuery = (filters) => {
  const query = {};

  const {
    search,
    customerRegion,
    gender,
    ageMin,
    ageMax,
    productCategory,
    tags,
    paymentMethod,
    dateFrom,
    dateTo
  } = filters;

  // Full-text search on customerName and phoneNumber (case-insensitive)
  if (search && search.trim()) {
    const searchRegex = new RegExp(escapeRegex(search.trim()), 'i');
    query.$or = [
      { customerName: searchRegex },
      { phoneNumber: searchRegex }
    ];
  }

  // Customer Region filter (multi-select)
  if (customerRegion) {
    const regions = parseMultiSelect(customerRegion);
    if (regions.length > 0) {
      query.customerRegion = { $in: regions };
    }
  }

  // Gender filter (multi-select)
  if (gender) {
    const genders = parseMultiSelect(gender);
    if (genders.length > 0) {
      query.gender = { $in: genders };
    }
  }

  // Age range filter
  if (ageMin !== undefined || ageMax !== undefined) {
    query.age = {};
    if (ageMin !== undefined && !isNaN(parseInt(ageMin))) {
      query.age.$gte = parseInt(ageMin);
    }
    if (ageMax !== undefined && !isNaN(parseInt(ageMax))) {
      query.age.$lte = parseInt(ageMax);
    }
    // Remove empty age query
    if (Object.keys(query.age).length === 0) {
      delete query.age;
    }
  }

  // Product Category filter (multi-select)
  if (productCategory) {
    const categories = parseMultiSelect(productCategory);
    if (categories.length > 0) {
      query.productCategory = { $in: categories };
    }
  }

  // Tags filter (multi-select) - matches any of the selected tags
  if (tags) {
    const tagList = parseMultiSelect(tags);
    if (tagList.length > 0) {
      query.tags = { $in: tagList };
    }
  }

  // Payment Method filter (multi-select)
  if (paymentMethod) {
    const methods = parseMultiSelect(paymentMethod);
    if (methods.length > 0) {
      query.paymentMethod = { $in: methods };
    }
  }

  // Date range filter
  if (dateFrom || dateTo) {
    query.date = {};
    if (dateFrom) {
      const fromDate = new Date(dateFrom);
      if (!isNaN(fromDate.getTime())) {
        query.date.$gte = fromDate;
      }
    }
    if (dateTo) {
      const toDate = new Date(dateTo);
      if (!isNaN(toDate.getTime())) {
        // Set to end of day
        toDate.setHours(23, 59, 59, 999);
        query.date.$lte = toDate;
      }
    }
    // Remove empty date query
    if (Object.keys(query.date).length === 0) {
      delete query.date;
    }
  }

  return query;
};

/**
 * Build MongoDB sort query
 * @param {string} sortBy - Field to sort by
 * @param {string} sortOrder - Sort order (asc/desc)
 * @returns {Object} - MongoDB sort object
 */
const buildSortQuery = (sortBy, sortOrder) => {
  const sortFields = {
    'date': 'date',
    'quantity': 'quantity',
    'customerName': 'customerName'
  };

  const field = sortFields[sortBy] || 'date';
  const order = sortOrder === 'asc' ? 1 : -1;

  return { [field]: order };
};

/**
 * Parse multi-select filter value
 * @param {string|string[]} value - Comma-separated string or array
 * @returns {string[]} - Array of values
 */
const parseMultiSelect = (value) => {
  if (Array.isArray(value)) {
    return value.filter(v => v && v.trim());
  }
  if (typeof value === 'string') {
    return value.split(',').map(v => v.trim()).filter(v => v);
  }
  return [];
};

/**
 * Escape special regex characters in search string
 * @param {string} string - Input string
 * @returns {string} - Escaped string
 */
const escapeRegex = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

module.exports = {
  buildFilterQuery,
  buildSortQuery,
  parseMultiSelect,
  escapeRegex
};
