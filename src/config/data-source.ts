import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
  type:'postgres',
  database: 'blog-post-project-nest',
  username:'postgres',
  password:'root',
  host:'localhost',
  port: 5432,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  logging: true,
  synchronize: false,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;