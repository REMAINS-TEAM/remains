import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { StorageProvider } from './storage.types';
import imagemin from 'imagemin';
import sharp from 'sharp';
import imageminMozJpeg from 'imagemin-mozjpeg';

@Injectable()
export class StorageService {
  constructor(
    @Inject('STORAGE_PROVIDER') private storageProvider: StorageProvider,
  ) {}

  async convertToJpeg(buffer: Buffer) {
    return await sharp(buffer).jpeg().toBuffer();
  }

  async download(path: string) {
    try {
      return this.storageProvider.download(path);
    } catch (e) {
      throw new BadRequestException('Something went wrong when download file');
    }
  }

  async upload(path: string, buffer: Buffer) {
    let compressedBuffer;
    try {
      compressedBuffer = await imagemin.buffer(buffer, {
        plugins: [this.convertToJpeg, imageminMozJpeg({ quality: 75 })],
      });
    } catch (e) {
      console.log('compress error', path, e);
    }

    try {
      return this.storageProvider.upload(path, compressedBuffer || buffer);
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
