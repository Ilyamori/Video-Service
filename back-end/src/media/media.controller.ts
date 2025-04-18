import {
    Controller,
    HttpCode,
    Post,
    Query,
    UploadedFile,
    UseInterceptors
} from '@nestjs/common';
import { MediaService } from './media.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller('media')
export class MediaController {
    constructor(private readonly mediaService: MediaService) {}

    @HttpCode(200)
    @Post()
    @Auth()
    @UseInterceptors(FileInterceptor('media'))
    async uploadMedia(
        @UploadedFile() mediaFile: Express.Multer.File,
        @Query('folder') folder?: string
    ) {
        return await this.mediaService.saveMedia(mediaFile, folder);
    }
}
