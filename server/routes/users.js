import express from 'express';

import {signin, signup, changePassword, getLastLogins} from '../controllers/users.js'

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);

router.patch('/changePassword', changePassword);

router.get("/historylogin", getLastLogins);
export default router;