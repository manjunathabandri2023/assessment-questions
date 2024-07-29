import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IAccount extends Document {
  email: string;
  password: string;
  role: string;
}

const AccountSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['Admin', 'Delivery Admin'],
    },
  },
  {
    timestamps: true,
  }
);

// Password hashing
AccountSchema.pre<IAccount>('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Account = mongoose.model<IAccount>('Account', AccountSchema);
export default Account;
