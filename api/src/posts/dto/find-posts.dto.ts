import { IsNotEmpty, IsOptional } from 'class-validator';

export class FindPostsDto {
  @IsOptional()
  tag: string;

  @IsOptional()
  @IsNotEmpty()
  offset: number;

  @IsOptional()
  @IsNotEmpty()
  limit: number;
}
