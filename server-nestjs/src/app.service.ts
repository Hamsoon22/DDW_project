import { Injectable } from '@nestjs/common';
import { apiWelcomeMessage } from '@/app.constants';

@Injectable()
export class AppService {
  getAppWelcome(): string {
    return apiWelcomeMessage;
  }
}
