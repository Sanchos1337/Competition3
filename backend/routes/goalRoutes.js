const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/authMiddleware');
const {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
} = require('../controllers/goalController');

// Require auth for all routes
router.use(requireAuth);

// Route for getting goals (GET /api/goals)
router.get('/', getGoals);

// Route for creating a new goal (POST /api/goals)
router.post('/', setGoal);

// Route for updating a goal by ID (PUT /api/goals/:id)
router.put('/:id', updateGoal);

// Route for deleting a goal by ID (DELETE /api/goals/:id)
router.delete('/:id', deleteGoal);

module.exports = router;