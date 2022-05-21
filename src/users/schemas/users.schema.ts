import { Document, Types } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
  readonly _id!: Types.ObjectId;

  @Prop({ required: true, unique: true, type: String })
  readonly email!: string;

  @Prop({ required: false, type: Number })
  readonly balance!: number;

  @Prop({ type: String })
  readonly password!: string;

  @Prop({ required: false, type: String })
  readonly name!: string | null;

  @Prop({ required: false, type: String })
  readonly surname!: string | null;

  @Prop({ required: false, type: String })
  readonly phoneNumber!: string | null;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User).set('versionKey', false);
