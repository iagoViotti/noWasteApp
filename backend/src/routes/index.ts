import { Router } from 'express';
import fridgeRouter from './fridge.route';

const router = Router();

router.use('/', fridgeRouter);

export default router;