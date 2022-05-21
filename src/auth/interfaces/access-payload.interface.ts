import { Types } from 'mongoose';

export interface IAccessPayload {
  readonly _id: Types.ObjectId;

  readonly email: string;

  readonly iat?: number;

  readonly exp?: number;
}
