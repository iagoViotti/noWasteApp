import { FridgeModel } from '../models/FridgeModel';
import { FridgeItem } from '../interfaces/itemInterface';
import { verifyDate } from '../util/verifyDate'
import { writeSeed } from '../database/sql/writeSeed';

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
    const items = await this.fridgeModel.findAll();

    if (!items) {
      return { status: 'NOT_FOUND', data: { message: `Items not found` } }
    }

    return { status: "SUCCESSFUL", data: items }
  }

  async update(id: number, body: FridgeItem) {
    const item = await this.fridgeModel.findById(id);

    if (!item) {
      return { status: 'NOT_FOUND', data: { message: `Item not found` } }
    }

    const dateIsValid = verifyDate(body.expiry_date);

    if (!dateIsValid) {
      return { status: 'FORBIDDEN', data: { message: `Invalid date format` } }
    }

    const updatedItem = await this.fridgeModel.update(body, id);
    return { status: 'SUCCESSFUL', data: updatedItem }

  }

  async deleteAll() {
    await this.fridgeModel.deleteAll();
    return { status: 'SUCCESSFUL', data: { message: `All items deleted` } }
  }

  async deleteOne(id: number) {
    const item = await this.fridgeModel.findById(id);

    if (!item) {
      return { status: 'NOT_FOUND', data: { message: `Item not found` } }
    }

    await this.fridgeModel.delete(id);
    return { status: 'SUCCESSFUL', data: { message: `Item deleted` } }
  }

  async deleteMultiple(ids: number[]) {
    if (!ids) {
      return { status: 'NOT_FOUND', data: { message: `Items not found` } }
    }

    await this.fridgeModel.deleteMultiple(ids);
    return { status: 'SUCCESSFUL', data: { message: `Items deleted` } }
  }

  async save() {
    const db = await this.fridgeModel.findAll();
    if (!db) {
      return { status: 'NOT_FOUND', data: { message: `Items not found` } }
    }
    await writeSeed(db);
    return { status: 'SUCCESSFUL', data: db }
  }
}
