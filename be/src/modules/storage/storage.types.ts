export interface StorageProvider {
  download: (path: string) => Promise<Buffer>;
  upload: (path: string, buffer: Buffer) => Promise<boolean>;
}
