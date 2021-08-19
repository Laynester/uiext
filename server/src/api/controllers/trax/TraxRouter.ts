import { Router } from 'express';
import { TraxController } from './TraxController';

let router = Router();

router.get('/open/:id', TraxController.open);

export default router;