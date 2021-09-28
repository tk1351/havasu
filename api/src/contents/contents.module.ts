import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentsService } from './contents.service';
import { ContentsController } from './contents.controller';
import { ContentsRepository } from './contents.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ContentsRepository])],
  providers: [ContentsService],
  controllers: [ContentsController],
})
export class ContentsModule {}
