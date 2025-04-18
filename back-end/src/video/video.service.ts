import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhereProperty, ILike, MoreThan, Repository } from 'typeorm';
import { VideoDto } from './dto/video.dto';
import { VideoEntity } from './entities/video.entity';

@Injectable()
export class VideoService {
    constructor(
        @InjectRepository(VideoEntity)
        private readonly videoRepository: Repository<VideoEntity>
    ) {}

    async findVideoById(id: number, isPublic = false) {
        const videoInDb = await this.videoRepository.findOne({
            where: isPublic
                ? {
                      id,
                      isPublic: true
                  }
                : {
                      id
                  },
            relations: {
                user: true,
                comments: {
                    user: true
                }
            },
            select: {
                user: {
                    id: true,
                    name: true,
                    avatarPath: true,
                    isVerified: true,
                    subscribersCount: true,
                    subscriptions: true
                },
                comments: {
                    message: true,
                    id: true,
                    user: {
                        id: true,
                        name: true,
                        avatarPath: true,
                        isVerified: true,
                        subscribersCount: true
                    }
                }
            }
        });

        if (!videoInDb) throw new NotFoundException('Видео не найдено');

        return videoInDb;
    }

    async updateVideo(id: number, dto: VideoDto) {
        const videoFromDb = await this.findVideoById(id);

        return await this.videoRepository.save({
            ...videoFromDb,
            ...dto
        });
    }

    async getAll(searchTerm?: string) {
        let options: FindOptionsWhereProperty<VideoEntity> = {};

        if (searchTerm) {
            options = {
                name: ILike(`%${searchTerm}%`)
            };
        }

        return await this.videoRepository.find({
            where: {
                ...options,
                isPublic: true
            },
            order: {
                createdAt: 'DESC'
            },
            relations: {
                user: true,
                comments: {
                    user: true
                }
            },
            select: {
                user: {
                    id: true,
                    name: true,
                    avatarPath: true,
                    isVerified: true
                }
            }
        });
    }

    async getMostPopularVideoByViews() {
        return await this.videoRepository.find({
            where: {
                views: MoreThan(0)
            },
            relations: {
                user: true
            },
            select: {
                user: {
                    id: true,
                    name: true,
                    avatarPath: true,
                    isVerified: true
                }
            },
            order: {
                views: -1
            }
        });
    }

    async createVideo(userId: number) {
        const defaultValue = {
            name: '',
            user: {
                id: userId
            },
            description: '',
            videoPath: '',
            thumbnailPath: ''
        };

        const newVideo = await this.videoRepository.create(defaultValue);
        const video = await this.videoRepository.save(newVideo);

        return video.id;
    }

    async deleteVideo(id: number) {
        await this.videoRepository.delete({ id });
    }

    async updateCountOfViews(id: number) {
        const videoFromDb = await this.findVideoById(id);

        videoFromDb.views++;

        return await this.videoRepository.save(videoFromDb);
    }

    async updateReaction(id: number) {
        const videoFromDb = await this.findVideoById(id);

        videoFromDb.likes++;

        return await this.videoRepository.save(videoFromDb);
    }
}
