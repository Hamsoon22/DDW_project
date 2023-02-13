import { IsDefined, IsNotEmpty } from 'class-validator';

export enum RequestType {
  past = 'past',
  future = 'future',
}

export class RequestImageDto {
  @IsNotEmpty()
  @IsDefined()
  prompt: string;
  @IsNotEmpty()
  @IsDefined()
  type: RequestType;
  session: string;
  options: any;
}
