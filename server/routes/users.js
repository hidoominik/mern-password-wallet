import express from 'express';

import {signin, signup, changePassword} from '../controllers/users.js'

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);

router.patch('/changePassword', changePassword);
export default router;