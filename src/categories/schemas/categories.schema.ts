import { Document, Types } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Category {
  readonly _id!: Types.ObjectId;

  @Prop({ type: String, unique: true })
  readonly name!: string;
}

export type CategoryDocument = Category & Document;

export const CategorySchema = SchemaFactory.createForClass(Category).set('versionKey', false);
