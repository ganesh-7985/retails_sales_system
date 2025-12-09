const Sale = require('../models/Sale');
const { buildFilterQuery, buildSortQuery } = require('../utils/queryBuilder');

const getSales = async (params) => {
  const {
    page = 1, limit = 10, search = '', sortBy = 'date', sortOrder = 'desc',
    customerRegion, gender, ageMin, ageMax, productCategory, tags, paymentMethod, dateFrom, dateTo
  } = params;

  const filterQuery = buildFilterQuery({
    search, customerRegion, gender, ageMin, ageMax, productCategory, tags, paymentMethod, dateFrom, dateTo
  });
  const sortQuery = buildSortQuery(sortBy, sortOrder);

  const skip = (parseInt(page) - 1) * parseInt(limit);
  const limitNum = parseInt(limit);

  const [sales, totalCount] = await Promise.all([
    Sale.find(filterQuery).sort(sortQuery).skip(skip).limit(limitNum).lean(),
    Sale.countDocuments(filterQuery)
  ]);

  const totalPages = Math.ceil(totalCount / limitNum);

  return {
    data: sales,
    pagination: {
      currentPage: parseInt(page),
      totalPages,
      totalItems: totalCount,
      itemsPerPage: limitNum,
      hasNextPage: parseInt(page) < totalPages,
      hasPrevPage: parseInt(page) > 1
    }
  };
};

const getSaleById = async (id) => {
  const sale = await Sale.findById(id).lean();
  if (!sale) throw new Error('Sale not found');
  return sale;
};

const getFilterOptions = async () => {
  const result = await Sale.aggregate([
    {
      $facet: {
        customerRegions: [{ $group: { _id: '$customerRegion' } }, { $sort: { _id: 1 } }],
        genders: [{ $group: { _id: '$gender' } }, { $sort: { _id: 1 } }],
        productCategories: [{ $group: { _id: '$productCategory' } }, { $sort: { _id: 1 } }],
        paymentMethods: [{ $group: { _id: '$paymentMethod' } }, { $sort: { _id: 1 } }],
        tags: [{ $unwind: '$tags' }, { $group: { _id: '$tags' } }, { $sort: { _id: 1 } }],
        ageRange: [{ $group: { _id: null, minAge: { $min: '$age' }, maxAge: { $max: '$age' } } }],
        dateRange: [{ $group: { _id: null, minDate: { $min: '$date' }, maxDate: { $max: '$date' } } }]
      }
    }
  ]).allowDiskUse(true);

  const data = result[0];

  return {
    customerRegions: data.customerRegions.map(r => r._id).filter(Boolean),
    genders: data.genders.map(r => r._id).filter(Boolean),
    productCategories: data.productCategories.map(r => r._id).filter(Boolean),
    tags: data.tags.map(r => r._id).filter(Boolean),
    paymentMethods: data.paymentMethods.map(r => r._id).filter(Boolean),
    ageRange: data.ageRange[0] || { minAge: 18, maxAge: 65 },
    dateRange: data.dateRange[0] || { minDate: null, maxDate: null }
  };
};

module.exports = {
  getSales,
  getSaleById,
  getFilterOptions
};
