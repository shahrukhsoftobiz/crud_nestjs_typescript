/* eslint-disable prettier/prettier */
import * as mongoos from 'mongoose';

export const UserSchema = new mongoos.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  position: { type: String, required: true },
  gender: { type: String, required: true },
});

export interface User extends mongoos.Document {
  id: string;
  name: string;
  age: number;
  position: string;
  gender: string;
}
