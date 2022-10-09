import { User } from '../../user/entities/user.entity';

export type UserType = Omit<User, 'hasPassword'>;
