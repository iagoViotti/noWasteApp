import { Request, Response } from 'express';
import FridgeService from '../services/FridgeService';
import { getHTTPStatusMessage } from '../util/HTTPMapStatus';

export class FridgeController {
  constructor (
    private fridgeService = new FridgeService(),
  ) {}

  public async getAll(req: Request, res: Response) {
    const response = await this.fridgeService.getAll();
    
    return res.status(getHTTPStatusMessage(response.status)).send(response.data);
  }

  public async addItem(req: Request, res: Response) {

    const { body } = req;
    console.log('BODY:::::', body);
    
    const response = await this.fridgeService.addItem(body);
    
    return res.status(getHTTPStatusMessage(response.status)).send(response.data);
  }
}