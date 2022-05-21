import { Document, Types, Schema as MongooseSchema } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Category } from 'src/categories/schemas/categories.schema';
import { User } from 'src/users/schemas/users.schema';

@Schema({ timestamps: true })
export class Order {
  readonly _id!: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Category.name })
  readonly product!: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name })
  readonly user!: Types.ObjectId;
}

export type OrderDocument = Order & Document;

export const OrderSchema = SchemaFactory.createForClass(Order).set('versionKey', false);
