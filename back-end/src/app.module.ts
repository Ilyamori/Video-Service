import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmConfig } from './config/typeorm.config';
import { UserModule } from './user/user.module';
import { VideoModule } from './video/video.module';
import { CommentModule } from './comment/comment.module';
import { AuthModule } from './auth/auth.module';
import { MediaModule } from './media/media.module';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: getTypeOrmConfig
        }),
        UserModule,
        VideoModule,
        CommentModule,
        AuthModule,
        MediaModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
