import { Router } from 'express';
import { TestController } from './controllers/TestController';
import { TraxController } from './controllers/TraxController';

let router = Router();

router.get('/settings', TestController.data);

router.get('/collections', TraxController.collections);

router.get('/personalsongs', TraxController.userSongs);

router.post('/save', TraxController.saveSong);

router.post('/burn', TraxController.burnSong);

export default router;