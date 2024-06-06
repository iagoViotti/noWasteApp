import { Request, Router, Response } from 'express'
import { FridgeController } from '../controllers/FridgeController'

const fridgeController = new FridgeController()

const fridgeRouter = Router()

fridgeRouter.get('/', async (req: Request, res: Response) => { fridgeController.getAll(req, res) })

export default fridgeRouter