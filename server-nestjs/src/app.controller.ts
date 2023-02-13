import { Body, Controller, Get, Post, Req, Res, VERSION_NEUTRAL } from "@nestjs/common";
import { AppService } from "@/app.service";
import { ApiTags } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";
import { dreamStudioApiKeyToken } from "@/app.constants";
import { generateAsync } from "stability-client";
import { RequestImageDto } from "@/dto/request-image.dto";
import { v4 as uuid } from 'uuid';
import { join } from 'path';
import { Request, Response } from "express";

@ApiTags("Root")
@Controller({
  version: VERSION_NEUTRAL
})
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService
  ) {
  }

  @Get()
  async getImages() {
    return await this.appService.getEntries()
  }

  @Post("dreamstudio-image")
  async generateImage(@Body() input: RequestImageDto, @Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const apiKey = this.configService.get(dreamStudioApiKeyToken);
    const result = (await generateAsync({
      prompt: input.prompt,
      apiKey: apiKey,
      width: 512,
      height: 512,
      outDir: join(process.cwd(), '.out',input.type),
      ...input.options
    })) as { images: any[] };

    const imageRef = result.images[0];
    const fp = imageRef?.filePath;

    let id = uuid()
    if(input.type === "past") {
      res.cookie("session", id)
    } else {
      id = req.cookies.session || id
    }

    console.log(id)

    await this.appService.addEntry(input, fp, id);
    return await this.appService.addCacheEntry(fp)
  }
}
