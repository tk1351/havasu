import { IsNotEmpty, IsString, IsOptional, IsInt } from 'class-validator';

export class CreateTagDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsInt()
  postId: number;
}
