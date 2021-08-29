import { Router } from 'express';
import { SettingsController } from './SettingsController';

let router = Router();

router.get('/settings/volume/:setting/:userId/:volume', SettingsController.volume);

export default router;