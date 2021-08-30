import { Router } from 'express';
import { ConnectionController } from './ConnectionController';
import { SettingsController } from './SettingsController';

let router = Router();

router.get("/login/:userId", ConnectionController.login)

router.get('/settings/volume/:setting/:userId/:volume', SettingsController.volume);

export default router;