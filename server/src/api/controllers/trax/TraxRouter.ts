import { Router } from 'express';
import { TestController } from '../TestController';
import { TraxController } from './TraxController';

let router = Router();

router.get('/settings', TestController.data);

router.get('/open/:id', TraxController.open);

export default router;