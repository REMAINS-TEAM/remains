export interface StorageProvider {
  download: (path: string) => Promise<Buffer>;
  upload: (path: string, buffer: Buffer) => Promise<string>;
  deleteFile: (path: string) => Promise<boolean>;
  deleteFolder: (path: string) => Promise<boolean>;
  getFiles: (path: string) => Promise<any[]>;
}
