import { Request } from 'express';
import { User } from '../../user/entities/user.entity';

export interface IExpressRequest extends Request {
  user?: User;
}
