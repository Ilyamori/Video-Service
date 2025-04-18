import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { VideoEntity } from './entities/video.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    controllers: [VideoController],
    providers: [VideoService],
    imports: [TypeOrmModule.forFeature([VideoEntity])]
})
export class VideoModule {}
