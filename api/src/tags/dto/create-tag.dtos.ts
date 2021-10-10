import { IsOptional, IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateTagDtos {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  postId: number;
}
