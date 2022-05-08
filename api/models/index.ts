import { Schema, model } from 'mongoose';

interface UserData {
  email: string;
  password: string;
}

const userDataSchema = new Schema<UserData>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const UserDataModel = model<UserData>('User', userDataSchema);