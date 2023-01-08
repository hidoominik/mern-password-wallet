import express from 'express';

import { getPasswords, createPassword ,updatePassword, deletePassword, decryptPassword, sharePassword, stopSharingPassword, getAllSharedPasswords, decryptSharedPassword} from '../controllers/passwords.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/:id',auth, getPasswords);
router.post('/', auth, createPassword);

router.patch('/:id',auth, updatePassword);
router.delete('/:id',auth, deletePassword);

router.get('/decrypt/:id', auth, decryptPassword);


router.post('/sharepassword/:id', sharePassword);
router.delete('/sharepassword/:id', stopSharingPassword);
router.get('/sharepassword/:id', getAllSharedPasswords);
router.get('/sharedpassword/:id/decrypt', decryptSharedPassword);

export default router;