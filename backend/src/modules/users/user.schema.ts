import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  //@Prop({ required: true })
  //name: string;

  //@Prop()
  //centroEstudios: string;

  //@Prop()
  //carrera: string;

  //@Prop()
  //especialidad: string;

  @Prop({ required: true })
  email: string;

  //@Prop()
  //telefono: string;

  //@Prop()
  //telefonoFamiliar: string;

  @Prop({ default: Date.now })
  fechaRegistro: Date;

  @Prop()
  username?: string;

  @Prop()
  password?: string;

  @Prop({ default: 'practicante', enum: ['admin', 'practicante'] })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
