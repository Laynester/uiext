import { Router } from 'express';
import { GameController } from './GameController';

let router = Router();

router.get('/open/:game/:id', GameController.open);

router.get('/close/:game/:id', GameController.close);

export default router;