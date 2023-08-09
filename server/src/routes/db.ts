import express from 'express';
import { authValidation } from '../middleware/authValidation';
import { getUsers } from '../controllers/firebase';

// INIT ROUTER
const router = express.Router();

router.route('/users').get(authValidation, getUsers);

export default router;
