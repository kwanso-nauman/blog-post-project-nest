import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Comment } from 'src/comments/entities/comment.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'Posts' })
@ObjectType()
export class Post {
  // primary key
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  // other fields
  @Field({ nullable: true })
  @Column({ nullable: true })
  title: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  body: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  image: string;

  @Column("float", { nullable: true })
  @Field(() => Float, { nullable: true })
  timeToRead: number;

  // timestampz columns
  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  @Field({ nullable: true })
  updatedAt: Date;

  // relationships
  @ManyToOne(() => User, (user) => user.posts)
  @Field(() => User, { nullable: true })
  user: User;

  @OneToMany(() => Comment, (comments) => comments.post)
  comments: Comment[];

  // relationship columns
  @Column({ nullable: true, type: 'uuid'})
  @Field({ nullable: true })
  userId: string;
}
