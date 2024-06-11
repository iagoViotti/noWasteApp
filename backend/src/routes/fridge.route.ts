import { Request, Router, Response } from 'express'
import { FridgeController } from '../controllers/FridgeController'

const fridgeController = new FridgeController()

const fridgeRouter = Router()

fridgeRouter.get('/', async (req: Request, res: Response) => { fridgeController.getAll(req, res) })
fridgeRouter.post('/', async (req: Request, res: Response) => { fridgeController.addItem(req, res) })
fridgeRouter.put('/:id', async (req: Request, res: Response) => { fridgeController.update(req, res) })
fridgeRouter.delete('/:id', async (req: Request, res: Response) => { fridgeController.deleteOne(req, res) })
fridgeRouter.delete('/', async (req: Request, res: Response) => { fridgeController.deleteAll(req, res) })

export default fridgeRouter