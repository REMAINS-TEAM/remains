import { Injectable, NotFoundException } from '@nestjs/common';
import { StorageProvider } from 'modules/storage/storage.types';
const YandexStorage = require('easy-yandex-s3');

interface FileContent {
  Key: string;
  LastModified: Date;
  ETag: string;
  ChecksumAlgorithm: string[];
  Size: number;
  StorageClass: string;
  Owner: Record<string, any>;
}

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

  async getFiles(path: string): Promise<FileContent[]> {
    return (await this.yandexStorage.GetList(path))?.Contents || [];
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

  async deleteFile(path: string) {
    return await this.yandexStorage.Remove(path);
  }

  async deleteFolder(path: string) {
    try {
      const { Contents: filesInFolder }: { Contents: FileContent[] } =
        await this.yandexStorage.GetList(path);
      if (!filesInFolder.length) return true;

      for (const file of filesInFolder) {
        await this.yandexStorage.Remove(file.Key);
      }
    } catch (e) {
      return false;
    }

    return true;
  }
}
