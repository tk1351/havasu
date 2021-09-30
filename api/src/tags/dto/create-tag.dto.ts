import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateTagDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  postId: number;
}
