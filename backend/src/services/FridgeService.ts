

export default class FridgeService {
  constructor (
    // private fridgeModel = new FridgeModel(),
  ) { } 
  
  async addItem() {
    // const item = await this.fridgeModel.addItem();
    // return item;
  }

  async getAll() {
    // const items = await this.fridgeModel.findAll();
    const items = null; //for now
    
    if(!items) {
      return { status: 'NOT_FOUND', data: { message: `Items not found` }}
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
