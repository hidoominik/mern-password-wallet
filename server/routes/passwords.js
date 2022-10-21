import express from 'express';

import { getPasswords, createPassword ,updatePassword, deletePassword} from '../controllers/passwords.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/',auth, getPasswords);
router.post('/', auth, createPassword);

router.patch('/:id',auth, updatePassword);
router.delete('/:id',auth, deletePassword);

export default router;