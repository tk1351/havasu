import { IsNotEmpty, IsInt } from 'class-validator';

export class FindPostsDto {
  @IsNotEmpty()
  @IsInt()
  offset: number;

  @IsNotEmpty()
  @IsInt()
  limit: number;
}
