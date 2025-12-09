const salesService = require('../services/salesService');

const getSales = async (req, res, next) => {
  try {
    const result = await salesService.getSales(req.query);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getSaleById = async (req, res, next) => {
  try {
    const sale = await salesService.getSaleById(req.params.id);
    res.json(sale);
  } catch (error) {
    if (error.message === 'Sale not found') {
      return res.status(404).json({ error: 'Sale not found' });
    }
    next(error);
  }
};

const getFilterOptions = async (req, res, next) => {
  try {
    const options = await salesService.getFilterOptions();
    res.json(options);
  } catch (error) {
    console.error('Filter options error:', error.message);
    res.status(500).json({ error: 'Failed to fetch filter options' });
  }
};

module.exports = {
  getSales,
  getSaleById,
  getFilterOptions
};
