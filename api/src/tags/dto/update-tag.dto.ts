import { IsOptional, IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class UpdateTagDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  postId: number;
}
