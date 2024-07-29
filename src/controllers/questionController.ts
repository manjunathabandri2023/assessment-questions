import { Request, Response } from 'express';
import Question from '../models/question';

const createQuestion = async (req: Request, res: Response) => {
  const { text, options, correctOption, marks, negativeMarks, tags } = req.body;

  try {
    console.log(req.body, "manjan---");
    
    const question = await Question.create({
      text,
      options,
      correctOption,
      marks,
      negativeMarks,
      tags,
    });
    res.status(201).json(question);
  } catch (error) {
    console.log(error, "manaj");
    
    res.status(400).json({ message: error });
  }
};

const getAllQuestions = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.pageSize) || 10;

  try {
    const questions = await Question.find()
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    res.json(questions);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const updateQuestion = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { text, options, correctOption, marks, negativeMarks, tags } = req.body;

  try {
    const question = await Question.findById(id);

    if (!question) {
      res.status(404);
      throw new Error('Question not found');
    }

    question.text = text || question.text;
    question.options = options || question.options;
    question.correctOption = correctOption || question.correctOption;
    question.marks = marks || question.marks;
    question.negativeMarks = negativeMarks || question.negativeMarks;
    question.tags = tags || question.tags;

    const updatedQuestion = await question.save();
    res.json(updatedQuestion);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const deleteQuestion = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const question = await Question.findById(id);

    if (!question) {
      res.status(404);
      throw new Error('Question not found');
    }

    // await question.remove();
    res.json({ message: 'Question removed' });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export { createQuestion, getAllQuestions, updateQuestion, deleteQuestion };
