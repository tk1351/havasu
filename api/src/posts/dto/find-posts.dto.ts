import { IsNotEmpty, IsOptional } from 'class-validator';

export class FindPostsDto {
  @IsOptional()
  @IsNotEmpty()
  offset: number;

  @IsOptional()
  @IsNotEmpty()
  limit: number;
}
