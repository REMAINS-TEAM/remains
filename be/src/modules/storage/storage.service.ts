import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { StorageProvider } from './storage.types';
import imagemin from 'imagemin';
import imageminJpegtran from 'imagemin-jpegtran';
import imageminPngquant from 'imagemin-pngquant';

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
      const compressedBuffer = await imagemin.buffer(buffer, {
        plugins: [
          imageminJpegtran(),
          imageminPngquant({
            quality: [0.6, 0.8],
          }),
        ],
      });
      return this.storageProvider.upload(path, compressedBuffer);
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
