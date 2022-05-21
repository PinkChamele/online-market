import { Types } from 'mongoose';

export interface IRefreshPayload {
  readonly _id: Types.ObjectId;

  readonly iat?: number;

  readonly exp?: number;
}
