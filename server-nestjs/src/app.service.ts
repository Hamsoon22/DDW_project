import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  Logger,
  Scope,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { join, relative } from 'path';
import {existsSync, mkdirSync, readdirSync, statSync} from 'fs';
import { InjectRepository } from '@nestjs/typeorm';
import { dreamSequence } from './app.entity';
import { Repository } from 'typeorm';

@Injectable({
  scope: Scope.DEFAULT,
})
export class AppService {
  logger = new Logger(AppService.name);
  readonly servePath = join(__dirname, '../../.out');

  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache, @InjectRepository(dreamSequence) private dreamRepository: Repository<dreamSequence>
    ) {}

  async listCache() {
    await this.loadCacheFromFolder();

    // Get all keys
    const keys = await this.cacheManager.store.keys();
    this.logger.log(`Loaded ${keys.length} images from .out`);

    // Loop through keys and get data
    const allData: { [key: string]: any } = {};
    for (const key of keys) {
      allData[key] = await this.cacheManager.get(key);
    }
    return allData;
  }

  async addCacheEntry(filePath: string) {
    const lastModified = statSync(filePath).mtime;
    const serveUrl = relative(this.servePath, filePath);
    await this.cacheManager.set(serveUrl, {
      serveUrl,
      lastModified,
    });
    return serveUrl;
  }

  async addEntry(input, filePath: string, session: string) {
     const entry = await this.dreamRepository.create({
      prompt: input.prompt,
      image: relative(this.servePath, filePath),
      type: input.type,
      sessionId: session
    });
    this.dreamRepository.save(entry)
    return
  }

  async getEntries() {
    return await this.dreamRepository.find({});
  }

  async loadCacheFromFolder() {
    if (!existsSync(this.servePath)) {
      mkdirSync(this.servePath);
    }
    const contents = readdirSync(this.servePath);

    for (const dir of contents) {
      const img = readdirSync(join(this.servePath, dir));
      if (!img?.length) continue;
      const imgServerPath = join(this.servePath, dir, img[0]);
      await this.addCacheEntry(imgServerPath);
    }
  }
}
