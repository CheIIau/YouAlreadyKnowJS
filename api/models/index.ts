import { Schema, model } from 'mongoose';

interface UserData {
  email: string;
  password: string;
}

interface Question {
  question: string;
  code: string;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
  correctAnswer: string;
}

const userDataSchema = new Schema<UserData>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const QuestionsSchema = new Schema<Question>({
  question: { type: String, required: true },
  code: { type: String, required: true },
  answer1: { type: String, required: true },
  answer2: { type: String, required: true },
  answer3: { type: String, required: true },
  answer4: { type: String, required: true },
  correctAnswer: { type: String, required: true },
});

export const UserDataModel = model<UserData>('User', userDataSchema);
export const QuestionsModel = model<Question>('Questions', QuestionsSchema);
