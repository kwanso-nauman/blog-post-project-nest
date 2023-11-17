import { Field, ObjectType } from '@nestjs/graphql';
import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'Comments' })
@ObjectType()
export class Comment {
  // primary key
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  // other fields
  @Field({ nullable: true })
  @Column({ nullable: true })
  body: string;

  // timestampz columns
  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: Date;

  // relationships
  @ManyToOne(() => Post, (post) => post.comments)
  @Field(() => Post, { nullable: true })
  post: Post;

  @ManyToOne(() => User, (user) => user.comments)
  @Field(() => User, { nullable: true })
  user: User;

  // self referencing relation
  @ManyToOne(() => Comment, (comment) => comment.childComments)
  parentComment: Comment;

  @OneToMany(() => Comment, (comment) => comment.parentComment)
  @Field(() => [Comment], { nullable: "itemsAndList" })
  childComments: Comment[];

  // relationship columns
  @Column({ nullable: true, type: 'uuid' })
  @Field({ nullable: true })
  postId: string;

  @Column({ nullable: true, type: 'uuid' })
  @Field({ nullable: true })
  userId: string;

  @Column({ nullable: true, type: 'uuid' })
  @Field({ nullable: true })
  parentCommentId: string;
}
