import { Field, ObjectType } from '@nestjs/graphql';
import { Comment } from 'src/comments/entities/comment.entity';
import { Post } from 'src/posts/entities/post.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'Users' })
@ObjectType()
export class User {
  // primary key
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  // required fields
  @Field()
  @Column({ unique: true })
  email: string;

  @Column()
  password?: string;

  // other fields
  @Field({ nullable: true })
  @Column({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  lastName: string;

  // timestampz columns
  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: string;

  // relationships
  @OneToMany(() => Post, (posts) => posts.user)
  @Field(() => [Post], { nullable: "itemsAndList" })
  posts: Post[];

  @OneToMany(() => Comment, (comments) => comments.user)
  comments: Comment[];
}
