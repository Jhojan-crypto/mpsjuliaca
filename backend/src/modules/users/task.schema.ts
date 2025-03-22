import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document,Types } from 'mongoose';

@Schema()
export class Task extends Document {
  /*@Prop({ required: true })
  name: string;*/

  @Prop()
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;
  
  @Prop()
  tiempo: string;

  @Prop()
  area: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  assignedTo: string;
  
  @Prop({ default: false })
  completed: boolean;


}

export const TaskSchema = SchemaFactory.createForClass(Task);
