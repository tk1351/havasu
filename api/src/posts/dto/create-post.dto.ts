import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { CreateContentDto } from '../../contents/dto/create-content.dto';
import { CreateTagDto } from '../../tags/dto/create-tag.dto';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  contents: CreateContentDto[];

  @IsOptional()
  @IsNotEmpty()
  tags: CreateTagDto[];
}
