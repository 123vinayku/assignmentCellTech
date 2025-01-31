import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
  constructor() {}

  getData(key: string) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : '';
  }

  setData(key: string, data: string) {
    localStorage.setItem(key, data);
  }

  removeData(key: string) {
    localStorage.removeItem(key);
  }
}
