import express from 'express';
import {validateRequest, getKeys} from '../controllers/auth.js';


const router = express.Router();

router.get('/validate', validateRequest);
router.get('/.well-known/jwks.json', getKeys);

export default router;