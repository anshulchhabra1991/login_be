import { Schema, Document } from 'mongoose';

export interface User extends Document {
  email: string;
  name: string;
  password: string;
}

export const UserSchema = new Schema<User>({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
});
