import { IsOptional, IsNotEmpty, IsString } from 'class-validator';
import { UpdateTagDto } from '../../tags/dto/update-tag.dto';

export class UpdatePostDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsOptional()
  @IsNotEmpty()
  tags: UpdateTagDto[];
}
