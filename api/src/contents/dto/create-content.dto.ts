import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateContentDto {
  @IsNotEmpty()
  @IsNumber()
  category: number;

  @IsNotEmpty()
  @IsString()
  text: string;
}
