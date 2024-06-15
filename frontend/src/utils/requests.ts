import axios, { AxiosInstance } from "axios";
import { FridgeItem } from '../../../backend/src/interfaces/itemInterface.ts';

class ApiService {
  private api: AxiosInstance

  constructor(
    // baseURL: string = 'http://localhost:3010'
    baseURL: string = 'http://192.168.1.114:3010'
  ) {
    this.api = axios.create({ baseURL })
  }

  public async get(url: string) {
    return await this.api.get(url);
  }

  public async post(url: string, body: FridgeItem) {
    return await this.api.post(url, body);
  }

  public async put(url: string, body: FridgeItem) {
    return await this.api.put(url, body);
  }

  public async delete(url: string) {
    return await this.api.delete(url);
  }
}

export default ApiService;
