import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Shodan extends Document {
  @Prop({ type: String, required: true })
  alert_id: string;

  @Prop({ type: Object, required: true })
  banner: object;

  @Prop({ type: String, required: true })
  timestamp: string;

  @Prop({ type: String, required: true })
  trigger: string;

  @Prop({ type: String, required: true })
  trigger_description: string;

  @Prop({ type: Date, default: null })
  deletedAt: Date;
}

export const ShodanSchema = SchemaFactory.createForClass(Shodan);
