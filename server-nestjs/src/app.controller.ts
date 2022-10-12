import {
  Body,
  CACHE_MANAGER,
  CacheInterceptor,
  Controller,
  Get,
  Inject,
  Post,
  UseInterceptors,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { AppService } from '@/app.service';
import { ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { dreamStudioApiKeyToken } from '@/app.constants';
import { generateAsync } from 'stability-client';
import { RequestImageDto } from '@/dto/request-image.dto';
import { Cache } from 'cache-manager';
import { join, relative } from 'path';

@ApiTags('Root')
@Controller({
  version: VERSION_NEUTRAL,
})
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  readonly servePath = join(__dirname, '../../.out');

  @Get()
  getWelcome(): string {
    return this.appService.getAppWelcome();
  }

  @Post('dreamstudio-image')
  async generateImage(@Body() input: RequestImageDto) {

    const image = await this.cacheManager.get(input.prompt);
    if (!image) {
      const apiKey = this.configService.get(dreamStudioApiKeyToken);
      const result = (await generateAsync({
        prompt: input.prompt,
        apiKey: apiKey,
        ...input.options,
      })) as { images: any[] };

      const imageRef = result.images[0];
      const seed = imageRef.seed;
      const fp = imageRef?.filePath;
      const serveUrl = relative(this.servePath, fp);

      const cacheEntry = {
        prompt: input.prompt,
        seed,
        serveUrl,
      };
      await this.cacheManager.set(input.prompt, cacheEntry);
      return cacheEntry;
    } else {
      return image;
    }
  }
}
