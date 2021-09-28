import { IsNotEmpty, IsInt, IsString, IsOptional } from 'class-validator';

export class CreateContentDto {
  @IsNotEmpty()
  @IsInt()
  category: number;

  @IsNotEmpty()
  @IsString()
  text: string;

  @IsOptional()
  @IsInt()
  postId: number;
}
