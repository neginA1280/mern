const express = require('express');
const router = express.Router();
const {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
} = require('../controllers/goalController');

const { protect } = require('../middleware/authMiddleware');

// get all
// router.get('/', getGoals);

// post
// router.post('/', setGoal);

// get and post together
router.route('/').get(protect, getGoals).post(protect, setGoal);

// put
// router.put('/:id', updateGoal);

// delete
// router.delete('/:id', deleteGoal);

// put and delete together
router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal);

module.exports = router;
