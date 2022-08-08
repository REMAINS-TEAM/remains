import { Inject, Injectable } from '@nestjs/common';
import { StorageProvider } from 'modules/storage/storage.types';

@Injectable()
export class StorageService {
  constructor(
    @Inject('STORAGE_PROVIDER') private storageProvider: StorageProvider,
  ) {}

  async download(path: string) {
    return this.storageProvider.download(path);
  }

  // async upload() {
  //   return this.storageProvider.upload();
  // }
}
