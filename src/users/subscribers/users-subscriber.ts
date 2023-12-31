import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return User;
  }

  async beforeInsert(event: InsertEvent<User>) {
    const { password, email } = event.entity;

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    event.entity.password = hashedPassword;

    // format email
    event.entity.email = email.trim().toLowerCase();
  }
}
