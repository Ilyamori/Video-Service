import {
    BadRequestException,
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { SubscriptionEntity } from './entities/subscription.entity';
import { UserDto } from './dto/user.dto';
import { genSalt, hash } from 'bcryptjs';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,

        @InjectRepository(SubscriptionEntity)
        private readonly subRepository: Repository<SubscriptionEntity>
    ) {}

    async findUserById(id: number) {
        const userInDb = await this.userRepository.findOne({
            where: {
                id: id
            },
            relations: {
                videos: true,
                subscriptions: {
                    toChannel: true
                }
            },
            order: {
                createdAt: 'DESC'
            }
        });

        if (!userInDb) throw new NotFoundException('Пользователь не найден');

        return userInDb;
    }

    async updateProfile(id: number, dto: UserDto) {
        const userFromDb = await this.findUserById(id);

        const isSameUser = await this.userRepository.findOneBy({
            email: dto.email
        });
        if (isSameUser && id !== isSameUser.id)
            throw new BadRequestException('Email занят');

        if (dto.password) {
            const salt = genSalt(10);
            userFromDb.password = hash(dto.password, salt);
        }

        userFromDb.email = dto.email;
        userFromDb.description = dto.description;
        userFromDb.name = dto.name;
        userFromDb.avatarPath = dto.avatarPath;

        const updatedUserFromDb = await this.userRepository.save(userFromDb);

        return updatedUserFromDb;
    }

    async subscribe(id: number, channelId: number) {
        const data = {
            toChannel: {
                id: channelId
            },
            fromUser: { id }
        };

        const isSubscribed = await this.subRepository.findOneBy(data);

        if (!isSubscribed) {
            const newSubscribe = await this.subRepository.create(data);

            await this.subRepository.save(newSubscribe);
            return true;
        }

        await this.subRepository.delete(data);
        return false;
    }

    async getAll() {
        return await this.userRepository.find();
    }
}
