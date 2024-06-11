import { Request, Response } from 'express';
import FridgeService from '../services/FridgeService';
import { getHTTPStatusMessage } from '../util/HTTPMapStatus';

export class FridgeController {
  constructor (
    private fridgeService = new FridgeService(),
  ) {}

  public async addItem(req: Request, res: Response) {
    const { body } = req;
    const response = await this.fridgeService.addItem(body);
    return res.status(getHTTPStatusMessage(response.status)).send(response.data);
  }

  public async getAll(req: Request, res: Response) {
    const response = await this.fridgeService.getAll();
    return res.status(getHTTPStatusMessage(response.status)).send(response.data);
  }

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const { body } = req;
    const response = await this.fridgeService.update(parseInt(id), body);
    return res.status(getHTTPStatusMessage(response.status)).send(response.data);
  }
  
  public async deleteAll(req: Request, res: Response) {
    const response = await this.fridgeService.deleteAll();
    return res.status(getHTTPStatusMessage(response.status)).send(response.data);
  }
  
  public async deleteOne(req: Request, res: Response) {
    const { id } = req.params;
    const response = await this.fridgeService.deleteOne(parseInt(id));
    return res.status(getHTTPStatusMessage(response.status)).send(response.data);
  }
}