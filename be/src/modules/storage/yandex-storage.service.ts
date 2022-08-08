import { Injectable } from '@nestjs/common';
import { StorageProvider } from 'modules/storage/storage.types';
const YandexStorage = require('easy-yandex-s3');

@Injectable()
export class YandexStorageService implements StorageProvider {
  yandexStorage: any;
  constructor() {
    this.yandexStorage = new YandexStorage({
      auth: {
        accessKeyId: process.env.YA_STORAGE_KEY_ID,
        secretAccessKey: process.env.YA_STORAGE_ACCESS_KEY,
      },
      Bucket: 'remains',
      debug: true, // TODO:  удалить в релизе
    });
  }

  async download(path: string) {
    const response = await this.yandexStorage.Download(path);
    return response.data.Body;
  }

  async upload(path: string, buffer: Buffer) {
    return true;
  }
}
