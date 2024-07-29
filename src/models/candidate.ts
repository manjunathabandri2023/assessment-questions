import mongoose, { Document, Schema } from 'mongoose';

export interface ICandidate extends Document {
  name: string;
  email: string;
  phone: string;
  status: string;
}

const CandidateSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['Active', 'Inactive'],
    },
  },
  {
    timestamps: true,
  }
);

const Candidate = mongoose.model<ICandidate>('Candidate', CandidateSchema);
export default Candidate;
