import express from 'express';

import { getPasswords, createPassword } from '../controllers/passwords.js';

const router = express.Router();

router.get('/', getPasswords);
router.post('/', createPassword)

export default router;