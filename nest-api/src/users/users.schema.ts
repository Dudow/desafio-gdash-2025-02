import * as mongoose from 'mongoose';

export interface UserInterface {
  password: string;
  name: string;
  email: string;
}

export const UserSchema = new mongoose.Schema(
  {
    email: String,
    password: String,
    name: String,
  },
  {
    timestamps: true,
  },
);

export interface UserDocument extends UserInterface, mongoose.Document {}

export interface UserModel extends mongoose.Model<UserDocument> {}
