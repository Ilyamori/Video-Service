import { UserEntity } from '../../user/entities/user.entity';
import { Entity, JoinColumn, ManyToOne, Column, OneToMany } from 'typeorm';
import { Base } from '../../utils/base';
import { CommentEntity } from '../../comment/entities/comment.entity';

@Entity('Video')
export class VideoEntity extends Base {
    @Column({ default: '' })
    name: string;

    @Column({ default: false, name: 'is_public' })
    isPublic: boolean;

    @Column({ default: 0 })
    views?: number;

    @Column({ default: 0 })
    duration?: number;

    @Column({ default: 0 })
    likes?: number;

    @Column({ default: '', type: 'text' })
    description: string;

    @Column({ default: '', name: 'video_path' })
    videoPath: string;

    @Column({ default: '', name: 'thumbnail_path' })
    thumbnailPath: string;

    @ManyToOne(() => UserEntity, (user) => user.videos)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @OneToMany(() => CommentEntity, (comment) => comment.video)
    comments: CommentEntity[];
}
