import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { StorageProvider } from './storage.types';
import imagemin from 'imagemin';
import sharp from 'sharp';
import imageminMozJpeg from 'imagemin-mozjpeg';
import isJpg from 'is-jpg';

@Injectable()
export class StorageService {
  constructor(
    @Inject('STORAGE_PROVIDER') private storageProvider: StorageProvider,
  ) {}

  async convertToJpeg(buffer: Buffer) {
    if (isJpg(buffer)) return buffer;
    return sharp(buffer).jpeg().toBuffer();
  }

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
        plugins: [this.convertToJpeg, imageminMozJpeg({ quality: 75 })],
      });

      return this.storageProvider.upload(path, compressedBuffer);
    } catch (e) {
      console.log('e', e);
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
