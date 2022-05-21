import { Document, Types, Schema as MongooseSchema } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Category } from 'src/categories/schemas/categories.schema';

@Schema({ timestamps: true })
export class Product {
  readonly _id!: Types.ObjectId;

  @Prop({ type: String, unique: true })
  readonly name!: string;

  @Prop({ type: String })
  readonly description!: string;

  @Prop({ type: Number })
  readonly price!: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Category.name })
  readonly category!: Types.ObjectId;
}

export type ProductDocument = Product & Document;

export const ProductSchema = SchemaFactory.createForClass(Product).set('versionKey', false);
