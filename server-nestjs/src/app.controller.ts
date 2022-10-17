import { Body, Controller, Get, Post, VERSION_NEUTRAL } from '@nestjs/common';
import { AppService } from '@/app.service';
import { ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { dreamStudioApiKeyToken } from '@/app.constants';
import { generateAsync } from 'stability-client';
import { RequestImageDto } from '@/dto/request-image.dto';
import { shuffleArray } from '@/utils/random.utils';

@ApiTags('Root')
@Controller({
  version: VERSION_NEUTRAL,
})
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  async getImages() {
    return this.appService
      .listCache()
      .then((r) => shuffleArray(Object.keys(r)));
  }

  @Post('dreamstudio-image')
  async generateImage(@Body() input: RequestImageDto) {
    const apiKey = this.configService.get(dreamStudioApiKeyToken);
    const result = (await generateAsync({
      prompt: input.prompt,
      apiKey: apiKey,
      ...input.options,
    })) as { images: any[] };

    const imageRef = result.images[0];
    const fp = imageRef?.filePath;

    return await this.appService.addCacheEntry(fp);
  }
}
