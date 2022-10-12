import { IsDefined, IsNotEmpty } from 'class-validator';

export class RequestImageDto {
  @IsNotEmpty()
  @IsDefined()
  prompt: string;

  options: any;
}
