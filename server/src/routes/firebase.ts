import express from 'express';
import {
  createUser,
  getSingleUser,
  getUsers,
} from '../controllers/firebase.js';
import { authValidation } from '../middleware/authValidation.js';

const router = express.Router();

// PUBLIC ROUTES IN ROUTER

router.route('/users').post(createUser);

// AUTHORIZED ROUTES IN ROUTER
router.use(authValidation);
router.route('/users').get(getUsers);
router.route('/users/:uid').get(getSingleUser);

export default router;
