import * as mongoose from 'mongoose';

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

export type User = typeof UserSchema;
