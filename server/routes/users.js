import express from 'express';

import {signin, signup, changePassword, getLastLogins, unbanIp} from '../controllers/users.js'

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);

router.patch('/changePassword', changePassword);

router.get("/historylogin", getLastLogins);
router.post('/unbanip', unbanIp);
export default router;


