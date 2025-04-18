import {
    Controller,
    Body,
    Get,
    HttpCode,
    Param,
    Post,
    Put,
    UsePipes,
    ValidationPipe,
    Query,
    Delete
} from '@nestjs/common';
import { VideoService } from './video.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/user/decorators/user.decorator';
import { VideoDto } from './dto/video.dto';

@Controller('video')
export class VideoController {
    constructor(private readonly videoService: VideoService) {}

    @Get('get-private/:videoId')
    @Auth()
    async getPrivateVideo(@Param('videoId') videoId: string) {
        return await this.videoService.findVideoById(+videoId);
    }

    @Get(':videoId')
    async getUser(@Param('videoId') videoId: string) {
        return await this.videoService.findVideoById(+videoId);
    }

    @Get('most-popular')
    async getMostPopularVideoByViews() {
        return await this.videoService.getMostPopularVideoByViews();
    }

    @Get()
    async getAll(@Query('searchTerm') searchTerm?: string) {
        return await this.videoService.getAll(searchTerm);
    }

    @HttpCode(200)
    @Post()
    @Auth()
    async createVideo(@CurrentUser('id') id: number) {
        return await this.videoService.createVideo(id);
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Put('update-video/:videoId')
    @Auth()
    async updateVideo(
        @Param('videoId') videoId: string,
        @Body() dto: VideoDto
    ) {
        return this.videoService.updateVideo(+videoId, dto);
    }

    @HttpCode(200)
    @Delete('delete-video/:videoId')
    @Auth()
    async deleteVideo(@Param('videoId') videoId: string) {
        return this.videoService.deleteVideo(+videoId);
    }

    @HttpCode(200)
    @Put('update-views/:videoId')
    async updateViews(@Param('videoId') videoId: string) {
        return this.videoService.updateCountOfViews(+videoId);
    }

    @HttpCode(200)
    @Put('update-likes/:videoId')
    @Auth()
    async updateLikes(@Param('videoId') videoId: string) {
        return this.videoService.updateReaction(+videoId);
    }
}
