import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './config/data-source';
import { AuthModule } from './auth/auth.module';
import { UsersAuthModule } from './users-auth/users-auth.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      introspection: true,
      playground: true,
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,
    AuthModule,
    UsersAuthModule,
  ],
})
export class AppModule { }
