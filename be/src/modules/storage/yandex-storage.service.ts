import { Injectable, NotFoundException } from '@nestjs/common';
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
      // debug: process.env.NODE_ENV !== 'prod',
    });
  }

  async download(path: string) {
    let response: any;
    try {
      response = await this.yandexStorage.Download(path);
    } catch (e) {
      // skip
    }

    if (!response?.data?.Body) {
      throw new NotFoundException('File not found in storage');
    }

    return response.data.Body;
  }

  async upload(path: string, buffer: Buffer) {
    return (await this.yandexStorage.Upload({ buffer }, path))?.Location || '';
  }
}
