import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { StorageProvider } from './storage.types';

@Injectable()
export class StorageService {
  constructor(
    @Inject('STORAGE_PROVIDER') private storageProvider: StorageProvider,
  ) {}

  async download(path: string) {
    try {
      return this.storageProvider.download(path);
    } catch (e) {
      throw new BadRequestException('Something went wrong when download file');
    }
  }

  async upload(path: string, buffer: Buffer) {
    try {
      return this.storageProvider.upload(path, buffer);
    } catch (e) {
      throw new BadRequestException('Something went wrong when upload file');
    }
  }

  async deleteFile(path: string) {
    try {
      return this.storageProvider.deleteFile(path);
    } catch (e) {
      throw new BadRequestException('Something went wrong when delete file');
    }
  }

  async deleteFolder(path: string) {
    try {
      return this.storageProvider.deleteFolder(path);
    } catch (e) {
      throw new BadRequestException('Something went wrong when delete folder');
    }
  }
}
