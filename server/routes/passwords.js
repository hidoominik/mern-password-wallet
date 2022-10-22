import express from 'express';

import { getPasswords, createPassword ,updatePassword, deletePassword, decryptPassword} from '../controllers/passwords.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/:id',auth, getPasswords);
router.post('/', auth, createPassword);

router.patch('/:id',auth, updatePassword);
router.delete('/:id',auth, deletePassword);

router.get('/decrypt/:id', auth, decryptPassword);
export default router;