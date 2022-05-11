import { Schema, model, Types } from 'mongoose';

interface UserData {
  email: string;
  password: string;
}

export interface Question {
  _id: Types.ObjectId;
  question: string;
  code: string;
  answers: Array<string>;
  correctAnswer: string;
}

const userDataSchema = new Schema<UserData>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const QuestionsSchema = new Schema<Question>({
  question: { type: String, required: true },
  code: { type: String, required: true },
  answers: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true },
});

export const UserDataModel = model<UserData>('User', userDataSchema);
export const QuestionsModel = model<Question>('Questions', QuestionsSchema);
