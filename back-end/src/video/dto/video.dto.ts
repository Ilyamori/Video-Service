import { IsString } from 'class-validator';

export class VideoDto {
    isPublic?: boolean;

    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsString()
    videoPath: string;

    @IsString()
    thumbnailPath: string;
}
