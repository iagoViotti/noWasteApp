import { FridgeModel } from '../models/FridgeModel';
import { FridgeItem } from '../interfaces/itemInterface';

export default class FridgeService {
  constructor(
    private fridgeModel = new FridgeModel(),
  ) { }

  async addItem(body: FridgeItem) {
    const item = await this.fridgeModel.addItem(body);
    if (!item) {
      return { status: 'BAD_REQUEST', data: { message: `Failed to add item` } }
    }

    return { status: 'CREATED', data: item };
  }

  async getAll() {
    // const items = await this.fridgeModel.findAll();
    const items = null; //for now

    if (!items) {
      return { status: 'NOT_FOUND', data: { message: `Items not found` } }
    }

    return { status: "SUCCESSFUL", data: items }
  }

  async update() {
    // const item = await this.fridgeModel.update();
    // return item;
  }

  async delete() {
    // const item = await this.fridgeModel.delete();
    // return item;
  }
}
