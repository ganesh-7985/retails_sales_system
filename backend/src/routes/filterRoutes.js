const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');

/**
 * @route   GET /api/filters/options
 * @desc    Get unique filter options for dropdown menus
 */
router.get('/options', salesController.getFilterOptions);

module.exports = router;
