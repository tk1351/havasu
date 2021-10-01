import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { CreateTagDto } from '../../tags/dto/create-tag.dto';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsOptional()
  @IsNotEmpty()
  tags: CreateTagDto[];
}
