import { IsOptional, IsNotEmpty } from 'class-validator';

export class FindTagsDto {
  @IsOptional()
  @IsNotEmpty()
  offset: number;

  @IsOptional()
  @IsNotEmpty()
  limit: number;
}
