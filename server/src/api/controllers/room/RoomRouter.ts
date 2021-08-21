import { Router } from 'express';
import { RoomController } from './RoomController';

let router = Router();

router.get('/enter/:roomId/:userId', RoomController.enter);

router.get('/leave/:roomId/:userId', RoomController.leave);

export default router;