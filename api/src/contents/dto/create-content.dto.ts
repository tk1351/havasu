import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateContentDto {
  @IsNotEmpty()
  @IsNumber()
  category: number;

  @IsNotEmpty()
  @IsString()
  text: string;

  @IsOptional()
  @IsNumber()
  postId: number;
}
