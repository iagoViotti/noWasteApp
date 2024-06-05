import { Request, Router, Response } from 'express'

const fridgeRouter = Router()

fridgeRouter.get('/', (_req: Request, res: Response) => {
  console.log('fridge route')
  res.send('fridge route')
})

export default fridgeRouter