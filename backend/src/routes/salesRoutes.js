const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');

/**
 * @route   GET /api/sales
 * @desc    Get paginated sales with search, filters, and sorting
 * @query   page, limit, search, sortBy, sortOrder, customerRegion, gender,
 *          ageMin, ageMax, productCategory, tags, paymentMethod, dateFrom, dateTo
 */
router.get('/', salesController.getSales);

/**
 * @route   GET /api/sales/:id
 * @desc    Get a single sale by ID
 */
router.get('/:id', salesController.getSaleById);

module.exports = router;
