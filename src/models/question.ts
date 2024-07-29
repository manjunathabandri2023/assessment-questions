import mongoose, { Schema, Document } from 'mongoose';

interface IQuestion extends Document {
  text: string;
  options: string[];
  correctOption: string; // Change from Number to String
  marks: number;
  negativeMarks: number;
  tags: string[];
}

const QuestionSchema: Schema = new Schema({
  text: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
  correctOption: {
    type: String, // Ensure this is set to String
    required: true,
  },
  marks: {
    type: Number,
    required: true,
  },
  negativeMarks: {
    type: Number,
    required: true,
  },
  tags: {
    type: [String],
    required: false,
  },
});

const Question = mongoose.model<IQuestion>('Question', QuestionSchema);

export default Question;
