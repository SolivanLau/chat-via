import express from 'express';
import { getUsers } from '../controllers/firebase.js';

const router = express.Router();

router.route('/users/:id').get(getUsers);

export default router;
