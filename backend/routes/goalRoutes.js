import express from 'express';
const router = express.Router();
import {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
} from '../controllers/goalController.js';

import { protect } from '../middleware/authMiddleware.js';

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

export default router;
