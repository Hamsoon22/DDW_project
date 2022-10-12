import { Controller, Get, Post, VERSION_NEUTRAL } from '@nestjs/common';
import { AppService } from '@/app.service';
import { ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { dreamStudioApiKeyToken } from '@/app.constants';
import { generateAsync } from 'stability-client';
import { RequestImageDto } from '@/dto/request-image.dto';

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
  getWelcome(): string {
    return this.appService.getAppWelcome();
  }

  @Post('dreamstudio-image')
  async generateImage(input: RequestImageDto) {
    const apiKey = this.configService.get(dreamStudioApiKeyToken);
    return await generateAsync({
      prompt: input.prompt,
      apiKey: apiKey,
      ...input.options,
    });
  }
}
